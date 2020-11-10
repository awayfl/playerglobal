import { ASObject } from '@awayfl/avm2';

export class JustificationStyle extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[JustificationStyle] not implemented');
	}

	// JS -> AS Bindings
	public static PUSH_IN_KINSOKU: string = 'pushInKinsoku';
	public static PUSH_OUT_ONLY: string = 'pushOutOnly';
	public static PRIORITIZE_LEAST_ADJUSTMENT: string = 'prioritizeLeastAdjustment';

	// AS -> JS Bindings

}