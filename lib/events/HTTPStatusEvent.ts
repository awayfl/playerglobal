import { Event } from './Event';

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
// Class: IOErrorEvent
export class HTTPStatusEvent extends Event {
	static classInitializer: any = null;

	private _responseURL = '';
	private _responseHeaders: Array<any> = null;

	constructor(
		type: string,
		bubbles: boolean = false,
		cancelable: boolean = false,
		private _status: number = 0,
		private _redirected: boolean = false
	) {
		super(type, bubbles, cancelable);
	}

	/**
	 * @description Undocumented method!
	 */
	protected _setStatus(v: number) {
		this._status = v;
	}

	get status() {
		return this._status;
	}

	get redirected() {
		return this._redirected;
	}

	set redirected(v: boolean) {
		this._redirected = v;
	}

	get responseURL() {
		return this._responseURL;
	}

	set responseURL(v: string) {
		this._responseURL = v;
	}

	public get responseHeaders() {
		return this._responseHeaders;
	}

	public set responseHeaders(value: Array<any>) {
		this._responseHeaders = value;
	}

	// JS -> AS Bindings
	static HTTP_RESPONSE_STATUS: string = 'httpResponseStatus';
	static HTTP_STATUS: string = 'httpStatus';

	clone(): HTTPStatusEvent {
		return new HTTPStatusEvent(this.type, this.bubbles, this.cancelable, this._status, this._redirected);
	}

	toString(): string {
		return this.formatToString('IOErrorEvent', 'type', 'bubbles', 'cancelable', 'text', 'errorID');
	}
}
