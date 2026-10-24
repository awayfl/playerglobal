import { URLRequest } from './URLRequest';
import { EventDispatcher } from '../events/EventDispatcher';
import { ByteArray } from '../utils/ByteArray';
import { FileFilter } from './FileFilter';
import { ASObject } from '@awayfl/avm2';
import { SecurityDomain } from '../SecurityDomain';
import { Event } from '../events/Event';
import { IOErrorEvent } from '../events/IOErrorEvent';
import { Settings } from '../Settings';

const USE_FILE_PICKER = ('showSaveFilePicker' in self) && Settings.ENABLE_FILE_PICKER;

if (USE_FILE_PICKER) {
	console.debug('[FileReference] `showSaveFilePicker` used for save()');
}

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
				if (e.code === 20 && e.message === 'The user aborted a request.') {
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
	public save(data: string | ASObject, defaultFileName: string = null) {
		const name = defaultFileName || '';
		const blob = FileReference._toBlob(data, name);

		if (!blob) {
			console.warn('[FileReference] save() supports String and ByteArray data only');
			return;
		}

		this._name = name;
		this._size = blob.size;

		// Both paths must start synchronously here: save() is normally called from a
		// mouse handler, and the browser only allows a save dialog / download while
		// the originating user gesture is still active.
		if (USE_FILE_PICKER && this._saveWithFilePicker(blob, name))
			return;

		this._saveWithAnchor(blob, name);
	}

	private static _toBlob(data: any, name: string): Blob | null {
		const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
		const known = FileReference.knownMimeTypes[ext];

		if (typeof data === 'string')
			return new Blob([data], { type: known ? known.mime : 'text/plain' });

		if (data && typeof data.getBytes === 'function') {
			// copy, so the blob does not alias (or outlive) the ByteArray's backing buffer
			const bytes: Uint8Array = data.getBytes().slice(0, data.length);
			return new Blob([bytes], { type: known ? known.mime : 'application/octet-stream' });
		}

		// other objects are saved as their string representation
		if (data && typeof data.toString === 'function')
			return new Blob([String(data)], { type: 'text/plain' });

		return null;
	}

	private _saveWithFilePicker(blob: Blob, name: string): boolean {
		const openDialog: (options?: SaveFilePickerOptions) => Promise<FileSystemFileHandle>
			= (<any>self).showSaveFilePicker;

		if (!openDialog)
			return false;

		const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
		const known = FileReference.knownMimeTypes[ext];
		const options: SaveFilePickerOptions = { suggestedName: name };

		if (known && ext.length > 1)
			options.types = [{ description: known.description, accept: { [known.mime]: [ext] } }];

		let promise: Promise<FileSystemFileHandle>;

		try {
			promise = openDialog.call(self, options);
		} catch (e) {
			return false;
		}

		let selected = false;

		promise
			.then((handle) => {
				selected = true;
				this._sendSelectEvent();
				return handle.createWritable();
			})
			.then((stream) => stream.write(blob).then(() => stream.close()))
			.then(() => this._sendCompleteEvent())
			.catch((e: DOMException) => {
				if (selected) {
					console.warn('[FileReference] writing the file failed:', e);
					this._sendIOErrorEvent(e && e.message);
					return;
				}

				if (e && e.name === 'AbortError') {
					this._sendCancelEvent();
					return;
				}

				// e.g. SecurityError / NotAllowedError when the picker is refused:
				// the gesture may already be consumed, but a download link still works
				console.warn('[FileReference] save dialog unavailable, using a download instead:', e);
				this._saveWithAnchor(blob, name);
			});

		return true;
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
			this._sendIOErrorEvent(e && e.message);
			return;
		}

		document.body.removeChild(a);

		// the browser gives no feedback for downloads, so report success asynchronously,
		// as the events would arrive after save() returns
		setTimeout(() => {
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