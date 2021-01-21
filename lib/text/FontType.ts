import { ASObject } from '@awayfl/avm2';

export class FontType extends ASObject {

	public static classInitializer: any = null;
	public static classSymbols: string [] = null;
	public static instanceSymbols: string [] = null;

	// JS -> AS Bindings
	public static EMBEDDED: string = 'embedded';
	public static EMBEDDED_CFF: string = 'embeddedCFF';
	public static DEVICE: string = 'device';

	constructor () {
		super();
	}

}