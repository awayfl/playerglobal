import { ASObject } from '@awayfl/avm2';
export class DisplacementMapFilterMode extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// JS -> AS Bindings
	static WRAP: string = 'wrap';
	static CLAMP: string = 'clamp';
	static IGNORE: string = 'ignore';
	static COLOR: string = 'color';

	// AS -> JS Bindings

}