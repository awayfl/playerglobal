import { Event } from '../../events/Event';
import { axCoerceString } from '@awayjs/graphics';

export class StageVideoAvailabilityEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;
	availability: string;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		availability: string = null) {
		super(type, bubbles, cancelable);
		this.availability = axCoerceString(availability);
	}

	// JS -> AS Bindings
	static STAGE_VIDEO_AVAILABILITY: string = 'stageVideoAvailability';
}