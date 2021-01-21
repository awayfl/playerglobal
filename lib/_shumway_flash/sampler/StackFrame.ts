import { ASObject } from '@awayfl/avm2';

export class StackFrame extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string[] = null; // ["toString"];

	constructor() {
		super();
	}

	name: string = undefined;
	file: string = undefined;
	line: number /*uint*/ = undefined;
	scriptID: number = undefined;
}
