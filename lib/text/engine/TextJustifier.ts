import { ASObject, axCoerceString } from '@awayfl/avm2';

export class TextJustifier extends ASObject {

	static forceNative: boolean = true;
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	public static initializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // ["getJustifierForLocale"];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // ["clone"];

	constructor(locale: string, lineJustification: string) {
		locale = axCoerceString(locale);
		lineJustification = axCoerceString(lineJustification);
		super();
		console.warn('[TextJustifier] not implemented');
	}

	// JS -> AS Bindings
	public static getJustifierForLocale: (locale: string) => TextJustifier;

	public clone: () => TextJustifier;

	// AS -> JS Bindings

	// _locale: string;
	// _lineJustification: string;
	public get locale(): string {
		console.warn('[TextJustifier] - get locale not implemented');
		return null;
	}

	public get lineJustification(): string {
		console.warn('[TextJustifier] - get lineJustification not implemented');
		return null;
	}

	public set lineJustification(value: string) {
		console.warn('[TextJustifier] - set lineJustification not implemented');
	}

	public setLocale(value: string): void {
		console.warn('[TextJustifier] - setLocale not implemented');
	}
}
