import { ASObject } from '@awayfl/avm2';

export class BitmapEncodingColorSpace extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// JS -> AS Bindings
	public static COLORSPACE_AUTO: string = 'auto';
	public static COLORSPACE_4_4_4: string = '4:4:4';
	public static COLORSPACE_4_2_2: string = '4:2:2';
	public static COLORSPACE_4_2_0: string = '4:2:0';

}