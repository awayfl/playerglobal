import { release, warning } from '@awayfl/swf-loader';
import { ContextMenuClipboardItems } from './ContextMenuClipboardItems';
import { ASArray } from '@awayfl/avm2';
import { URLRequest } from '../net/URLRequest';
import { ContextMenuBuiltInItems } from './ContextMenuBuiltInItems';
import { NativeMenu } from '../display/NativeMenu';
import { SecurityDomain } from '../SecurityDomain';

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
// Class: ContextMenu

const partialImp = (obj: Object, field: string) => warning(`[Builtins] Partial implemented ${obj.constructor.name}::${field}`);

export class ContextMenu extends NativeMenu {

	static classInitializer: any = null;

	constructor () {
		super();
		this._builtInItems = new (<SecurityDomain> this.sec).flash.ui.ContextMenuBuiltInItems();
		this._customItems = [];
		this._clipboardItems = (<any> this.sec).flash.ui.ContextMenuClipboardItems();
	}

	static get isSupported(): boolean {
		partialImp(ContextMenu, 'get isSupported');
		return false;
	}

	_builtInItems: ContextMenuBuiltInItems;
	_customItems: any [];
	_link: URLRequest;
	_clipboardMenu: boolean;
	_clipboardItems: ContextMenuClipboardItems;

	get builtInItems(): ContextMenuBuiltInItems {
		// TODO: Should clone here probably.
		release || partialImp(this, 'get builtInItems');
		return this._builtInItems;
	}

	set builtInItems(value: ContextMenuBuiltInItems) {
		// TODO: Should clone here probably.
		value = value;
		release || partialImp(this, 'set builtInItems');
		this._builtInItems = value;
	}

	get customItems(): ASArray {
		// TODO: Should clone here probably.
		release || partialImp(this, 'get customItems');
		return this.sec.createArrayUnsafe(this._customItems);
	}

	set customItems(value: ASArray) {
		// TODO: Should clone here probably.
		value = value;
		release || partialImp(this, 'set customItems');
		this._customItems = value.value;
	}

	get link(): URLRequest {
		release || partialImp(this, 'get link');
		return this._link;
	}

	set link(value: URLRequest) {
		value = value;
		release || partialImp(this, 'set link');
		this._link = value;
	}

	get clipboardMenu(): boolean {
		release || partialImp(this, 'get clipboardMenu');
		return this._clipboardMenu;
	}

	set clipboardMenu(value: boolean) {
		value = !!value;
		release || partialImp(this, 'set clipboardMenu');
		this._clipboardMenu = value;
	}

	get clipboardItems(): ContextMenuClipboardItems {
		release || partialImp(this, 'get clipboardItems');
		return this._clipboardItems;
	}

	set clipboardItems(value: ContextMenuClipboardItems) {
		release || partialImp(this, 'set clipboardItems');
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
		c = c;
		release || partialImp(this, 'cloneLinkAndClipboardProperties'); return;
	}
}