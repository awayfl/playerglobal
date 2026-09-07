import { ASObject } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';
import { DefaultFontManager, Font as AwayFont } from '@awayjs/scene';

/**
 * DefineFont symbols are stored under "family-id", but AS3 Font.fontName /
 * TextFormat.font use the family string. Patch getFont so a miss on the
 * exact key still finds an embedded face by Font.name before falling back
 * to DeviceFontManager (which caused Cube Escape Theatre elevator text to
 * render as doubled device-font glyphs when embedFonts was a PIR no-op).
 */
function patchEmbeddedFontNameLookup(): void {
	const manager: any = DefaultFontManager;
	if (manager.__awayflEmbedFontNameLookupPatched)
		return;
	manager.__awayflEmbedFontNameLookupPatched = true;

	const originalGetFont = manager.getFont.bind(manager);
	manager.getFont = function(fontName: string, namespace: string = undefined): AwayFont {
		const font = originalGetFont(fontName, namespace);
		if (!fontName || (font && font.name === fontName))
			return font;

		const registered = manager._registered_fonts;
		if (registered) {
			const namespaces = namespace
				? [namespace]
				: (manager._namespaces && manager._namespaces.length
					? manager._namespaces
					: Object.keys(registered));
			for (let i = 0; i < namespaces.length; i++) {
				const nsFonts = registered[namespaces[i]];
				if (!nsFonts)
					continue;
				for (const key in nsFonts) {
					const candidate = nsFonts[key];
					if (candidate && candidate.name === fontName) {
						manager.registerFontForClassName(candidate, fontName);
						return candidate;
					}
				}
			}
		}

		return font;
	};
}

patchEmbeddedFontNameLookup();

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
			// Also alias under Font.fontName for TextFormat lookup / embedFonts.
			if (this._adaptee?.name) {
				DefaultFontManager.registerFontForClassName(this._adaptee, this._adaptee.name);
			}
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
		// Constructing the embedded Font subclass registers it under fontName
		// via the constructor (parsing already registered the DefineFont asset).
		if (!font)
			return;
		try {
			const ctor = font.axClass || font;
			if (typeof ctor === 'function')
				new ctor();
		} catch (_e) {
			// Safe to ignore — DefineFont registration still applies.
		}
	}

	public hasGlyphs(str: String): Boolean {
		// @todo
		Debug.throwPIR('playerglobals/text/Font', 'hasGlyphs', '');
		return false;
	}
}
