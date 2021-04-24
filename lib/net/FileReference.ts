import { URLRequest } from './URLRequest';
import { EventDispatcher } from '../events/EventDispatcher';
import { ByteArray } from '../utils/ByteArray';
import { FileFilter } from './FileFilter';
import { ASObject } from '@awayfl/avm2';
import { SecurityDomain } from '../SecurityDomain';
import { Event } from '../events/Event';

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

	//Displays a file-browsing dialog box that lets the user select a file to upload.
	public browse(typelist: FileFilter[]): boolean {
		window.alert('AwayJS: flash.net.FileReference::browse not implemented !');
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
		const isString = typeof data === 'string';

		// this is draft API
		// https://web.dev/file-system-access/
		const openDialog: (options: any) => Promise<any> = (<any>self).showSaveFilePicker;

		if (!openDialog) {
			console.warn('[flash/net/FileReference] FileSystem API not supported!');
			return false;
		}

		if (!isString) {
			console.warn('[FileReference] Non-string is not supported now!');
			return;
		}

		const types = isString ?  [{
			description: 'Text documents',
			accept: {
				'text/plain': ['.txt'],
			},
		}] : [];

		const options = {
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
					.write(data)
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

				console.warn('[flash/net/FileReference] FileSystem API Reject `showSaveFilePicker` requiest:', e);
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