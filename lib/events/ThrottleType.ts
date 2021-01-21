import { ASObject } from '@awayfl/avm2';

export class ThrottleType extends ASObject {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor () {
		super();
	}

	// JS -> AS Bindings
	static THROTTLE: string = 'throttle';
	static PAUSE: string = 'pause';
	static RESUME: string = 'resume';
}