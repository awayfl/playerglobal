import { URLRequest } from './URLRequest';
import { EventDispatcher } from '../events/EventDispatcher';
import { ByteArray } from '../utils/ByteArray';
import { FileFilter } from './FileFilter';
import { ASObject, axCoerceString, Errors } from '@awayfl/avm2';
import { SecurityDomain } from '../SecurityDomain';
import { Event } from '../events/Event';
import { IOErrorEvent } from '../events/IOErrorEvent';
import { Settings } from '../Settings';

const USE_FILE_PICKER = ('showSaveFilePicker' in self) && Settings.ENABLE_FILE_PICKER;

if (USE_FILE_PICKER) {
	console.debug('[FileReference] `showSaveFilePicker` used for save()');
}

// not in the shared error table (yet)
const FILE_REFERENCE_BUSY_ERROR = {
	code: 2174,
	message: 'Only one download, upload, load or save operation can be active at a time on each FileReference.'
};

export class FileReference extends EventDispatcher {
	public static forceNativeMethods = true;

	private _creationDate: Date;
	private _modificationDate: Date;
	private _name: string;
	private _size: number;
	private _creator: string;
	private _type: string;
	private _permissionStatus: string;
	private _extension: string;
	private _data: ByteArray;
	private _saving: boolean = false;

	constructor() {
		super();
	}

	public get size(): number {
		return this._size;
	}

	public set size(value: number) {
		this._size = value;
	}

	public get data(): ByteArray {
		return this._data;
	}

	public set data(value: ByteArray) {
		this._data = value;
	}

	public get extension(): string {
		return this._extension;
	}

	public set extension(value: string) {
		this._extension = value;
	}

	public get permissionStatus(): string {
		return this._permissionStatus;
	}

	public set permissionStatus(value: string) {
		this._permissionStatus = value;
	}

	public get type(): string {
		return this._type;
	}

	public set type(value: string) {
		this._type = value;
	}

	public get creator(): string {
		return this._creator;
	}

