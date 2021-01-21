import { axCoerceString } from '@awayjs/graphics';

import { Event } from '../../events/Event';
export class ThrottleEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	state: string;
	targetFrameRate: number;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		state: string = null, targetFrameRate: number = 0) {
		super(type, bubbles, cancelable);
		this.state = axCoerceString(state);
		this.targetFrameRate = +targetFrameRate;
	}

	// JS -> AS Bindings
	static THROTTLE: string = 'throttle';
}