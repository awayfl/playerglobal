import { URLRequest as URLRequestAway, URLVariables as URLVariablesAway } from '@awayjs/core';
import { ASObject, ASArray, axCoerceString, transformJSValueToAS, transformASValueToJS } from '@awayfl/avm2';
import { URLVariables } from './URLVariables';

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
// Class: URLRequest

export class URLRequest extends ASObject {

	// Called whenever the class is initialized.
	static axClass: typeof URLRequest;

	private _adaptee: URLRequestAway;
	private _data: ASObject;

	constructor (url: string = null) {
		super();
		this._adaptee = new URLRequestAway(url);
	}

	get adaptee(): URLRequestAway {
		return this._adaptee;
	}

	set adaptee(value: URLRequestAway) {
		this._adaptee = value;
	}

	get url(): string {
		return this._adaptee.url;
	}

	set url(value: string) {
		value = axCoerceString(value);
		this._adaptee.url = value;
	}

	get data(): ASObject {
		const adapteeData = this._adaptee.data;
		let returnData = this._adaptee.data;

		if (adapteeData instanceof URLVariablesAway) {
			returnData = new URLVariables();
			for (const key in this._adaptee.data.variables) {
				returnData['$Bg' + key] = this._adaptee.data.variables[key];
			}
		} else if (typeof adapteeData === 'object') {
			returnData = transformJSValueToAS(this.sec, adapteeData, true);
		}

		return this._data = returnData;
	}

	set data(value: ASObject) {
		this._data = value;

		this.mapToJSData();
	}

	/**
	 * Query data for request, taht mapped onto JS, this is because we can't convert data to JS in assigment
	 * data is object, and AS sometimes fill data after assigment
	 */
	mapToJSData(): any {
		const value = this._data;
		let jsValue;

		if ((<any> this.sec).flash.net.URLVariables.axIsType(value)) {
			jsValue = new URLVariablesAway();
			for (const key in value) {
				if (key.indexOf('$Bg') == 0 && !(typeof value[key] === 'function')) {
					jsValue.variables[key.replace('$Bg', '')] = value[key];
				}
			}
		} else {
			jsValue = transformASValueToJS(this.sec, value, true);
		}

		this._adaptee.data = jsValue;
		return jsValue;
	}

	get method(): string {
		return this._adaptee.method;
	}

	set method(value: string) {
		this._adaptee.method = value;
	}

	get contentType(): string {
		console.log('TODO: URLRequest.contentType');
		return '';//this._adaptee.contentType;
	}

	set contentType(value: string) {
		console.log('TODO: URLRequest.contentType');
		//this._adaptee.contentType = value;
	}

	get requestHeaders(): ASArray {
		console.log('TODO: URLRequest.requestHeaders');
		return null;//this._adaptee.contentType;
	}

	set requestHeaders(value: ASArray) {
		console.log('TODO: URLRequest.requestHeaders');
		//this._adaptee.contentType = value;
	}

	get digest(): string {
		console.log('TODO: URLRequest.digest');
		return null;//this._adaptee.contentType;
	}

	set digest(value: string) {
		console.log('TODO: URLRequest.digest');
		//this._adaptee.contentType = value;
	}

}