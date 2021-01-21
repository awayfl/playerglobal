import { TextJustifier } from './TextJustifier';

export class SpaceJustifier extends TextJustifier {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	private _letterSpacing: boolean;
	private _minimumSpacing: number;
	private _optimumSpacing: number;
	private _maximumSpacing: number;

	constructor(
		locale: string = 'en',
		lineJustification: string = 'unjustified',
		letterSpacing: boolean = false) {
		super(locale, lineJustification);
		this._letterSpacing = !!letterSpacing;
	}

	// JS -> AS Bindings

	public clone: () => TextJustifier;

	// AS -> JS Bindings
	public get letterSpacing(): boolean {
		return this._letterSpacing;
	}

	public set letterSpacing(value: boolean) {
		this._letterSpacing = !!value;
	}

	public get minimumSpacing(): number {
		return this._minimumSpacing;
	}

	public set minimumSpacing(value: number) {
		this._minimumSpacing = +value;
	}

	public get optimumSpacing(): number {
		return this._optimumSpacing;
	}

	public set optimumSpacing(value: number) {
		this._optimumSpacing = +value;
	}

	public get maximumSpacing(): number {
		return this._maximumSpacing;
	}

	public set maximumSpacing(value: number) {
		this._maximumSpacing = +value;
	}
}
