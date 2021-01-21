import { Event } from './Event';
import { axCoerceString } from '@awayjs/graphics';

export class StageVideoEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	status: string;
	colorSpace: string;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		status: string = null, colorSpace: string = null) {
		super(type, bubbles, cancelable);
		this.status = axCoerceString(status);
		this.colorSpace = axCoerceString(colorSpace);
	}

	// JS -> AS Bindings
	static RENDER_STATE: string = 'renderState';
	static RENDER_STATUS_UNAVAILABLE: string = 'unavailable';
	static RENDER_STATUS_SOFTWARE: string = 'software';
	static RENDER_STATUS_ACCELERATED: string = 'accelerated';
}
