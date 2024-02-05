import { ASObject } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';
import { DefaultFontManager, Font as AwayFont } from '@awayjs/scene';

export class Font extends ASObject {
	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;
	static classInitializer: any = null;
	static classSymbols: string[] = null;
	static instanceSymbols: string[] = null;

	public isAVMFont: boolean = true;

	private _adaptee: AwayFont;

	constructor() {
		super();
		this.isAVMFont = true;
		if (this.axClassName != 'Font') {
			this._adaptee = DefaultFontManager.getFont(this.axClassName);
		}
	}

	public get fontName(): string {
		return this._adaptee?.name;
	}

	public get fontStyle(): string {
		// @todo
		Debug.throwPIR('playerglobals/text/Font', 'get fontStyle', '');
		return 'regular';
	}

	public get fontType(): string {
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

	public hasGlyphs(str: String): Boolean {
		// @todo
		Debug.throwPIR('playerglobals/text/Font', 'hasGlyphs', '');
		return false;
	}
}
