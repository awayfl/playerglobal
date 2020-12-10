import { ASObject, axCoerceString } from '@awayfl/avm2';

export class FontDescription extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	private _renderingMode: string;
	private _fontLookup: string;
	private _fontName: string;
	private _fontPosture: string;
	private _fontWeight: string;
	private _cffHinting: string;
	private _locked: boolean;

	constructor(
		fontName: string = '_serif',
		fontWeight: string = 'normal',
		fontPosture: string = 'normal',
		fontLookup: string = 'device',
		renderingMode: string = 'cff',
		cffHinting: string = 'horizontalStem') {
		super();
		this._fontName = axCoerceString(fontName);
		this._fontWeight = axCoerceString(fontWeight);
		this._fontPosture = axCoerceString(fontPosture);
		this._fontLookup = axCoerceString(fontLookup);
		this._renderingMode = axCoerceString(renderingMode);
		this._cffHinting = axCoerceString(cffHinting);
	}

	// JS -> AS Bindings

	public clone: () => FontDescription;

	// AS -> JS Bindings
	public static isFontCompatible(
		fontName: string,
		fontWeight: string,
		fontPosture: string): boolean {
		fontName = axCoerceString(fontName);
		fontWeight = axCoerceString(fontWeight);
		fontPosture = axCoerceString(fontPosture);
		console.warn('[FontDescription] - isFontCompatible not implemented');
		return null;
	}

	public static isDeviceFontCompatible(fontName: string, fontWeight: string, fontPosture: string): boolean {
		fontName = axCoerceString(fontName);
		fontWeight = axCoerceString(fontWeight);
		fontPosture = axCoerceString(fontPosture);
		console.warn('[FontDescription] - isDeviceFontCompatible not implemented');
		return null;
	}

	public get renderingMode(): string {
		return this._renderingMode;
	}

	public set renderingMode(value: string) {
		this._renderingMode = axCoerceString(value);
	}

	public get fontLookup(): string {
		return this._fontLookup;
	}

	public set fontLookup(value: string) {
		this._fontLookup = axCoerceString(value);
	}

	public get fontName(): string {
		return this._fontName;
	}

	public set fontName(value: string) {
		this._fontName = axCoerceString(value);
	}

	public get fontPosture(): string {
		return this._fontPosture;
	}

	public set fontPosture(value: string) {
		this._fontPosture = axCoerceString(value);
	}

	public get fontWeight(): string {
		return this._fontWeight;
	}

	public set fontWeight(value: string) {
		this._fontWeight = axCoerceString(value);
	}

	public get cffHinting(): string {
		return this._cffHinting;
	}

	public set cffHinting(value: string) {
		this._cffHinting = axCoerceString(value);
	}

	public get locked(): boolean {
		console.log("get FontDescription locked",  this._locked);
		return this._locked;
	}

	public set locked(value: boolean) {
		console.log("set FontDescription locked",  value);
		this._locked = value;
	}
}
