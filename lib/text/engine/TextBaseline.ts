import { ASObject } from '@awayfl/avm2';

export class TextBaseline extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	public static initializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // [];

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
