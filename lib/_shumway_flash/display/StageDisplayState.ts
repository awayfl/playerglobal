import { ASObject } from '@awayfl/avm2';

export class StageDisplayState extends ASObject {

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
	public static FULL_SCREEN: string = 'fullScreen';
	public static FULL_SCREEN_INTERACTIVE: string = 'fullScreenInteractive';
	public static NORMAL: string = 'normal';

	// AS -> JS Bindings

	public static fromNumber(n: number): string {
		switch (n) {
			case 0:
				return StageDisplayState.FULL_SCREEN;
			case 1:
				return StageDisplayState.FULL_SCREEN_INTERACTIVE;
			case 2:
				return StageDisplayState.NORMAL;
			default:
				return null;
		}
	}

	public static toNumber(value: string): number {
		switch (value) {
			case StageDisplayState.FULL_SCREEN:
				return 0;
			case StageDisplayState.FULL_SCREEN_INTERACTIVE:
				return 1;
			case StageDisplayState.NORMAL:
				return 2;
			default:
				return -1;
		}
	}
}