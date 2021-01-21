import { URLRequest } from '../../net/URLRequest';
import { ProgressEvent } from '../../events/ProgressEvent';
import { IOErrorEvent } from '../../events/IOErrorEvent';
import { Event } from '../../events/Event';
import { HTTPStatusEvent } from '../events/HTTPStatusEvent';
import { URLRequestHeader } from './URLRequestHeader';
import { EventDispatcher } from '../../events/EventDispatcher';
import { IDataInput } from '../../utils/IDataInput';
import { axCoerceString, ByteArray, Errors } from '@awayfl/avm2';
import { FileLoadingService, FileLoadingSession } from '@awayfl/swf-loader';
export class URLStream extends EventDispatcher implements IDataInput {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
		this._buffer = new ByteArray();
		this._writePosition = 0;
		this._connected = false;
	}

	private _buffer: ByteArray;
	private _writePosition: number;
	private _session: FileLoadingSession;

	private _connected: boolean;
	// _diskCacheEnabled: boolean;
	get connected(): boolean {
		return this._connected;
	}

	get bytesAvailable(): number /*uint*/ {
		return this._buffer.length - this._buffer.position;
	}

	get objectEncoding(): number /*uint*/ {
		return this._buffer.objectEncoding;
	}

	set objectEncoding(version: number /*uint*/) {
		version = version >>> 0;
		this._buffer.objectEncoding = version;
	}

	get endian(): string {
		return this._buffer.endian;
	}

	set endian(type: string) {
		type = axCoerceString(type);
		this._buffer.endian = type;
	}

	get diskCacheEnabled(): boolean {
		return false;
		// return this._diskCacheEnabled;
	}

	get position(): number {
		return this._buffer.position;
	}

	set position(offset: number) {
		offset = +offset;
		this._buffer.position = offset;
	}

	get length(): number {
		return this._buffer.length;
	}

	load(request: URLRequest): void {

		const session = FileLoadingService.createSession();
		const self = this;
		session.onprogress = function (data, progressState) {
			const readPosition = self._buffer.position;
			self._buffer.position = self._writePosition;
			self._buffer.writeRawBytes(data);
			self._writePosition = self._buffer.position;
			self._buffer.position = readPosition;

			self.dispatchEvent(new ProgressEvent(ProgressEvent.PROGRESS, false, false,
				progressState.bytesLoaded,
				progressState.bytesTotal));
		};
		session.onerror = function (error) {
			self._connected = false;
			self.dispatchEvent(new IOErrorEvent(IOErrorEvent.IO_ERROR, false, false,
				error));
			//const isXDomainError = typeof error === 'string' && error.indexOf('XDOMAIN') >= 0;
			/*Telemetry.instance.reportTelemetry({topic: 'loadResource',
        resultType: isXDomainError ? Telemetry.LoadResource.StreamCrossdomain :
                                      Telemetry.LoadResource.StreamDenied});*/
		};
		session.onopen = function () {
			self._connected = true;
			self.dispatchEvent(new Event(Event.OPEN, false, false));
			/*Telemetry.instance.reportTelemetry({topic: 'loadResource',
        resultType: Telemetry.LoadResource.StreamAllowed});*/
		};
		session.onhttpstatus = function (location: string, httpStatus: number, httpHeaders: any) {
			const httpStatusEvent = new HTTPStatusEvent(HTTPStatusEvent.HTTP_STATUS, false,
				false, httpStatus);
			const headers = [];
			httpHeaders.split(/(?:\n|\r?\n)/g).forEach(function (h) {
				const m = /^([^:]+): (.*)$/.exec(h);
				if (m) {
					headers.push(new URLRequestHeader(m[1], m[2]));
					if (m[1] === 'Location') { // Headers have redirect location
						location = m[2];
					}
				}
			});
			const boxedHeaders = self.sec.createArray(headers);
			httpStatusEvent.axSetPublicProperty('responseHeaders', boxedHeaders);
			httpStatusEvent.axSetPublicProperty('responseURL', location);
			self.dispatchEvent(httpStatusEvent);
		};
		session.onclose = function () {
			self._connected = false;
			self.dispatchEvent(new Event(Event.COMPLETE, false, false));
		};
		session.open(request._toFileRequest());
		this._session = session;
	}

	public readBytes(bytes: ByteArray, offset: number /*uint*/ = 0, length: number /*uint*/ = 0): void {
		offset = offset >>> 0; length = length >>> 0;
		if (length < 0) {
			this.sec.throwError('ArgumentError', Errors.InvalidArgumentError, 'length');
		}

		this._buffer.readBytes(bytes, offset, length);
	}

	public readBoolean(): boolean {
		return;
	}

	public readByte(): number /*int*/ {
		return this._buffer.readByte();
	}

	public readUnsignedByte(): number /*uint*/ {
		return;
	}

	public readShort(): number /*int*/ {
		return;
	}

	public readUnsignedShort(): number /*uint*/ {
		return this._buffer.readUnsignedShort();
	}

	public readUnsignedInt(): number /*uint*/ {
		return;
	}

	public readInt(): number /*int*/ {
		return;
	}

	public readFloat(): number {
		return;
	}

	public readDouble(): number {
		return;
	}

	public readMultiByte(length: number /*uint*/, charSet: string): string {
		length = length >>> 0; charSet = axCoerceString(charSet);
		return;
	}

	public readUTF(): string {
		return this._buffer.readUTF();
	}

	public readUTFBytes(length: number /*uint*/): string {
		return this._buffer.readUTFBytes(length);
	}

	public close(): void {
		if (this._session) {
			this._session.close();
		}
	}

	public readObject(): any {
		return;
	}

	public stop(): void {
		return;
	}
}
