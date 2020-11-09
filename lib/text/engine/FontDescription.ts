import { ASObject, axCoerceString } from '@awayfl/avm2';

export class FontDescription extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	public static initializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // ["clone"];

	constructor(
		fontName: string = '_serif',
		fontWeight: string = 'normal',
		fontPosture: string = 'normal',
		fontLookup: string = 'device',
		renderingMode: string = 'cff',
		cffHinting: string = 'horizontalStem') {
		fontName = axCoerceString(fontName);
		fontWeight = axCoerceString(fontWeight);
		fontPosture = axCoerceString(fontPosture);
		fontLookup = axCoerceString(fontLookup);
		renderingMode = axCoerceString(renderingMode);
		cffHinting = axCoerceString(cffHinting);
		super();
		console.warn('[FontDescription] not implemented');
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

	// _renderingMode: string;
	// _fontLookup: string;
	// _fontName: string;
	// _fontPosture: string;
	// _fontWeight: string;
	// _cffHinting: string;
	// _locked: boolean;
	public get renderingMode(): string {
		console.warn('[FontDescription] - get renderingMode not implemented');
		return null;
	}

	public set renderingMode(value: string) {
		value = axCoerceString(value);
		console.warn('[FontDescription] - set renderingMode not implemented');
	}

	public get fontLookup(): string {
		console.warn('[FontDescription] - get fontLookup not implemented');
		return null;
	}

	public set fontLookup(value: string) {
		value = axCoerceString(value);
		console.warn('[FontDescription] - set fontLookup not implemented');
	}

	public get fontName(): string {
		console.warn('[FontDescription] - get fontName not implemented');
		return null;
	}

	public set fontName(value: string) {
		value = axCoerceString(value);
		console.warn('[FontDescription] - set fontName not implemented');
	}

	public get fontPosture(): string {
		console.warn('[FontDescription] - get fontPosture not implemented');
		return null;
	}

	public set fontPosture(value: string) {
		value = axCoerceString(value);
		console.warn('[FontDescription] - set fontPosture not implemented');
	}

	public get fontWeight(): string {
		console.warn('[FontDescription] - get fontWeight not implemented');
		return null;
	}

	public set fontWeight(value: string) {
		value = axCoerceString(value);
		console.warn('[FontDescription] - set fontWeight not implemented');
	}

	public get cffHinting(): string {
		console.warn('[FontDescription] - get cffHinting not implemented');
		return null;
	}

	public set cffHinting(value: string) {
		value = axCoerceString(value);
		console.warn('[FontDescription] - set cffHinting not implemented');
	}

	public get locked(): boolean {
		console.warn('[FontDescription] - get locked not implemented');
		return null;
	}

	public set locked(value: boolean) {
		value = !!value;
		console.warn('[FontDescription] - set locked not implemented');
	}
}
