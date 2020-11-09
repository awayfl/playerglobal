import { ASObject } from '@awayfl/avm2';

export class LigatureLevel extends ASObject {

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
		console.warn('[LigatureLevel] not implemented');
	}

	// JS -> AS Bindings
	public static NONE: string = 'none';
	public static MINIMUM: string = 'minimum';
	public static COMMON: string = 'common';
	public static UNCOMMON: string = 'uncommon';
	public static EXOTIC: string = 'exotic';

	// AS -> JS Bindings

}
