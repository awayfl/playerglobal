
import { axCoerceString } from '@awayfl/avm2';
import { Event } from '../../events/Event';
export class VideoEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	status: string;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		status: string = null) {
		super(type, bubbles, cancelable);
		this.status = axCoerceString(status);
	}

	// JS -> AS Bindings
	static RENDER_STATE: string = 'renderState';
	static RENDER_STATUS_UNAVAILABLE: string = 'unavailable';
	static RENDER_STATUS_SOFTWARE: string = 'software';
	static RENDER_STATUS_ACCELERATED: string = 'accelerated';
}