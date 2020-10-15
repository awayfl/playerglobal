import { release, warning } from '@awayfl/swf-loader';
import { ASObject } from '@awayfl/avm2';

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
// Class: ContextMenuClipboardItems

const partialImp = (obj: Object | Function, field: string) =>
	warning(
		`[Builtins] Partial implemented ${
			(<any>obj).name || obj.constructor.name
		}::${field}`
	);

export class ContextMenuClipboardItems extends ASObject {
	static classInitializer: any = null;
	static classSymbols: string[] = null; // [];
	static instanceSymbols: string[] = null;

	constructor() {
		super();

		this._cut = true;
		this._copy = true;
		this._paste = true;
		this._clear = true;
		this._selectAll = true;
	}

	_cut: boolean;
	_copy: boolean;
	_paste: boolean;
	_clear: boolean;
	_selectAll: boolean;

	get cut(): boolean {
		release || partialImp(this, 'get cut');
		return this._cut;
	}

	set cut(val: boolean) {
		release || partialImp(this, 'set cut');
		this._cut = !!val;
	}

	get copy(): boolean {
		release || partialImp(this, 'get copy');
		return this._copy;
	}

	set copy(val: boolean) {
		release || partialImp(this, 'set copy');
		this._copy = !!val;
	}

	get paste(): boolean {
		release || partialImp(this, 'get paste');
		return this._paste;
	}

	set paste(val: boolean) {
		release || partialImp(this, 'set paste');
		this._paste = !!val;
	}

	get clear(): boolean {
		release || partialImp(this, 'get clear');
		return this._clear;
	}

	set clear(val: boolean) {
		release || partialImp(this, 'set clear');
		this._clear = !!val;
	}

	get selectAll(): boolean {
		release || partialImp(this, 'get selectAll');
		return this._selectAll;
	}

	set selectAll(val: boolean) {
		release || partialImp(this, 'set selectAll');
		this._selectAll = !!val;
	}

	clone(): ContextMenuClipboardItems {
		const items = new ContextMenuClipboardItems();
		items._cut = this._cut;
		items._copy = this._copy;
		items._paste = this._paste;
		items._clear = this._clear;
		items._selectAll = this._selectAll;
		return items;
	}
}
