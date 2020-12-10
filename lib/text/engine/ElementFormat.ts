import { ASObject, axCoerceString } from '@awayfl/avm2';
import { FontDescription } from './FontDescription';
import { FontMetrics } from './FontMetrics';

export class ElementFormat extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	private _fontDescription: FontDescription;
	private _fontSize: number;
	private _color: number;
	private _alpha: number;
	private _textRotation: string;
	private _dominantBaseline: string;
	private _alignmentBaseline: string;
	private _baselineShift;
	private _kerning: string;
	private _trackingRight: number;
	private _trackingLeft: number;
	private _locale: string;
	private _breakOpportunity: string;
	private _digitCase: string;
	private _digitWidth: string;
	private _ligatureLevel: string;
	private _typographicCase: string;
	private _locked: boolean;

	constructor(
		fontDescription: FontDescription = null,
		fontSize: number = 12,
		color: number /*uint*/ = 0,
		alpha: number = 1,
		textRotation: string = 'auto',
		dominantBaseline: string = 'roman',
		alignmentBaseline: string = 'useDominantBaseline',
		baselineShift: number = 0,
		kerning: string = 'on',
		trackingRight: number = 0,
		trackingLeft: number = 0,
		locale: string = 'en',
		breakOpportunity: string = 'auto',
		digitCase: string = 'default',
		digitWidth: string = 'default',
		ligatureLevel: string = 'common',
		typographicCase: string = 'default') {

		super();

		console.log('create ElementFormat', fontSize, fontDescription?.fontName);
		this._fontDescription = fontDescription;
		this._fontSize = +fontSize;
		this._color = color >>> 0;
		this._alpha = +alpha;
		this._textRotation = axCoerceString(textRotation);
		this._dominantBaseline = axCoerceString(dominantBaseline);
		this._alignmentBaseline = axCoerceString(alignmentBaseline);
		this._baselineShift = +baselineShift;
		this._kerning = axCoerceString(kerning);
		this._trackingRight = +trackingRight;
		this._trackingLeft = +trackingLeft;
		this._locale = axCoerceString(locale);
		this._breakOpportunity = axCoerceString(breakOpportunity);
		this._digitCase = axCoerceString(digitCase);
		this._digitWidth = axCoerceString(digitWidth);
		this._ligatureLevel = axCoerceString(ligatureLevel);
		this._typographicCase = axCoerceString(typographicCase);

	}

	// JS -> AS Bindings

	public clone: () => ElementFormat;

	// AS -> JS Bindings

	public get alignmentBaseline(): string {
		return this._alignmentBaseline;
	}

	public set alignmentBaseline(alignmentBaseline: string) {
		this._alignmentBaseline = axCoerceString(alignmentBaseline);
	}

	public get alpha(): number {
		return this._alpha;
	}

	public set alpha(value: number) {
		this._alpha = +value;
	}

	public get baselineShift(): number {
		return this._baselineShift;
	}

	public set baselineShift(value: number) {
		this._baselineShift = +value;
	}

	public get breakOpportunity(): string {
		return this._breakOpportunity;
	}

	public set breakOpportunity(opportunityType: string) {
		this._breakOpportunity = axCoerceString(opportunityType);
	}

	public get color(): number /*uint*/ {
		return this._color;
	}

	public set color(value: number /*uint*/) {
		this._color = value >>> 0;
	}

	public get dominantBaseline(): string {
		return this._dominantBaseline;
	}

	public set dominantBaseline(dominantBaseline: string) {
		this._dominantBaseline = axCoerceString(dominantBaseline);
	}

	public get fontDescription(): FontDescription {
		return this._fontDescription;
	}

	public set fontDescription(value: FontDescription) {
		this._fontDescription = value;
	}

	public get digitCase(): string {
		return this._digitCase;
	}

	public set digitCase(digitCaseType: string) {
		this._digitCase = axCoerceString(digitCaseType);
	}

	public get digitWidth(): string {
		return this._digitWidth;
	}

	public set digitWidth(digitWidthType: string) {
		this._digitWidth = axCoerceString(digitWidthType);
	}

	public get ligatureLevel(): string {
		return this._ligatureLevel;
	}

	public set ligatureLevel(ligatureLevelType: string) {
		this._ligatureLevel = axCoerceString(ligatureLevelType);
	}

	public get fontSize(): number {
		return this._fontSize;
	}

	public set fontSize(value: number) {
		this._fontSize = +value;
	}

	public get kerning(): string {
		return this._kerning;
	}

	public set kerning(value: string) {
		this._kerning = axCoerceString(value);
	}

	public get locale(): string {
		return this._locale;
	}

	public set locale(value: string) {
		this._locale = axCoerceString(value);
	}

	public get textRotation(): string {
		return this._textRotation;
	}

	public set textRotation(value: string) {
		this._textRotation = axCoerceString(value);
	}

	public get trackingRight(): number {
		return this._trackingRight;
	}

	public set trackingRight(value: number) {
		this._trackingRight = +value;
	}

	public get trackingLeft(): number {
		return this._trackingLeft;
	}

	public set trackingLeft(value: number) {
		this._trackingLeft = +value;
	}

	public get typographicCase(): string {
		return this._typographicCase;
	}

	public set typographicCase(typographicCaseType: string) {
		this._typographicCase = axCoerceString(typographicCaseType);
	}

	public get locked(): boolean {
		return this._locked;
	}

	public set locked(value: boolean) {
		this._locked = value;
	}

	public getFontMetrics(): FontMetrics {
		console.warn('[ElementFormat] - getFontMetrics not implemented');
		return null;
	}
}
