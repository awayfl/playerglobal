import { ASObject } from '@awayfl/avm2';

export class FontLookup extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
	}

	// JS -> AS Bindings
	public static DEVICE: string = 'device';
	public static EMBEDDED_CFF: string = 'embeddedCFF';

	// AS -> JS Bindings

}
