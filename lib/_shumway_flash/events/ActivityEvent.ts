import { Event } from '../../events/Event';
export class ActivityEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	activating: boolean;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		activating: boolean = false) {
		super(type, bubbles, cancelable);
		this.activating = !!activating;
	}

	// JS -> AS Bindings
	static ACTIVITY: string = 'activity';
}