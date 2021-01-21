import { ASObject } from '@awayfl/avm2';

export class PrintJobOptions extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string[] = null; // ["printAsBitmap"];

	constructor(printAsBitmap: boolean = false) {
		super();
		this.printAsBitmap = !!printAsBitmap;
	}

	// JS -> AS Bindings

	printAsBitmap: boolean;

	// AS -> JS Bindings

}
