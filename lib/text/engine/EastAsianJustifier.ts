import { axCoerceString } from '@awayfl/avm2';
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
		console.warn('[EastAsianJustifier] not implemented');
	}

	// JS -> AS Bindings

	public clone: () => TextJustifier;

	// AS -> JS Bindings

	// _justificationStyle: string;
	// _composeTrailingIdeographicSpaces: boolean;
	public get justificationStyle(): string {
		console.warn('[EastAsianJustifier] - get justificationStyle not implemented');
		return null;
	}

	public set justificationStyle(value: string) {
		value = axCoerceString(value);
		console.warn('[EastAsianJustifier] - set justificationStyle not implemented');
	}

	public get composeTrailingIdeographicSpaces(): boolean {
		console.warn('[EastAsianJustifier] - get composeTrailingIdeographicSpaces not implemented');
		return null;
	}

	public set composeTrailingIdeographicSpaces(value: boolean) {
		console.warn('[EastAsianJustifier] - set composeTrailingIdeographicSpaces not implemented');
	}
}
