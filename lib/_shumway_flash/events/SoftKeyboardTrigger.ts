import { ASObject } from '@awayfl/avm2';
export class SoftKeyboardTrigger extends ASObject {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor() {
		super();
	}

	// JS -> AS Bindings
	static CONTENT_TRIGGERED: string = 'contentTriggered';
	static USER_TRIGGERED: string = 'userTriggered';
}