	public set creator(value: string) {
		this._creator = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get modificationDate(): Date {
		return this._modificationDate;
	}

	public set modificationDate(value: Date) {
		this._modificationDate = value;
	}

	public get creationDate(): Date {
		return this._creationDate;
	}

	public set creationDate(value: Date) {
		this._creationDate = value;
	}

	private static knownMimeTypes = {
		'.jpeg': { 'mime': 'image/jpeg', 'description': 'JPEG images' },
		'.jpg': { 'mime': 'image/jpeg', 'description': 'JPEG images' },
		'.txt': { 'mime': 'text/plain', 'description': 'Text documents' },
	}

	//Displays a file-browsing dialog box that lets the user select a file to upload.
	public browse(typelist: FileFilter[]): boolean {
		const knownTypes = FileReference.knownMimeTypes;
		const openDialog: (options: OpenFilePickerOptions) => Promise<[FileSystemFileHandle]> = window.showOpenFilePicker;

		if (!openDialog) {
			console.warn('[flash/net/FileReference] FileSystem API not supported!');
			return false;
		}

		const types = [];
		for (let i = 0; i < typelist.length; i++) {
			const filter = typelist[i];
			const extension = filter.extension.slice(filter.extension.lastIndexOf('.'));
			const mime = extension in knownTypes ? knownTypes[extension]['mime'] : 'application/unknown';
			types.push({
				description: filter.description,
				accept: { [mime]: extension }
			});
		}

		const options: OpenFilePickerOptions = {
			types
		};

		openDialog(options)
			.then((fileHandler) => {
				this._sendSelectEvent();
				return fileHandler[0].getFile();
			})
			.then((file) => {
				this.modificationDate = new Date(file.lastModified);
				this.name = file.name;
				this.size = file.size;
				this.type = file.type;

				const extIndex = file.name.lastIndexOf('.');
				this.extension = extIndex >= 0 ? file.name.slice(extIndex + 1) : null;

				return file.arrayBuffer();
			})
			.then((buf)=>{
				this.data = new ByteArray(buf.byteLength);
				this.data.setArrayBuffer(buf);
				this._sendCompleteEvent();
			})
			.catch((e: DOMException) => {
				if (FileReference._isAbort(e)) {
					this._sendCancelEvent();
					return;
				}

				console.warn('[flash/net/FileReference] FileSystem API Reject `showOpenFilePicker` request:', e);
			});

		return true;
	}

	//Starts the upload of the file to a remote server.
	public upload(url: URLRequest): boolean {
		console.log('upload not implemented yet in flash/FileReference');
		return true;
	}

	//Starts the load of a local file selected by a user.
	public load() {
		console.log('load not implemented yet in flash/FileReference');
	}

	//Opens a dialog box that lets the user save a file to the local filesystem.
	//
	// Data: String is saved as UTF-8 text, ByteArray as its bytes (up to length), XML/XMLList
	// via toXMLString(), any other object via its AS3 toString(). null throws ArgumentError #2007.
	// Only one save may be in progress at a time; a second call throws IllegalOperationError.
	//
	// Path: the save dialog (showSaveFilePicker) when available and enabled, otherwise a
	// Blob URL download. The choice is made synchronously, because both need the user
	// gesture that is still active while save() runs. Once the dialog has been opened the
	// gesture is spent, so a dialog failure (other than cancel, which dispatches cancel)
	// dispatches ioError rather than attempting a download the browser would silently block.
	public save(data: string | ASObject, defaultFileName: string = null) {
		const sec = <SecurityDomain> this.sec;

		if (data == null)
			sec.throwError('ArgumentError', Errors.NullPointerError, 'data');

		if (this._saving)
			sec.throwError('flash.errors.IllegalOperationError', FILE_REFERENCE_BUSY_ERROR);

		const name = defaultFileName || '';
		const blob = this._toBlob(data, name);

		this._name = name;
		this._size = blob.size;
		this._saving = true;

		if (USE_FILE_PICKER && typeof (<any>self).showSaveFilePicker === 'function') {
			let promise: Promise<FileSystemFileHandle> = null;

			try {
				promise = (<any>self).showSaveFilePicker(FileReference._pickerOptions(name));
			} catch (e) {
				// threw synchronously, before using the gesture: a download is still allowed
				console.warn('[FileReference] save dialog unavailable, using a download instead:', e);
			}

			if (promise) {
				this._saveWithFilePicker(promise, blob);
				return;
			}
		}

		this._saveWithAnchor(blob, name);
	}

	private static _extOf(name: string): string {
		const i = name ? name.lastIndexOf('.') : -1;
		return i >= 0 ? name.slice(i).toLowerCase() : '';
	}

	private static _isAbort(e: any): boolean {
		return !!e && (e.name === 'AbortError' || e.code === 20);
	}

	private static _pickerOptions(name: string): SaveFilePickerOptions {
		const ext = FileReference._extOf(name);
		const known = FileReference.knownMimeTypes[ext];
		const options: SaveFilePickerOptions = { suggestedName: name };

		if (known)
			options.types = [{ description: known.description, accept: { [known.mime]: [ext] } }];

		return options;
	}

	private _toBlob(data: any, name: string): Blob {
		const known = FileReference.knownMimeTypes[FileReference._extOf(name)];

		if (typeof data !== 'string' && typeof data.getBytes === 'function') {
			// copy, so the blob does not alias (or outlive) the ByteArray's backing buffer
			const bytes: Uint8Array = data.getBytes().slice(0, data.length);
			return new Blob([bytes], { type: known ? known.mime : 'application/octet-stream' });
		}

		return new Blob([this._toText(data)], { type: known ? known.mime : 'text/plain' });
	}

	private _toText(data: any): string {
		if (typeof data === 'string')
			return data;

		// XML/XMLList are written as markup; their toString() gives only the text content
		// of simple elements (e.g. '' for <a/>)
		if (typeof data.$BgtoXMLString === 'function')
			return axCoerceString(data.$BgtoXMLString());

		// the AS3 public toString() (an override in user code, or Object's default)
		if (typeof data.$BgtoString === 'function')
			return axCoerceString(data.$BgtoString());

		return axCoerceString(data);
	}

	private _saveWithFilePicker(promise: Promise<FileSystemFileHandle>, blob: Blob): void {
		let selected = false;

		promise
			.then((handle) => {
				selected = true;
				this._sendSelectEvent();
				return handle.createWritable();
			})
			.then((stream) => stream.write(blob).then(() => stream.close()))
			.then(() => {
				this._saving = false;
				this._sendCompleteEvent();
			})
			.catch((e: DOMException) => {
				this._saving = false;

				if (!selected && FileReference._isAbort(e)) {
					this._sendCancelEvent();
					return;
				}

				// refused (e.g. SecurityError / NotAllowedError) or the write failed: no download
				// fallback here, the user gesture has already been used by the dialog
				console.warn('[FileReference] save failed:', e);
				this._sendIOErrorEvent(e && e.message);
			});
	}

	private _saveWithAnchor(blob: Blob, name: string): void {
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');

		a.href = url;
		a.download = name || 'download';
		a.style.display = 'none';
		document.body.appendChild(a);

		try {
			a.click();
		} catch (e) {
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
			this._saving = false;
			this._sendIOErrorEvent(e && e.message);
			return;
		}

		document.body.removeChild(a);

		// the browser gives no feedback for downloads, so report success asynchronously,
		// as the events would arrive after save() returns
		setTimeout(() => {
			this._saving = false;
			this._sendSelectEvent();
			this._sendCompleteEvent();
		}, 0);

		// keep the object URL alive long enough for the download to start
		setTimeout(() => URL.revokeObjectURL(url), 60000);
	}

	private _sendIOErrorEvent(text: string = '') {
		const sec = <SecurityDomain> this.sec;
		const event = new sec.flash.events.IOErrorEvent(IOErrorEvent.IO_ERROR, false, false, text || '');

		event.currentTarget = this;
		event.target = this;

		this.dispatchEvent(event);
	}

	private _sendCancelEvent() {
		const event  = new (<SecurityDomain> this.sec).flash.events.Event(Event.CANCEL);

		event.currentTarget = this;
		event.target = this;

		this.dispatchEvent(event);
	}

	private _sendCompleteEvent() {
		const event  = new (<SecurityDomain> this.sec).flash.events.Event(Event.COMPLETE);
		event.currentTarget = this;
		event.target = this;

		this.dispatchEvent(event);
	}

	private _sendSelectEvent() {
		const event  = new (<SecurityDomain> this.sec).flash.events.Event(Event.SELECT);

		event.currentTarget = this;
		event.target = this;

		this.dispatchEvent(event);
	}

	//Requests permission to access filesystem.
	public requestPermission() {
		console.log('upload not implemented yet in flash/FileReference');
	}

	//Opens a dialog box that lets the user download a file from a remote server.
	public download(url: URLRequest, defaultFileName: string): boolean {
		console.log('download not implemented yet in flash/FileReference');
		return true;
	}

	//Cancels any ongoing upload or download operation on this FileReference object.
	public cancel() {
		console.log('cancel not implemented yet in flash/FileReference');
	}
}