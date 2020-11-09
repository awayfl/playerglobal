import { ASObject } from '@awayfl/avm2';

export class ColorCorrectionSupport extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// JS -> AS Bindings
	public static UNSUPPORTED: string = 'unsupported';
	public static DEFAULT_ON: string = 'defaultOn';
	public static DEFAULT_OFF: string = 'defaultOff';

	// AS -> JS Bindings

	public static fromNumber(n: number): string {
		switch (n) {
			case 0:
				return ColorCorrectionSupport.UNSUPPORTED;
			case 1:
				return ColorCorrectionSupport.DEFAULT_ON;
			case 2:
				return ColorCorrectionSupport.DEFAULT_OFF;
			default:
				return null;
		}
	}

	public static toNumber(value: string): number {
		switch (value) {
			case ColorCorrectionSupport.UNSUPPORTED:
				return 0;
			case ColorCorrectionSupport.DEFAULT_ON:
				return 1;
			case ColorCorrectionSupport.DEFAULT_OFF:
				return 2;
			default:
				return -1;
		}
	}
}
