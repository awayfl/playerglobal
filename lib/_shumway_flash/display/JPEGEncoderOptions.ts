import { ASObject } from '@awayfl/avm2';

export class JPEGEncoderOptions extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // ["quality"];

	constructor (quality: number /*uint*/ = 80) {
		super();
		this.quality = quality >>> 0;
	}

	// JS -> AS Bindings

	public quality: number /*uint*/;

	// AS -> JS Bindings

}
