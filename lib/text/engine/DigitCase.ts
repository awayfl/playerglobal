import { ASObject } from '@awayfl/avm2';

export class DigitCase extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[DigitCase] not implemented');
	}

	// JS -> AS Bindings
	public static DEFAULT: string = 'default';
	public static LINING: string = 'lining';
	public static OLD_STYLE: string = 'oldStyle';

	// AS -> JS Bindings

}
