import { ASArray, ASObject, axCoerceString } from '@awayfl/avm2';

export class TextRenderer extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
		console.warn('[TextRenderer] not implemented');
	}

	// static _antiAliasType: string;
	// static _maxLevel: number /*int*/;
	// static _displayMode: string;

	public get antiAliasType(): string {
		console.warn('[TextRenderer] - get antiAliasType not implemented');
		return null;
	}

	public set antiAliasType(value: string) {
		value = axCoerceString(value);
		console.warn('[TextRenderer] - set antiAliasType not implemented');
	}

	public get maxLevel(): number /*int*/ {
		console.warn('[TextRenderer] - get maxLevel not implemented');
		return 0;
	}

	public set maxLevel(value: number /*int*/) {
		value = value | 0;
		console.warn('[TextRenderer] - set maxLevel not implemented');
	}

	public get displayMode(): string {
		console.warn('[TextRenderer] - get displayMode not implemented');
		return null;
	}

	public set displayMode(value: string) {
		value = axCoerceString(value);
		console.warn('[TextRenderer] - set displayMode not implemented');
	}

	public static setAdvancedAntiAliasingTable(
		fontName: string, fontStyle: string,
		colorType: string, advancedAntiAliasingTable: ASArray): void {
		fontName = axCoerceString(fontName);
		fontStyle = axCoerceString(fontStyle);
		colorType = axCoerceString(colorType);
	}

}