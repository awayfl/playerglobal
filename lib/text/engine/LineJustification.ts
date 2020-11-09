import { ASObject } from '@awayfl/avm2';

export class LineJustification extends ASObject {

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
		console.warn('[LineJustification] not implemented');
	}

	// JS -> AS Bindings
	public static UNJUSTIFIED: string = 'unjustified';
	public static ALL_BUT_LAST: string = 'allButLast';
	public static ALL_INCLUDING_LAST: string = 'allIncludingLast';
	public static ALL_BUT_MANDATORY_BREAK: string = 'allButMandatoryBreak';

	// AS -> JS Bindings

}
