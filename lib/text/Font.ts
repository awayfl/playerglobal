import { ASObject } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';

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
		// @todo
		Debug.throwPIR('playerglobals/text/Font', 'get fontStyle', '');
		return 'regular';
	}

	get fontType(): string {
		// @todo
		Debug.throwPIR('playerglobals/text/Font', 'get fontType', '');
		return 'embedded';
	}

	static enumerateFonts(enumerateDeviceFonts: Boolean = false): [] {
		// @todo
		Debug.throwPIR('playerglobals/text/Font', 'enumerateFonts', '');
		return [];
	}

	static registerFont(font: any): void {
		// this is not needed for AwayJS, because fonts are already registered after parsing
		//console.warn('`Font.registerFont` not implement yet');
	}

	hasGlyphs(str: String): Boolean {
		// @todo
		Debug.throwPIR('playerglobals/text/Font', 'hasGlyphs', '');
		return false;
	}
}
