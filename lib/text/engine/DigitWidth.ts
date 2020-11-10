import { ASObject } from '@awayfl/avm2';

export class DigitWidth extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[DigitWidth] not implemented');
	}

	// JS -> AS Bindings
	public static DEFAULT: string = 'default';
	public static PROPORTIONAL: string = 'proportional';
	public static TABULAR: string = 'tabular';

	// AS -> JS Bindings

}
