import { ASObject } from '@awayfl/avm2';

export class Kerning extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	static initializer: any = null;

	// List of static symbols to link.
	static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string[] = null; // [];

	constructor() {
		super();
		console.warn('[Kerning] not implemented');
	}

	// JS -> AS Bindings
	static ON: string = 'on';
	static OFF: string = 'off';
	static AUTO: string = 'auto';

	// AS -> JS Bindings

}
