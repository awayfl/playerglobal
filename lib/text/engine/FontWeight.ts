import { ASObject } from '@awayfl/avm2';

export class FontWeight extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[FontWeight] not implemented');
	}

	// JS -> AS Bindings
	public static NORMAL: string = 'normal';
	public static BOLD: string = 'bold';

	// AS -> JS Bindings

}
