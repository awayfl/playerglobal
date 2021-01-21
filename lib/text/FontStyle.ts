import { ASObject } from '@awayfl/avm2';

export class FontStyle extends ASObject {

	static classInitializer: any = null;
	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor() {
		super();
	}

	// JS -> AS Bindings
	static REGULAR: string = 'regular';
	static BOLD: string = 'bold';
	static ITALIC: string = 'italic';
	static BOLD_ITALIC: string = 'boldItalic';
}