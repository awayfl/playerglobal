import { ASObject } from '@awayfl/avm2';

export class StageQuality extends ASObject {

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
	public static LOW: string = 'low';
	public static MEDIUM: string = 'medium';
	public static HIGH: string = 'high';
	public static BEST: string = 'best';
	public static HIGH_8X8: string = '8x8';
	public static HIGH_8X8_LINEAR: string = '8x8linear';
	public static HIGH_16X16: string = '16x16';
	public static HIGH_16X16_LINEAR: string = '16x16linear';

	// AS -> JS Bindings

	public static fromNumber(n: number): string {
		switch (n) {
			case 0:
				return StageQuality.LOW;
			case 1:
				return StageQuality.MEDIUM;
			case 2:
				return StageQuality.HIGH;
			case 3:
				return StageQuality.BEST;
			case 4:
				return StageQuality.HIGH_8X8;
			case 5:
				return StageQuality.HIGH_8X8_LINEAR;
			case 6:
				return StageQuality.HIGH_16X16;
			case 7:
				return StageQuality.HIGH_16X16_LINEAR;
			default:
				return null;
		}
	}

	public static toNumber(value: string): number {
		switch (value) {
			case StageQuality.LOW:
				return 0;
			case StageQuality.MEDIUM:
				return 1;
			case StageQuality.HIGH:
				return 2;
			case StageQuality.BEST:
				return 3;
			case StageQuality.HIGH_8X8:
				return 4;
			case StageQuality.HIGH_8X8_LINEAR:
				return 5;
			case StageQuality.HIGH_16X16:
				return 6;
			case StageQuality.HIGH_16X16_LINEAR:
				return 7;
			default:
				return -1;
		}
	}
}