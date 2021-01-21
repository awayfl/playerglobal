import { ErrorEvent } from '../../events/ErrorEvent';
export class SecurityErrorEvent extends ErrorEvent {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		text: string = '', id: number /*int*/ = 0) {
		super(type, bubbles, cancelable, text, id);
	}

	// JS -> AS Bindings
	static SECURITY_ERROR: string = 'securityError';
}
