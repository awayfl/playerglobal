import { ASObject } from '@awayfl/avm2';

export class ShaderPrecision extends ASObject {

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
	public static FULL: string = 'full';
	public static FAST: string = 'fast';

	// AS -> JS Bindings

}