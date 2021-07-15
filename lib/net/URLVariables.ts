import { ASObject, Errors, axCoerceString, Multiname } from '@awayfl/avm2';

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
// Class: URLVariables

declare let escape;
declare let unescape;

export class URLVariables extends ASObject {
	static classInitializer: any = null;
	static classSymbols: string [] = null; // [];
	static instanceSymbols: string [] = null;

	constructor (source: string = null) {
		super();
		this._ignoreDecodingErrors = false;
		source && this.decode(source);
	}

	_ignoreDecodingErrors: boolean;

	// class not has traits, and will crash
	axSetProperty(mn: Multiname, value: any) {
		this[mn.getMangledName()] = value ;
	}

	decode(source: string): void {
		source = axCoerceString(source);
		const variables = source.split('&');
		for (let i = 0; i < variables.length; i++) {
			const p = variables[i];
			let j = p.indexOf('=');
			if (j < 0) {
				if (this._ignoreDecodingErrors) {
					j = p.length;
				} else {
					this.sec.throwError('Error', Errors.DecodeParamError);
				}
			}
			const name = unescape(p.substring(0, j).split('+').join(' '));
			const value = unescape(p.substring(j + 1).split('+').join(' '));
			const currentValue = this.axGetPublicProperty(name);
			if (typeof currentValue === 'undefined') {
				this.axSetPublicProperty(name, value);
			} else if (Array.isArray(currentValue)) {
				currentValue.push(value);
			} else {
				this.axSetPublicProperty(name, [currentValue, value]);
			}
		}
	}

	toString(): string {
		const pairs = [];
		const keys = this.axGetEnumerableKeys();
		for (let i = 0; i < keys.length; i++) {
			let name = keys[i].split(' ').join('+');
			const value = this.axGetPublicProperty(name);
			name = escape(name).split(' ').join('+');
			if (Array.isArray(value)) {
				for (let j = 0; j < value.length; j++) {
					pairs.push(name + '=' + escape(value[j]));
				}
			} else {
				pairs.push(name + '=' + escape(value));
			}
		}
		return pairs.join('&');
	}
}