import { TextEvent } from './TextEvent';
export class DataEvent extends TextEvent {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		data: string = '') {
		super(type, bubbles, cancelable, data);
	}

	// JS -> AS Bindings
	static DATA: string = 'data';
	static UPLOAD_COMPLETE_DATA: string = 'uploadCompleteData';
}
