import { ASArray, ASObject, axCoerceString } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';

export class TextRenderer extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
		// @todo
		Debug.throwPIR('playerglobals/text/TextRenderer', 'constructor', '');
	}

	// static _antiAliasType: string;
	// static _maxLevel: number /*int*/;
	// static _displayMode: string;

	public get antiAliasType(): string {
		// @todo
		Debug.throwPIR('playerglobals/text/TextRenderer', 'get antiAliasType', '');
		return null;
	}

	public set antiAliasType(value: string) {
		value = axCoerceString(value);
		// @todo
		Debug.throwPIR('playerglobals/text/TextRenderer', 'set antiAliasType', '');
	}

	public get maxLevel(): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/text/TextRenderer', 'get maxLevel', '');
		return 0;
	}

	public set maxLevel(value: number /*int*/) {
		// @todo
		Debug.throwPIR('playerglobals/text/TextRenderer', 'set maxLevel', '');
	}

	public get displayMode(): string {
		// @todo
		Debug.throwPIR('playerglobals/text/TextRenderer', 'get displayMode', '');
		return null;
	}

	public set displayMode(value: string) {
		value = axCoerceString(value);
		// @todo
		Debug.throwPIR('playerglobals/text/TextRenderer', 'set displayMode', '');
	}

	public static setAdvancedAntiAliasingTable(
		fontName: string, fontStyle: string,
		colorType: string, advancedAntiAliasingTable: ASArray): void {
		fontName = axCoerceString(fontName);
		fontStyle = axCoerceString(fontStyle);
		colorType = axCoerceString(colorType);
		// @todo
		Debug.throwPIR('playerglobals/text/TextRenderer', 'setAdvancedAntiAliasingTable', '');
	}

}