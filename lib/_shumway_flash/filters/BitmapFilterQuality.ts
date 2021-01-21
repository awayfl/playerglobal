import { ASObject } from '@awayfl/avm2';
export class BitmapFilterQuality extends ASObject {

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

	static LOW: number /*int*/ = 1;
	static MEDIUM: number /*int*/ = 2;
	static HIGH: number /*int*/ = 3;

	// AS -> JS Bindings

}