import { ASObject } from '@awayfl/avm2';

export class Font extends ASObject {
	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;
	static classInitializer: any = null;
	static classSymbols: string[] = null;
	static instanceSymbols: string[] = null;

	public isAVMFont: boolean = true;
	private _fontName: string;
	constructor() {
		super();
		this.isAVMFont = true;
	}

	get fontName(): string {
		return this._fontName;
	}

	set fontName(value: string) {
		this._fontName = value;
	}

	get fontStyle(): string {
		console.warn('`Font#get:fontStyle` not implement yet');

		return 'regular';
	}

	get fontType(): string {
		console.warn('`Font#get:fontType` not implement yet');

		return 'embedded';
	}

	static enumerateFonts(enumerateDeviceFonts: Boolean = false): [] {
		console.warn('`Font.enumerateFonts` not implement yet');
		return [];
	}

	static registerFont(font: any): void {
		console.warn('`Font.registerFont` not implement yet');
	}

	hasGlyphs(str: String): Boolean {
		console.warn('`Font#hasGlyphs` not implement yet');
		return false;
	}
}
