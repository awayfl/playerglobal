import { ASObject, axCoerceString } from '@awayfl/avm2';

export class TextJustifier extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	private _locale: string;
	private _lineJustification: string;

	constructor(locale: string, lineJustification: string) {
		super();
		this._locale = axCoerceString(locale);
		this._lineJustification = axCoerceString(lineJustification);
	}

	public static getJustifierForLocale(locale: string): TextJustifier {
		console.warn('[TextJustifier] - getJustifierForLocale not implemented');
		return null;

	}

	public clone(): TextJustifier {
		console.warn('[TextJustifier] - clone not implemented');
		return null;
	}

	public get locale(): string {
		return this._locale;
	}

	public get lineJustification(): string {
		return this._lineJustification;
	}

	public set lineJustification(value: string) {
		this._lineJustification = axCoerceString(value);
	}

	public setLocale(value: string): void {
		this._locale = axCoerceString(value);
	}
}
