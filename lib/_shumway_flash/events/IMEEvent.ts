import { TextEvent } from '../../events/TextEvent';
export class IMEEvent extends TextEvent {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	imeClient: IIMEClient;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		text: string = '', imeClient: IIMEClient = null) {
		super(type, bubbles, cancelable, text);
		// TODO: coerce
		this.imeClient = imeClient;
	}

	// JS -> AS Bindings
	static IME_COMPOSITION: string = 'imeComposition';
	static IME_START_COMPOSITION: string = 'imeStartComposition';
}
