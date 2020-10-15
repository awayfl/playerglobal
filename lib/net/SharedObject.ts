import { ASObject } from '@awayfl/avm2';
import { notImplemented, warning, StringUtilities } from '@awayfl/swf-loader';
import { axCoerceString, ObjectEncoding, AMF3, transformASValueToJS, transformJSValueToAS } from '@awayfl/avm2';
import { ByteArray } from '../utils/ByteArray';
import { SecurityDomain } from '../SecurityDomain';

interface IStorage {
	getItem(key: string): string;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
}

let _sharedObjectStorage: IStorage;

class VirtualStorage implements IStorage {
	_values: StringMap<string> = {};
	_realStorage: IStorage = null;

	getItem(key: string) {
		if (this._realStorage) {
			this._values[key] = this._realStorage.getItem(key);
		}
		return this._values[key];
	}

	setItem(key: string, value: string) {
		if (this._realStorage) {
			this._realStorage.setItem(key, value);
		}
		this._values[key] = value;
	}

	removeItem(key: string) {
		if (this._realStorage) {
			this._realStorage.removeItem(key);
		}
		delete this._values[key];
	}
}

export function getSharedObjectStorage(): IStorage {
	if (!_sharedObjectStorage) {
		_sharedObjectStorage = new VirtualStorage();

		if (typeof Storage !== 'undefined') {
			try {
				(_sharedObjectStorage as VirtualStorage)._realStorage = window.localStorage;
			} catch (e) {
				console.warn('[Shared Storage] ', e);
			}
		}
	}
	return _sharedObjectStorage;
}

export class SharedObjectDebug {
	public static _lastRawData: any = null;
	public static _lastDecodedData: any = null;

	public static decodedData() {
		if (!USED_SEC) {
			throw 'Can\'t decode without security context';
		}

		const store = getSharedObjectStorage() as VirtualStorage;
		const raw = {};
		const dec = {};

		for (const key in store._values) {
			const d = store._values[key];

			if (d !== null) {
				raw[key] = SharedObject.tryDecodeData(store._values[key]);
				dec[key] = transformASValueToJS(USED_SEC, raw[key], true);
			} else {
				raw[key] = dec[key] = null;
			}
		}

		this._lastDecodedData = dec;
		this._lastRawData = raw;

		return dec;
	}

	public static encodeAndApplyData(): any {
		if (!this._lastRawData) {
			throw 'Need call decode before encode for detecting model';
		}

		const newRaw = {};

		for (const key in this._lastRawData) {
			if (typeof this._lastDecodedData[key] === undefined) {

				newRaw[key] = this._lastRawData[key];
				continue;
			}

			newRaw[key] = transformJSValueToAS(USED_SEC, this._lastDecodedData[key], true);
		}

		const so = getSharedObjectStorage();

		for (const key in newRaw) {
			if (newRaw[key] !== null) {
				so.setItem(key, SharedObject.tryEncodeData(newRaw[key]));
			}
		}

		return newRaw;
	}
}

//@ts-ignore
window._AWAY_DEBUG_STORAGE = SharedObjectDebug;

let USED_SEC: any = undefined;
export class SharedObject extends ASObject {
	private _data: ASObject;
	private _object_name: string;

	static axClass: typeof SharedObject;

	//for AVM1:
	//public fps: number;

	constructor() {
		super();
	}

	static get defaultObjectEncoding(): number /*uint*/ {
		notImplemented('public flash.net.SharedObject::static defaultObjectEncoding');
		return;
	}

	static set defaultObjectEncoding(version: number /*uint*/) {
		notImplemented('public flash.net.SharedObject::static defaultObjectEncoding');
		return;
	}

	public static deleteAll(url: string): number /*int*/ {
		notImplemented('public flash.net.SharedObject::static deleteAll');
		return;
	}

	public static getDiskUsage(url: string): number /*int*/ {
		notImplemented('public flash.net.SharedObject::static getDiskUsage');
		return 0;
	}

	public _path: string;
	public _fps: number;
	public _objectEncoding;
	private static _defaultObjectEncoding = ObjectEncoding.DEFAULT;

	/* internal */ static tryDecodeData(data: string): any {

		const bytes = StringUtilities.decodeRestrictedBase64ToBytes(data);
		const serializedData = new ByteArray(bytes.length);
		(<any>serializedData).sec = this.sec || USED_SEC;

		serializedData.setArrayBuffer(bytes.buffer);

		return AMF3.read(<any>serializedData);
	}

