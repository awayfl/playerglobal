import { ASObject } from '@awayfl/avm2';

export class FocusDirection extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// JS -> AS Bindings
	public static TOP: string = 'top';
	public static BOTTOM: string = 'bottom';
	public static NONE: string = 'none';

}
