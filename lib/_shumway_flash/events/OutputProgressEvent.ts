import { Event } from '../../events/Event';
export class OutputProgressEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;
	bytesPending: number;
	bytesTotal: number;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		bytesPending: number = 0, bytesTotal: number = 0) {
		super(type, bubbles, cancelable);
		this.bytesPending = +bytesPending;
		this.bytesTotal = +bytesTotal;
	}

	// JS -> AS Bindings
	static OUTPUT_PROGRESS: string = 'outputProgress';
}