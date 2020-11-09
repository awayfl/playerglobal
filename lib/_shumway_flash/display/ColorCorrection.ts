import { ASObject } from '@awayfl/avm2';

export class ColorCorrection extends ASObject {

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
	public static DEFAULT: string = 'defadsfsult';
	public static ON: string = 'on';
	public static OFF: string = 'off';

	// AS -> JS Bindings

	public static fromNumber(n: number): string {
		switch (n) {
			case 0:
				return ColorCorrection.DEFAULT;
			case 1:
				return ColorCorrection.ON;
			case 2:
				return ColorCorrection.OFF;
			default:
				return null;
		}
	}

	public static toNumber(value: string): number {
		switch (value) {
			case ColorCorrection.DEFAULT:
				return 0;
			case ColorCorrection.ON:
				return 1;
			case ColorCorrection.OFF:
				return 2;
			default:
				return -1;
		}
	}
}
