import { DisplayObject } from '../display/DisplayObject';
//import { TextSymbol } from './TextField';

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
// Class: StaticText
export class StaticText extends DisplayObject {

	public static classInitializer: any = null;
	public static classSymbols: string [] = null;
	public static instanceSymbols: string [] = null;

	private _textContent: any/*TextContent*/;

	//_symbol: TextSymbol;
	public applySymbol() {
		console.warn('[StaticText] - applySymbol not impolemented');
		//this._initializeFields();
		//this._setStaticContentFromSymbol(this._symbol);
	}

	constructor () {
		super();
		console.warn('[StaticText] not impolemented');
		/*if (!this._fieldsInitialized) {
			this._initializeFields();
		}*/
	}

	public _canHaveTextContent(): boolean {
		return true;
	}

	public _getTextContent(): any/*TextContent*/ {
		return this._textContent;
	}

	public get text(): string {
		return this._textContent.plainText;
	}
}