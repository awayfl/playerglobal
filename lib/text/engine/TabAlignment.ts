import { ASObject } from '@awayfl/avm2';

export class TabAlignment extends ASObject {

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
		console.warn('[TabAlignment] not implemented');
	}

	// JS -> AS Bindings
	public static START: string = 'start';
	public static CENTER: string = 'center';
	public static END: string = 'end';
	public static DECIMAL: string = 'decimal';

	// AS -> JS Bindings

}
