import { InteractiveObject } from '../../display/InteractiveObject';
import { Event } from '../../events/Event';

export class ContextMenuEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	mouseTarget: InteractiveObject;
	contextMenuOwner: InteractiveObject;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		mouseTarget: InteractiveObject = null,
		contextMenuOwner: InteractiveObject = null) {
		super(type, bubbles, cancelable);
		// TODO: coerce
		this.mouseTarget = mouseTarget;
		this.contextMenuOwner = contextMenuOwner;
	}

	// JS -> AS Bindings
	static MENU_ITEM_SELECT: string = 'menuItemSelect';
	static MENU_SELECT: string = 'menuSelect';
}