	/* internal */ static tryEncodeData(data: any): string {
		const serializedData = new ByteArray();
		(<any>serializedData).sec = this.sec || USED_SEC;

		AMF3.write(<any>serializedData, data);

		const bytes = new Uint8Array(serializedData.arraybytes);

		return StringUtilities.base64EncodeBytes(bytes);
	}

	public static getLocal(name: string, localPath?: string, secure?: boolean): SharedObject {
		USED_SEC = this.sec;

		name = axCoerceString(name);
		localPath = axCoerceString(localPath);
		secure = !!secure;
		const path = (localPath || '') + '/' + name;
		/*if (this._sharedObjects[path]) {
		return this._sharedObjects[path];
		}*/
		const encodedData = getSharedObjectStorage().getItem(path);
		let data;
		const encoding = this._defaultObjectEncoding;
		if (encodedData) {
			try {
				data = SharedObject.tryDecodeData(encodedData);
			} catch (e) {
				warning('Error encountered while decoding LocalStorage entry. Resetting data.');
			}
			if (!data || typeof data !== 'object') {
				data = this.sec.createObject();
			}
		} else {
			data = this.sec.createObject();
		}

		const so: SharedObject = new (<SecurityDomain> this.sec).flash.net.SharedObject();
		so._path = path;
		so._objectEncoding = encoding;
		so._data = data;
		return so;
	}

	public static getRemote(name: string, remotePath?: string, persistence?: boolean, secure?: boolean): SharedObject {
		return new (<SecurityDomain> this.sec).flash.net.SharedObject();
	}

	public flush(minDiskSpace: number = 0): void {
		/*if (typeof (Storage) !== "undefined") {
			localStorage.setItem(this._object_name, JSON.stringify(this._data));
		}
		else {
			console.log("no local storage available");

		}*/
		minDiskSpace = minDiskSpace | 0;

		// Check if the object is empty. If it is, don't create a stored object if one doesn't exist.
		let isEmpty = true;
		for (const key in this._data) {
			if (this._data.hasOwnProperty(key)) {
				isEmpty = false;
				break;
			}
		}
		if (isEmpty && !getSharedObjectStorage().getItem(this._path)) {
			return;
		}

		USED_SEC = this.sec;
		const encoded = SharedObject.tryEncodeData(this._data);
		/*if (!release) {
		  var decoded = StringUtilities.decodeRestrictedBase64ToBytes(encodedData);
		  assert(decoded.byteLength === bytes.byteLength);
		  for (var i = 0; i < decoded.byteLength; i++) {
			assert(decoded[i] === bytes[i]);
		  }
		}*/
		getSharedObjectStorage().setItem(this._path, encoded);
	}

	public get data(): ASObject {
		return this._data;
	}

	public set data(object: ASObject) {
		this._data = object;
	}

	public get objectEncoding(): number /*uint*/ {
		notImplemented('public flash.net.SharedObject::get objectEncoding');
		return;
	}

	public set objectEncoding(version: number /*uint*/) {
		notImplemented('public flash.net.SharedObject::set objectEncoding');
		return;
	}

	public get client(): ASObject {
		notImplemented('public flash.net.SharedObject::get client');
		return;
		// return this._client;
	}

	public set client(object: ASObject) {
		notImplemented('public flash.net.SharedObject::set client');
		return;
		// this._client = object;
	}

	public setDirty(propertyName: string): void {
		notImplemented('public flash.net.SharedObject::setDirty');
		return;
	}

	public connect(myConnection: any, params: string = null): void {
		notImplemented('public flash.net.SharedObject::connect');
		return;
	}

	public send(): void {
		notImplemented('public flash.net.SharedObject::send');
		return;
	}

	public close(): void {
		notImplemented('public flash.net.SharedObject::close');
		return;
	}

	public clear(): void {
		notImplemented('public flash.net.SharedObject::clear');
		return;
	}

	public get size(): number {
		notImplemented('public flash.net.SharedObject::get size');
		return;
	}

	public set fps(updatesPerSecond: number) {
		notImplemented('public flash.net.SharedObject::set fps');
		return;
	}

	public setProperty(propertyName: string, value: any = null): void {
		notImplemented('public flash.net.SharedObject::setProperty');
		return;
	}
}
