import { ASObject } from '@awayfl/avm2';

export class ClipboardTransferMode extends ASObject {

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
	public static ORIGINAL_PREFERRED: string = 'originalPreferred';
	public static ORIGINAL_ONLY: string = 'originalOnly';
	public static CLONE_PREFERRED: string = 'clonePreferred';
	public static CLONE_ONLY: string = 'cloneOnly';

}
