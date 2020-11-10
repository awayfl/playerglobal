import { ASObject } from '@awayfl/avm2';

export class TypographicCase extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

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