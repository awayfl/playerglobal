import { ASObject } from '@awayfl/avm2';

export class TextRotation extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[TextRotation] not implemented');
	}

	// JS -> AS Bindings
	public static ROTATE_0: string = 'rotate0';
	public static ROTATE_90: string = 'rotate90';
	public static ROTATE_180: string = 'rotate180';
	public static ROTATE_270: string = 'rotate270';
	public static AUTO: string = 'auto';

	// AS -> JS Bindings

}
