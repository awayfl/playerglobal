import { ASObject } from '@awayfl/avm2';

export class AccessibilityProperties extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null;

	constructor () {
		super();
	}

	// JS -> AS Bindings

	public name: string;
	public description: string;
	public shortcut: string;
	public silent: boolean;
	public forceSimple: boolean;
	public noAutoLabeling: boolean;

	// AS -> JS Bindings

}