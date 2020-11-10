import { ASObject } from '@awayfl/avm2';

export class TabAlignment extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[TabAlignment] not implemented');
	}

	// JS -> AS Bindings
	public static START: string = 'start';
	public static CENTER: string = 'center';
	public static END: string = 'end';
	public static DECIMAL: string = 'decimal';

	// AS -> JS Bindings

}
