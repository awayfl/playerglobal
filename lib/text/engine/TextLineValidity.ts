import { ASObject } from '@awayfl/avm2';

export class TextLineValidity extends ASObject {

	static forceNative: boolean = true;
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	public static initializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // [];

	constructor() {
		super();
		console.warn('[TextLineValidity] not implemented');
	}

	// JS -> AS Bindings
	public static VALID: string = 'valid';
	public static POSSIBLY_INVALID: string = 'possiblyInvalid';
	public static INVALID: string = 'invalid';
	public static STATIC: string = 'static';

	// AS -> JS Bindings

}
