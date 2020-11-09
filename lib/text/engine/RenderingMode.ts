import { ASObject } from '@awayfl/avm2';

export class RenderingMode extends ASObject {

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
		console.warn('[RenderingMode] not implemented');
	}

	// JS -> AS Bindings
	public static NORMAL: string = 'normal';
	public static CFF: string = 'cff';

	// AS -> JS Bindings

}
