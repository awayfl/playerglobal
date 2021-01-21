import { ASObject } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';
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
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenuClipboardItems', 'get cut', '');
		return this._cut;
	}

	set cut(val: boolean) {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenuClipboardItems', 'set cut', '');
		this._cut = !!val;
	}

	get copy(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenuClipboardItems', 'get copy', '');
		return this._copy;
	}

	set copy(val: boolean) {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenuClipboardItems', 'set copy', '');
		this._copy = !!val;
	}

	get paste(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenuClipboardItems', 'get paste', '');
		return this._paste;
	}

	set paste(val: boolean) {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenuClipboardItems', 'set paste', '');
		this._paste = !!val;
	}

	get clear(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenuClipboardItems', 'get clear', '');
		return this._clear;
	}

	set clear(val: boolean) {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenuClipboardItems', 'set clear', '');
		this._clear = !!val;
	}

	get selectAll(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenuClipboardItems', 'get selectAll', '');
		return this._selectAll;
	}

	set selectAll(val: boolean) {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenuClipboardItems', 'set selectAll', '');
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
