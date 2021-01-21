import { Event } from './Event';
export class SyncEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;
	changeList: any[];

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		changeList: any [] = null) {
		super(type, bubbles, cancelable);
		// TODO: coerce
		this.changeList = changeList;
	}

	// JS -> AS Bindings
	static SYNC: string = 'sync';
}