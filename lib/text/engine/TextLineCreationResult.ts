import { ASObject } from '@awayfl/avm2';

export class TextLineCreationResult extends ASObject {

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
		console.warn('[TextLineCreationResult] not implemented');
	}

	// JS -> AS Bindings
	public static SUCCESS: string = 'success';
	public static EMERGENCY: string = 'emergency';
	public static COMPLETE: string = 'complete';
	public static INSUFFICIENT_WIDTH: string = 'insufficientWidth';

	// AS -> JS Bindings

}
