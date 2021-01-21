import { Event } from './Event';
import { InteractiveObject } from '../display/InteractiveObject';
export class SoftKeyboardEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor(type: string, bubbles: boolean, cancelable: boolean,
		relatedObjectVal: InteractiveObject, triggerTypeVal: string) {
		super(type, bubbles, cancelable);
	}

	// JS -> AS Bindings
	static SOFT_KEYBOARD_ACTIVATE: string = 'softKeyboardActivate';
	static SOFT_KEYBOARD_DEACTIVATE: string = 'softKeyboardDeactivate';
	static SOFT_KEYBOARD_ACTIVATING: string = 'softKeyboardActivating';
}
