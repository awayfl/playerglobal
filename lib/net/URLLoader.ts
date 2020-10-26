import { URLLoader as URLLoaderAway, LoaderEvent, URLLoaderEvent, IAssetAdapter } from '@awayjs/core';

import { EventDispatcher } from '../events/EventDispatcher';
import { IEventMapper } from '../events/IEventMapper';
import { Event } from '../events/Event';
import { ProgressEvent } from '../events/ProgressEvent';
import { IOErrorEvent } from '../events/IOErrorEvent';
import { AXClass } from '@awayfl/avm2';
import { URLRequest } from './URLRequest';
import { SecurityDomain } from '../SecurityDomain';
import { IRedirectRule, matchRedirect } from '@awayfl/swf-loader';

export class URLLoader extends EventDispatcher {
	static redirectRules: IRedirectRule[] = [];

	static axClass: typeof URLLoader & AXClass;
	private _adaptee: URLLoaderAway;
	//for AVM1:
	public bytesLoaded: number;
	public bytesTotal: number;

	constructor() {
		super();
		this._adaptee = new URLLoaderAway();

		this._completeCallbackDelegate = (event: URLLoaderEvent) => this.completeCallback(event);
		this._progressCallbackDelegate = (event: URLLoaderEvent) => this.progressCallback(event);
		this._loadErrorDelegate = (event: URLLoaderEvent) => this.loadErrorDelegate(event);
		this.eventMapping[Event.COMPLETE] = (<IEventMapper>{
			adaptedType:URLLoaderEvent.LOAD_COMPLETE,
			addListener:this.initListener,
			removeListener:this.removeListener,
			callback:this._completeCallbackDelegate });
		this.eventMapping[ProgressEvent.PROGRESS] = (<IEventMapper>{
			adaptedType:URLLoaderEvent.LOAD_PROGRESS,
			addListener:this.initListener,
			removeListener:this.removeListener,
			callback:this._progressCallbackDelegate });
		this.eventMapping[IOErrorEvent.IO_ERROR] = (<IEventMapper>{
			adaptedType:URLLoaderEvent.LOAD_ERROR,
			addListener:this.initListener,
			removeListener:this.removeListener,
			callback:this._loadErrorDelegate });
	}

	public close() {
		console.log('not mimplemented: URLoader.close');
	}

	public get data(): any {
		return this._adaptee.data;
	}

	private initListener(type: string, callback: (event: any) => void): void {
		this._adaptee.addEventListener(type, callback);
	}

	private removeListener(type: string, callback: (event: any) => void): void {
		this._adaptee.removeEventListener(type, callback);
	}

	public addEventListener(type: string, callback: (event: any) => void): void {
		super.addEventListener(type, callback);
	}

	private _loadErrorDelegate: (event: URLLoaderEvent) => void;
	private loadErrorDelegate(event: URLLoaderEvent = null): void {
		const newEvent: IOErrorEvent = new (<SecurityDomain> this.sec).flash.events.IOErrorEvent(IOErrorEvent.IO_ERROR);
		newEvent.currentTarget = this;
		this.dispatchEvent(newEvent);
	}

	private _progressCallbackDelegate: (event: URLLoaderEvent) => void;
	private progressCallback(event: URLLoaderEvent = null): void {
		const newEvent: ProgressEvent = new (<SecurityDomain> this.sec).flash.events.ProgressEvent(ProgressEvent.PROGRESS, null, null, event.urlLoader.bytesLoaded, event.urlLoader.bytesTotal);
		newEvent.currentTarget = this;
		this.dispatchEvent(newEvent);
	}

	private _completeCallbackDelegate: (event: URLLoaderEvent) => void;

	private completeCallback(event: URLLoaderEvent = null): void {
		const newEvent: Event = new (<SecurityDomain> this.sec).flash.events.Event(Event.COMPLETE);
		newEvent.currentTarget = this;
		newEvent.target = this;
		this.dispatchEvent(newEvent);
	}

	public load(request: URLRequest): void {
		const directUrl = request.url || '';
		const redirect = matchRedirect(directUrl, URLLoader.redirectRules);

		if (redirect) {
			console.log('[URL LOADER] Override loading url:', redirect.url);
			request.adaptee.url = redirect.url;
		} else {
			console.log('[URL LOADER] start loading the url:', directUrl);
		}

		this._adaptee.load(request.adaptee);
	}
}