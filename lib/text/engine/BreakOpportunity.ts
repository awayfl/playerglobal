import { ASObject } from '@awayfl/avm2';

export class BreakOpportunity extends ASObject {

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
		console.warn('[BreakOpportunity] not implemented');
	}

	public static AUTO: string = 'auto';
	public static ANY: string = 'any';
	public static NONE: string = 'none';
	public static ALL: string = 'all';

}