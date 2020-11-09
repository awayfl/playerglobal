import { ASObject } from '@awayfl/avm2';

export class StageScaleMode extends ASObject {

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
	public static SHOW_ALL: string = 'showAll';
	public static EXACT_FIT: string = 'exactFit';
	public static NO_BORDER: string = 'noBorder';
	public static NO_SCALE: string = 'noScale';

	public static SHOW_ALL_LOWERCASE: string = 'showall';
	public static EXACT_FIT_LOWERCASE: string = 'exactfit';
	public static NO_BORDER_LOWERCASE: string = 'noborder';
	public static NO_SCALE_LOWERCASE: string = 'noscale';

	// AS -> JS Bindings

	public static fromNumber(n: number): string {
		/*
		switch (n) {
			case Remoting_StageScaleMode.ShowAll:
				return StageScaleMode.SHOW_ALL;
			case Remoting_StageScaleMode.ExactFit:
				return StageScaleMode.EXACT_FIT;
			case Remoting_StageScaleMode.NoBorder:
				return StageScaleMode.NO_BORDER;
			case Remoting_StageScaleMode.NoScale:
				return StageScaleMode.NO_SCALE;
			default:
				return null;
		}
		*/
		console.warn('[playerglobal/display/StageScaleMode] - fromNumber not implemented');
		return null;
	}

	public static toNumber(value: string): number {
		/*switch (value.toLowerCase()) {
			case StageScaleMode.SHOW_ALL_LOWERCASE:
				return Remoting_StageScaleMode.ShowAll;
			case StageScaleMode.EXACT_FIT_LOWERCASE:
				return Remoting_StageScaleMode.ExactFit;
			case StageScaleMode.NO_BORDER_LOWERCASE:
				return Remoting_StageScaleMode.NoBorder;
			case StageScaleMode.NO_SCALE_LOWERCASE:
				return Remoting_StageScaleMode.NoScale;
			default:
				return -1;
		}*/
		console.warn('[playerglobal/display/StageScaleMode] - toNumber not implemented');
		return null;
	}
}