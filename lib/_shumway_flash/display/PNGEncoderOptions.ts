import { ASObject } from '@awayfl/avm2';

export class PNGEncoderOptions extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // ["fastCompression"];

	constructor (fastCompression: boolean = false) {
		super();
		this.fastCompression = !!fastCompression;
	}

	// JS -> AS Bindings

	public fastCompression: boolean;

	// AS -> JS Bindings

}