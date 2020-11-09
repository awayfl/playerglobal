import { axCoerceString } from '@awayfl/avm2';
import { TextJustifier } from './TextJustifier';

export class SpaceJustifier extends TextJustifier {

	static forceNative: boolean = true;
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	public static initializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // ["clone"];

	constructor(
		locale: string = 'en',
		lineJustification: string = 'unjustified',
		letterSpacing: boolean = false) {
		locale = axCoerceString(locale);
		lineJustification = axCoerceString(lineJustification);
		letterSpacing = !!letterSpacing;
		super(undefined, undefined);
		console.warn('[SpaceJustifier] not implemented');
	}

	// JS -> AS Bindings

	public clone: () => TextJustifier;

	// AS -> JS Bindings

	// _letterSpacing: boolean;
	// _minimumSpacing: number;
	// _optimumSpacing: number;
	// _maximumSpacing: number;
	public get letterSpacing(): boolean {
		console.warn('[SpaceJustifier] - get letterSpacing not implemented');
		return null;
	}

	public set letterSpacing(value: boolean) {
		value = !!value;
		console.warn('[SpaceJustifier] - set letterSpacing not implemented');
	}

	public get minimumSpacing(): number {
		console.warn('[SpaceJustifier] - get maximumSpacing not implemented');
		return null;
	}

	public set minimumSpacing(value: number) {
		value = +value;
		console.warn('[SpaceJustifier] - set minimumSpacing not implemented');
	}

	public get optimumSpacing(): number {
		console.warn('[SpaceJustifier] - get maximumSpacing not implemented');
		return null;
	}

	public set optimumSpacing(value: number) {
		value = +value;
		console.warn('[SpaceJustifier] - set optimumSpacing not implemented');
	}

	public get maximumSpacing(): number {
		console.warn('[SpaceJustifier] - get maximumSpacing not implemented');
		return null;
	}

	public set maximumSpacing(value: number) {
		value = +value;
		console.warn('[SpaceJustifier] - set maximumSpacing not implemented');
	}
}
