import { ASObject } from '@awayfl/avm2';

export class FontPosture extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[FontPosture] not implemented');
	}

	// JS -> AS Bindings
	public static NORMAL: string = 'normal';
	public static ITALIC: string = 'italic';

	// AS -> JS Bindings

}
