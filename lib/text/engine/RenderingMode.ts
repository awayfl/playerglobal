import { ASObject } from '@awayfl/avm2';

export class RenderingMode extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
	}

	// JS -> AS Bindings
	public static NORMAL: string = 'normal';
	public static CFF: string = 'cff';

	// AS -> JS Bindings

}
