import { ASObject } from '@awayfl/avm2';

export class TextLineCreationResult extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
	}

	// JS -> AS Bindings
	public static SUCCESS: string = 'success';
	public static EMERGENCY: string = 'emergency';
	public static COMPLETE: string = 'complete';
	public static INSUFFICIENT_WIDTH: string = 'insufficientWidth';

	// AS -> JS Bindings

}
