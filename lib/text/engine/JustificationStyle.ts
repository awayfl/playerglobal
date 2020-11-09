import { ASObject } from '@awayfl/avm2';

export class JustificationStyle extends ASObject {

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
		console.warn('[JustificationStyle] not implemented');
	}

	// JS -> AS Bindings
	public static PUSH_IN_KINSOKU: string = 'pushInKinsoku';
	public static PUSH_OUT_ONLY: string = 'pushOutOnly';
	public static PRIORITIZE_LEAST_ADJUSTMENT: string = 'prioritizeLeastAdjustment';

	// AS -> JS Bindings

}