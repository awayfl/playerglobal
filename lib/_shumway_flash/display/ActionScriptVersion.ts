import { ASObject } from '@awayfl/avm2';

export class ActionScriptVersion extends ASObject {

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
	static ACTIONSCRIPT2: number /*uint*/ = 2;
	static ACTIONSCRIPT3: number /*uint*/ = 3;
}