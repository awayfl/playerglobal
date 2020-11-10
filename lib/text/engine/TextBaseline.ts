import { ASObject } from '@awayfl/avm2';

export class TextBaseline extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[TextBaseline] not implemented');
	}

	// JS -> AS Bindings
	public static ROMAN: string = 'roman';
	public static ASCENT: string = 'ascent';
	public static DESCENT: string = 'descent';
	public static IDEOGRAPHIC_TOP: string = 'ideographicTop';
	public static IDEOGRAPHIC_CENTER: string = 'ideographicCenter';
	public static IDEOGRAPHIC_BOTTOM: string = 'ideographicBottom';
	public static USE_DOMINANT_BASELINE: string = 'useDominantBaseline';

	// AS -> JS Bindings

}
