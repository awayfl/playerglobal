import { ASObject } from '@awayfl/avm2';

export class TextRotation extends ASObject {

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
		console.warn('[TextRotation] not implemented');
	}

	// JS -> AS Bindings
	public static ROTATE_0: string = 'rotate0';
	public static ROTATE_90: string = 'rotate90';
	public static ROTATE_180: string = 'rotate180';
	public static ROTATE_270: string = 'rotate270';
	public static AUTO: string = 'auto';

	// AS -> JS Bindings

}
