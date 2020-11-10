import { ASObject } from '@awayfl/avm2';

export class LigatureLevel extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[LigatureLevel] not implemented');
	}

	// JS -> AS Bindings
	public static NONE: string = 'none';
	public static MINIMUM: string = 'minimum';
	public static COMMON: string = 'common';
	public static UNCOMMON: string = 'uncommon';
	public static EXOTIC: string = 'exotic';

	// AS -> JS Bindings

}
