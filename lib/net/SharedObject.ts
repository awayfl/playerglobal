import { ASObject } from '@awayfl/avm2';
import { notImplemented, warning, StringUtilities } from '@awayfl/swf-loader';
import { axCoerceString, ObjectEncoding, AMF3, transformASValueToJS, transformJSValueToAS } from '@awayfl/avm2';
import { ByteArray } from '../utils/ByteArray';
import { SecurityDomain } from '../SecurityDomain';

export const AWAY_SO_VERSION = 3;
export const AWAY_SO_MAGIC = 'AWAY';
export const AWAY_SO_HEADER_SIZE = AWAY_SO_MAGIC.length + 2; // magic, version, coma

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
				raw[key] = SharedObject.tryDecodeData(store._values[key]).data;
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
window.addEventListener('unload', () => {
	SharedObject.closeAll();
});
window.addEventListener('blur', () => {
	SharedObject.closeAll();
});

let USED_SEC: any = undefined;
export class SharedObject extends ASObject {
	public awaySOVersion = 1; // legacy
	private _data: ASObject;
	private _object_name: string;

	static axClass: typeof SharedObject;
	static _sharedObjects: Record<string, SharedObject> = {};

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

	/* internal */ static tryDecodeData(data: string): {data: any, version: number} {
		let version = 1;

		if (data.indexOf(AWAY_SO_MAGIC) > -1) {
			version = +data[AWAY_SO_HEADER_SIZE - 1];
			data = data.substring(AWAY_SO_HEADER_SIZE);
		}

		const bytes = StringUtilities.decodeRestrictedBase64ToBytes(data);
		const serializedData = new ByteArray(bytes.length);
		(<any>serializedData).sec = this.sec || USED_SEC;

		serializedData.setArrayBuffer(bytes.buffer);

		return {
			data: AMF3.read(<any>serializedData),
			version: version
		};
	}

	/* internal */ static tryEncodeData(data: any): string {
		const serializedData = new ByteArray();
		(<any>serializedData).sec = this.sec || USED_SEC;

		AMF3.write(<any>serializedData, data);

		const bytes = new Uint8Array(serializedData.arraybytes, 0, serializedData.length);

		return StringUtilities.base64EncodeBytes(bytes);
	}

	public static getLocal(name: string, localPath?: string, secure?: boolean): SharedObject {
		USED_SEC = this.sec;

		name = axCoerceString(name);
		localPath = axCoerceString(localPath);
		secure = !!secure;

		const path = (localPath || '') + '/' + name;

		if (SharedObject._sharedObjects[path]) {
			return SharedObject._sharedObjects[path];
		}

		const encodedData = getSharedObjectStorage().getItem(path);
		const encoding = this._defaultObjectEncoding;

		let data;
		let version = AWAY_SO_VERSION;

		if (encodedData) {
			try {
				const res = SharedObject.tryDecodeData(encodedData);
				data = res.data;
				version = res.version;
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
		so.awaySOVersion = version;

		SharedObject._sharedObjects[path] = so;
		return so;
	}

	public static getRemote(name: string, remotePath?: string, persistence?: boolean, secure?: boolean): SharedObject {
		return new (<SecurityDomain> this.sec).flash.net.SharedObject();
	}

	public static closeAll() {
		for (const key in SharedObject._sharedObjects) {
			if (SharedObject._sharedObjects[key]) {
				SharedObject._sharedObjects[key].close();
			}
		}
	}

	public flush(minDiskSpace: number = 0): void {
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
		const encoded =
			AWAY_SO_MAGIC +
			AWAY_SO_VERSION.toFixed(0) + ',' +
			SharedObject.tryEncodeData(this._data);

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

	/**
	 * Closed and flushed SO
	 * @see https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/SharedObject.html#close()
	 */
	public close(): void {
		// should run flush when close is requested
		this.flush();
		delete SharedObject._sharedObjects[this._path];
	}

	/**
	 * Clear object
	 * @see https://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/SharedObject.html#clear()
	 */
	public clear(): void {
		this._data = this.sec.createObject();
		// should run flush to overwrite a data to empty, but we only remove key
		// this is look like simmilar
		getSharedObjectStorage().removeItem(this._path);
		delete SharedObject._sharedObjects[this._path];
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
