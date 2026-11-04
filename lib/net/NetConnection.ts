import { EventDispatcher } from '../events/EventDispatcher';
import { axCoerceString, ASArray, ASObject, Multiname } from '@awayfl/avm2';
import { NetStatusEvent } from '../events/NetStatusEvent';
import { somewhatImplemented, release, notImplemented } from '@awayfl/swf-loader';
import { Responder } from './Responder';

/**
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Class: NetConnection

export class NetConnection extends EventDispatcher {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	constructor () {
		super();
		this._connected = false;
		this._proxyType = 'none';
		this._objectEncoding = NetConnection.defaultObjectEncoding;
		this._usingTLS = false;

		//Telemetry.instance.reportTelemetry({topic: 'feature', feature: Telemetry.Feature.NETCONNECTION_FEATURE});
	}

	// JS -> AS Bindings

	close() {
		this.invoke(1);
	}

	addHeader(operation: string, mustUnderstand: Boolean = false, param: any = null): void {
		this._invoke(3, [axCoerceString(operation), !!mustUnderstand, param]);
	}

	call(command: string, responder: Responder /* more args can be provided */): void {
		command = axCoerceString(command);
		// Native methods receive AS3 arguments flat (no ...rest collection) — everything
		// after `responder` is a call argument to be serialised.
		const callArgs = Array.prototype.slice.call(arguments, 2);
		this._httpCall(command, responder, callArgs);
	}

	/* ------------------------------------------------------------------------------------
	 * Flash Remoting (AMF over HTTP POST) — the transport used by Zend_Amf / AMFPHP / etc.
	 * Serialisation is delegated to the AVM2 ByteArray AMF codec so arguments and results
	 * stay proper AVM2 objects; only the remoting packet envelope is hand-written here.
	 * ---------------------------------------------------------------------------------- */

	private static _netStatusEventClass: any = null;
	private _httpCallId: number = 0;
	private _pendingResponders: Record<string, Responder>;

	private _debugAMF(...args: any[]): void {
		if (typeof self !== 'undefined' && (<any> self).__AWAYFL_AMF_DEBUG)
			console.log.apply(console, ['[AMF]', ...args]);
	}

	private _makeStatusInfo(code: string, level: string, description?: string): ASObject {
		const info: any = { code: code, level: level };
		if (description !== undefined)
			info.description = description;
		return this.sec.createObjectFromJS(info);
	}

	private _dispatchStatus(code: string, level: string, description?: string): void {
		this._debugAMF('netStatus ->', code, description || '');
		try {
			// Events handed to compiled AS3 must be real AVM2 instances (axConstruct on the
			// AXClass); a raw `new NetStatusEvent(...)` lacks runtime traits and property
			// access from compiled code fails on it.
			if (!NetConnection._netStatusEventClass) {
				NetConnection._netStatusEventClass = this.sec.application.getClass(
					Multiname.FromFQNString('flash.events.NetStatusEvent', 0 /* NamespaceType.Public */));
			}
			const event = NetConnection._netStatusEventClass.axConstruct(
				[NetStatusEvent.NET_STATUS, false, false, this._makeStatusInfo(code, level, description)]);
			event.currentTarget = this;
			event.target = this;
			this.dispatchEvent(event);
		} catch (e) {
			console.warn('[NetConnection] netStatus dispatch failed:', e);
		}
	}

	private static _byteArrayClass: any = null;

	private _newAMFByteArray(): any {
		// ByteArray's buffer machinery lives on DataBuffer.prototype and is merged onto the
		// VM-linked prototype via instanceNatives — a raw `new ByteArray()` lacks it, so the
		// instance must be constructed through the AXClass.
		if (!NetConnection._byteArrayClass) {
			NetConnection._byteArrayClass = this.sec.application.getClass(
				Multiname.FromFQNString('flash.utils.ByteArray', 0 /* NamespaceType.Public */));
		}
		const ba: any = NetConnection._byteArrayClass.axConstruct([]);
		// the AMF codec resolves classes/objects through the security domain
		ba.sec = this.sec;
		return ba;
	}

	private _httpCall(command: string, responder: Responder, callArgs: any[]): void {
		const id = String(++this._httpCallId);
		this._debugAMF('call ->', command, 'id', id);
		try {
			if (!this._pendingResponders)
				this._pendingResponders = {};
			if (responder)
				this._pendingResponders[id] = responder;

			const ba = this._newAMFByteArray();
			ba._objectEncoding = 3; // AMF3
			ba.writeByte(0x11);     // AMF0 avmplus marker: body is AMF3
			ba.writeObject(this.sec.createArray(callArgs));
			const body = new Uint8Array(ba._buffer.slice(0, ba._length));
			const packet = NetConnection._buildRemotingPacket(command, id, body);

			if (!this._uri) {
				this._httpFail(id, 'NetConnection is not connected (uri is null)');
				return;
			}
			fetch(this._uri, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/x-amf' },
				body: packet
			}).then((r) => {
				if (!r.ok)
					throw new Error('HTTP ' + r.status);
				const ct = (r.headers.get('content-type') || '').toLowerCase();
				// A misconfigured gateway can answer 200 with an HTML error page; surface it
				// as a fault instead of feeding non-AMF bytes to the parser.
				if (ct.indexOf('application/x-amf') === -1) {
					return r.text().then((t) => {
						throw new Error('Non-AMF response (content-type: ' + (ct || 'none') + '): '
							+ t.replace(/\s+/g, ' ').slice(0, 300));
					});
				}
				return r.arrayBuffer();
			}).then((buf) => {
				this._handleRemotingResponse(<ArrayBuffer> buf);
			}).catch((err) => {
				this._httpFail(id, String((err && err.message) || err));
			});
		} catch (e) {
			this._debugAMF('call FAILED synchronously:', e);
			this._httpFail(id, String((e && (<any> e).message) || e));
		}
	}

	private _handleRemotingResponse(buf: ArrayBuffer): void {
		let messages: { target: string; body: ArrayBuffer }[];
		try {
			messages = NetConnection._parseRemotingPacket(buf);
		} catch (e) {
			console.warn('[NetConnection] AMF response parse failed:', e);
			return;
		}
		for (let i = 0; i < messages.length; i++) {
			const msg = messages[i];
			let value: any;
			try {
				const ba = this._newAMFByteArray();
				ba.setArrayBuffer(msg.body);
				ba._position = 0;
				ba._objectEncoding = 0; // AMF0 reader; handles the 0x11 -> AMF3 marker
				value = ba.readObject();
			} catch (e) {
				console.warn('[NetConnection] AMF body decode failed for', msg.target, e);
				continue;
			}
			const match = /^\/([^\/]*)\/(onResult|onStatus)$/.exec(msg.target);
			if (!match) {
				console.warn('[NetConnection] unrecognised AMF response target:', msg.target);
				continue;
			}
			const id = match[1], kind = match[2];
			const responder = this._pendingResponders && this._pendingResponders[id];
			if (this._pendingResponders)
				delete this._pendingResponders[id];
			this._debugAMF('response', kind, 'id', id, '->', responder ? 'responder' : '(no responder)');
			if (responder) {
				try {
					kind === 'onResult' ? responder.invokeResult(value) : responder.invokeStatus(value);
				} catch (e) {
					console.warn('[NetConnection] responder callback threw:', e);
				}
			} else if (kind === 'onStatus') {
				this._dispatchStatus('NetConnection.Call.Failed', 'error');
			}
		}
	}

	private _httpFail(id: string, description: string): void {
		this._debugAMF('call failed id', id, ':', description);
		const responder = this._pendingResponders && this._pendingResponders[id];
		if (this._pendingResponders)
			delete this._pendingResponders[id];
		if (responder) {
			try {
				responder.invokeStatus(this._makeStatusInfo('NetConnection.Call.Failed', 'error', description));
				return;
			} catch (e) {
				console.warn('[NetConnection] responder status callback threw:', e);
			}
		}
		this._dispatchStatus('NetConnection.Call.Failed', 'error', description);
	}

	/* AMF remoting packet: u16 version | u16 headerCount | u16 messageCount, then per
	 * message: utf targetURI | utf responseURI | u32 bodyLength | AMF body. */
	private static _buildRemotingPacket(target: string, responseId: string, body: Uint8Array): Uint8Array {
		const enc = new TextEncoder();
		const head: number[] = [];
		const u16 = (v: number) => head.push((v >>> 8) & 0xff, v & 0xff);
		const u32 = (v: number) => head.push((v >>> 24) & 0xff, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff);
		const utf = (str: string) => {
			const b = enc.encode(str);
			u16(b.length);
			for (let i = 0; i < b.length; i++) head.push(b[i]);
		};
		u16(3); // version 3 (AMF3-capable)
		u16(0); // headers
		u16(1); // messages
		utf(target);
		utf('/' + responseId);
		u32(body.length);
		const out = new Uint8Array(head.length + body.length);
		out.set(head, 0);
		out.set(body, head.length);
		return out;
	}

	private static _parseRemotingPacket(buf: ArrayBuffer): { target: string; body: ArrayBuffer }[] {
		const dv = new DataView(buf);
		const dec = new TextDecoder();
		let pos = 0;
		const u16 = () => { const v = dv.getUint16(pos); pos += 2; return v; };
		const u32 = () => { const v = dv.getUint32(pos); pos += 4; return v; };
		const utf = () => { const n = u16(); const s = dec.decode(new Uint8Array(buf, pos, n)); pos += n; return s; };
		const messages: { target: string; body: ArrayBuffer }[] = [];
		u16(); // version
		const headers = u16();
		for (let h = 0; h < headers; h++) {
			utf(); pos += 1; // name, mustUnderstand
			const len = u32();
			if (len !== 0xffffffff) pos += len;
		}
		const count = u16();
		for (let m = 0; m < count; m++) {
			const target = utf();
			utf(); // response uri (unused in replies)
			const len = u32();
			let body: ArrayBuffer;
			if (len !== 0xffffffff && pos + len <= buf.byteLength) {
				body = buf.slice(pos, pos + len);
				pos += len;
			} else {
				body = buf.slice(pos);
				pos = buf.byteLength;
			}
			messages.push({ target: target, body: body });
		}
		return messages;
	}

	// AS -> JS Bindings
	static _defaultObjectEncoding: number /*uint*/ = 3 /* AMF3 */;
	static get defaultObjectEncoding(): number /*uint*/ {
		return NetConnection._defaultObjectEncoding;
	}

	static set defaultObjectEncoding(version: number /*uint*/) {
		version = version >>> 0;
		NetConnection._defaultObjectEncoding = version;
	}

	private _connected: boolean;
	private _uri: string;
	private _client: ASObject;
	private _objectEncoding: number /*uint*/;
	private _proxyType: string;
	private _connectedProxyType: string;
	private _usingTLS: boolean;
	private _protocol: string;
	private _maxPeerConnections: number /*uint*/;
	private _nearID: string;
	private _farID: string;
	private _nearNonce: string;
	private _farNonce: string;
	private _unconnectedPeerStreams: ASArray;

	private _rtmpConnection: any;//RtmpJs.BaseTransport;
	private _rtmpCreateStreamCallbacks: Function[];

	get connected(): boolean {
		return this._connected;
	}

	get uri(): string {
		return this._uri;
	}

	connect(command: string): void {
		command = axCoerceString(command);
		this._uri = command;
		// A null command or an HTTP(S) url is a Flash Remoting gateway connection: it always
		// "succeeds" immediately — calls are independent HTTP POSTs. Dispatch async so
		// listeners registered right after connect() still receive the event.
		if (!command || !/^rtmpt?s?:/i.test(command)) {
			this._connected = true;
			Promise.resolve().then(() => this._dispatchStatus('NetConnection.Connect.Success', 'status'));
			return;
		}
		// RTMP / RTMPT / RTMPS streaming transports are not implemented.
		console.warn('[NetConnection] rtmp transports are not implemented:', command);
		this._dispatchStatus('NetConnection.Connect.Failed', 'error');
	}

	_createRtmpStream(callback) {
		const transactionId = this._rtmpCreateStreamCallbacks.length;
		this._rtmpCreateStreamCallbacks[transactionId] = callback;
		this._rtmpConnection.createStream(transactionId, null);
	}

	get client(): ASObject {
		return this._client;
	}

	set client(object: ASObject) {
		this._client = object;
	}

	get objectEncoding(): number /*uint*/ {
		return this._objectEncoding;
	}

	set objectEncoding(version: number /*uint*/) {
		version = version >>> 0;
		release || somewhatImplemented('public flash.net.NetConnection::set objectEncoding');
		this._objectEncoding = version;
	}

	get proxyType(): string {
		return this._proxyType;
	}

	set proxyType(ptype: string) {
		ptype = axCoerceString(ptype);
		release || somewhatImplemented('public flash.net.NetConnection::set proxyType');
		this._proxyType = ptype;
	}

	get connectedProxyType(): string {
		release || notImplemented('public flash.net.NetConnection::get connectedProxyType');
		return this._connectedProxyType;
	}

	get usingTLS(): boolean {
		return this._usingTLS;
	}

	get protocol(): string {
		return this._protocol;
	}

	get maxPeerConnections(): number /*uint*/ {
		release || notImplemented('public flash.net.NetConnection::get maxPeerConnections');
		return this._maxPeerConnections;
	}

	set maxPeerConnections(maxPeers: number /*uint*/) {
		maxPeers = maxPeers >>> 0;
		release || notImplemented('public flash.net.NetConnection::set maxPeerConnections');
		this._maxPeerConnections = maxPeers;
	}

	get nearID(): string {
		release || notImplemented('public flash.net.NetConnection::get nearID');
		return this._nearID;
	}

	get farID(): string {
		release || notImplemented('public flash.net.NetConnection::get farID');
		return this._farID;
	}

	get nearNonce(): string {
		release || notImplemented('public flash.net.NetConnection::get nearNonce');
		return this._nearNonce;
	}

	get farNonce(): string {
		release || notImplemented('public flash.net.NetConnection::get farNonce');
		return this._farNonce;
	}

	get unconnectedPeerStreams(): ASArray {
		release || notImplemented('public flash.net.NetConnection::get unconnectedPeerStreams');
		return this._unconnectedPeerStreams;
	}

	invoke(index: number /*uint*/): any {
		index = index >>> 0;
		return this._invoke(index, Array.prototype.slice.call(arguments, 1));
	}

	private _invoke(index: number, args: any[]): any {
		let simulated = false;
		let result;
		switch (index) {
			case 1: // close
			case 2: // call, e.g. with ('createStream', <Responder>)
				simulated = true;
				break;
		}
		(simulated ? somewhatImplemented : notImplemented)(
			'private flash.net.NetConnection::_invoke (' + index + ')');
		return result;
	}

}
