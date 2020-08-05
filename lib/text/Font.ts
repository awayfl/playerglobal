import { ASObject } from "@awayfl/avm2";
import { Font as AwayFont } from "@awayjs/scene";

export class Font extends ASObject {
	static classInitializer: any = null;
	static classSymbols: string[] = null;
	static instanceSymbols: string[] = null;

	private _adaptee: AwayFont;
	constructor() {
		super();
		this._adaptee = new AwayFont();
	}

	get fontName(): string {
		return this._adaptee ? this._adaptee.fontName : "";
	}

	get fontStyle(): string {
		console.warn("`Font#get:fontStyle` not implement yet");

		return "regular";
	}

	get fontType(): string {
		console.warn("`Font#get:fontType` not implement yet");

		return "embedded";
	}

	static enumerateFonts(enumerateDeviceFonts:Boolean = false): [] {
		console.warn("`Font.enumerateFonts` not implement yet");
		return [];
	}

	static registerFont(font: any):void {
		console.warn("`Font.registerFont` not implement yet");
	}

	hasGlyphs(str:String):Boolean {
		console.warn("`Font#hasGlyphs` not implement yet");
		return false;
	}
}
