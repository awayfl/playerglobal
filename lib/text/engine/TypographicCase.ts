import { ASObject } from '@awayfl/avm2';

export class TypographicCase extends ASObject {

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
		console.warn('[TypographicCase] not implemented');
	}

	// JS -> AS Bindings
	public static DEFAULT: string = 'default';
	public static TITLE: string = 'title';
	public static CAPS: string = 'caps';
	public static SMALL_CAPS: string = 'smallCaps';
	public static UPPERCASE: string = 'uppercase';
	public static LOWERCASE: string = 'lowercase';
	public static CAPS_AND_SMALL_CAPS: string = 'capsAndSmallCaps';

	// AS -> JS Bindings
}