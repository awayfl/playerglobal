import { ErrorEvent } from '../../events/ErrorEvent';

export class UncaughtErrorEvent extends ErrorEvent {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor(type: string = 'uncaughtError', bubbles: boolean = true, cancelable: boolean = true,
		error_in: any = null) {
		super(type, bubbles, cancelable, error_in);
	}

	// JS -> AS Bindings
	static UNCAUGHT_ERROR: string = 'uncaughtError';
}