import { URLRequest } from './URLRequest';
import { EventDispatcher } from '../events/EventDispatcher';
import { ByteArray } from '../utils/ByteArray';
import { FileFilter } from './FileFilter';
import { ASObject } from '@awayfl/avm2';
import { SecurityDomain } from '../SecurityDomain';
import { Event } from '../events/Event';
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
		'.jpeg': {'mime': 'image/jpeg', 'description': 'JPEG images'},
		'.jpg': {'mime': 'image/jpeg', 'description': 'JPEG images'},
		'.txt': {'mime': 'text/plain', 'description': 'Text documents'},
	}

	//Displays a file-browsing dialog box that lets the user select a file to upload.
	public browse(typelist: FileFilter[]): boolean {
		const knownTypes = FileReference.knownMimeTypes;
		const openDialog: (options: OpenFilePickerOptions) => Promise<[FileSystemFileHandle]> = window.showOpenFilePicker;

		if (!openDialog) {
			console.warn('[flash/net/FileReference] FileSystem API not supported!');
			return false;
		}

		let types = [];
		for (let i = 0; i < typelist.length; i++) {
			const filter = typelist[i];
			const extension = filter.extension.slice(filter.extension.lastIndexOf('.'));
			const mime = extension in knownTypes ? knownTypes[extension]['mime'] : 'application/unknown';
			types.push({
				description: filter.description,
				accept: {[mime]: extension}
			})
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

				let extIndex = file.name.lastIndexOf('.');
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
	public save(data: string | ASObject, _defaultFileName: string = null) {
		if (this._useFileSystemSave(data, _defaultFileName)) {
			return;
		}
	}

	private _useFileSystemSave(data: any, name: string = ''): boolean {
		const knownTypes = FileReference.knownMimeTypes;
		const isString = typeof data === 'string';
		const isByteArray = data.getBytes !== undefined;
		const ext = name.slice(name.lastIndexOf('.'));

		if (!USE_FILE_PICKER)
			return false;

		// this is draft API
		// https://web.dev/file-system-access/
		const openDialog: (options?: SaveFilePickerOptions) => Promise<FileSystemFileHandle> = window.showSaveFilePicker;

		if (!openDialog) {
			console.warn('[flash/net/FileReference] FileSystem API not supported!');
			return false;
		}

		if (!isString && !isByteArray) {
			console.warn('[FileReference] Save is only supported for String and ByteArray');
			return;
		}

		const types: FilePickerAcceptType[] = [];
		if (ext in knownTypes) {
			const mime = knownTypes[ext].mime;
			types[0] = {
				description: knownTypes[ext].description,
				accept: { [mime] : ext },
			};
		} else {
			types[0] = {
				description: '',
				accept: { 'application/unknown' : ext },
			};
		}

		const options: SaveFilePickerOptions = {
			suggestedName: name || '',
			types
		};

		openDialog(options)
			.then((fileHandler) => {
				this._sendSelectEvent();
				return fileHandler.createWritable();
			})
			.then((stream) => {
				return stream
					.write(isByteArray ? data.getBytes() : data)
					.then(() => stream.close());
			})
			.then((_e)=>{
				this._sendCompleteEvent();
			})
			.catch((e: DOMException) => {
				if (e.code === 20 && e.message === 'The user aborted a request.') {
					this._sendCancelEvent();
					return;
				}

				console.warn('[flash/net/FileReference] FileSystem API Reject `showSaveFilePicker` request:', e);
			});
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