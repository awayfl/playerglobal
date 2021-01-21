import { ASObject } from '@awayfl/avm2';

export class TextLineValidity extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
	}

	// JS -> AS Bindings
	public static VALID: string = 'valid';
	public static POSSIBLY_INVALID: string = 'possiblyInvalid';
	public static INVALID: string = 'invalid';
	public static STATIC: string = 'static';

	// AS -> JS Bindings

}
