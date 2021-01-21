import { axCoerceString } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';
import { TextJustifier } from './TextJustifier';

export class EastAsianJustifier extends TextJustifier {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor(
		locale: string = 'ja',
		lineJustification: string = 'allButLast',
		justificationStyle: string = 'pushInKinsoku') {
		locale = axCoerceString(locale);
		lineJustification = axCoerceString(lineJustification);
		justificationStyle = axCoerceString(justificationStyle);
		super(undefined, undefined);
	}

	// JS -> AS Bindings

	public clone: () => TextJustifier;

	// AS -> JS Bindings

	// _justificationStyle: string;
	// _composeTrailingIdeographicSpaces: boolean;
	public get justificationStyle(): string {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/EastAsianJustifier', 'get justificationStyle', '');
		return null;
	}

	public set justificationStyle(value: string) {
		value = axCoerceString(value);
		// @todo
		Debug.throwPIR('playerglobals/text/engine/EastAsianJustifier', 'set justificationStyle', '');
	}

	public get composeTrailingIdeographicSpaces(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/EastAsianJustifier', 'get composeTrailingIdeographicSpaces', '');
		return null;
	}

	public set composeTrailingIdeographicSpaces(value: boolean) {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/EastAsianJustifier', 'set composeTrailingIdeographicSpaces', '');
	}
}
