import { ContextMenuClipboardItems } from './ContextMenuClipboardItems';
import { ASArray } from '@awayfl/avm2';
import { URLRequest } from '../net/URLRequest';
import { ContextMenuBuiltInItems } from './ContextMenuBuiltInItems';
import { NativeMenu } from '../display/NativeMenu';
import { SecurityDomain } from '../SecurityDomain';
import { Debug } from '@awayjs/core';

export class ContextMenu extends NativeMenu {

	static classInitializer: any = null;

	constructor () {
		super();
		this._builtInItems = new (<SecurityDomain> this.sec).flash.ui.ContextMenuBuiltInItems();
		this._customItems = [];
		this._clipboardItems = (<any> this.sec).flash.ui.ContextMenuClipboardItems();
	}

	static get isSupported(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'isSupported', '');
		return false;
	}

	_builtInItems: ContextMenuBuiltInItems;
	_customItems: any [];
	_link: URLRequest;
	_clipboardMenu: boolean;
	_clipboardItems: ContextMenuClipboardItems;

	get builtInItems(): ContextMenuBuiltInItems {
		// TODO: Should clone here probably.
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'get builtInItems', '');
		return this._builtInItems;
	}

	set builtInItems(value: ContextMenuBuiltInItems) {
		// TODO: Should clone here probably.
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'set builtInItems', '');
		this._builtInItems = value;
	}

	get customItems(): ASArray {
		// TODO: Should clone here probably.
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'get customItems', '');
		return this.sec.createArrayUnsafe(this._customItems);
	}

	set customItems(value: ASArray) {
		// TODO: Should clone here probably.
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'set customItems', '');
		this._customItems = value.value;
	}

	get link(): URLRequest {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'get link', '');
		return this._link;
	}

	set link(value: URLRequest) {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'set link', '');
		this._link = value;
	}

	get clipboardMenu(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'set clipboardMenu', '');
		return this._clipboardMenu;
	}

	set clipboardMenu(value: boolean) {
		value = !!value;
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'set clipboardMenu', '');
		this._clipboardMenu = value;
	}

	get clipboardItems(): ContextMenuClipboardItems {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'get clipboardItems', '');
		return this._clipboardItems;
	}

	set clipboardItems(value: ContextMenuClipboardItems) {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'set clipboardItems', '');
		this._clipboardItems = value;
	}

	hideBuiltInItems(): void {
		const items = this.builtInItems;
		if (!items) {
			return;
		}
		items.save = false;
		items.zoom = false;
		items.quality = false;
		items.play = false;
		items.loop = false;
		items.rewind = false;
		items.forwardAndBack = false;
		items.print = false;
	}

	clone(): ContextMenu {
		const result: ContextMenu = new (<SecurityDomain> this.sec).flash.ui.ContextMenu();
		result._builtInItems = this._builtInItems.clone();

		this.cloneLinkAndClipboardProperties(result);
		const customItems = this._customItems;
		for (let i = 0; i < customItems.length; i++) {
			result._customItems.push(customItems[i].clone());
		}
		return result;
	}

	cloneLinkAndClipboardProperties(c: ContextMenu): void {
		// @todo
		Debug.throwPIR('playerglobals/ui/ContextMenu', 'cloneLinkAndClipboardProperties', '');
	}
}