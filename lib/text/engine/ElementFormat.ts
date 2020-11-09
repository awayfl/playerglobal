import { ASObject, axCoerceString } from '@awayfl/avm2';
import { FontDescription } from './FontDescription';
import { FontMetrics } from './FontMetrics';

export class ElementFormat extends ASObject {

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
		fontDescription: FontDescription = null,
		fontSize: number = 12,
		color: number /*uint*/ = 0,
		alpha: number = 1,
		textRotation: string = 'auto',
		dominantBaseline: string = 'roman',
		alignmentBaseline: string = 'useDominantBaseline',
		baselineShift: number = 0, kerning: string = 'on',
		trackingRight: number = 0, trackingLeft: number = 0,
		locale: string = 'en', breakOpportunity: string = 'auto',
		digitCase: string = 'default',
		digitWidth: string = 'default',
		ligatureLevel: string = 'common',
		typographicCase: string = 'default') {
		fontSize = +fontSize;
		color = color >>> 0;
		alpha = +alpha;
		textRotation = axCoerceString(textRotation);
		dominantBaseline = axCoerceString(dominantBaseline);
		alignmentBaseline = axCoerceString(alignmentBaseline);
		baselineShift = +baselineShift;
		kerning = axCoerceString(kerning);
		trackingRight = +trackingRight;
		trackingLeft = +trackingLeft;
		locale = axCoerceString(locale);
		breakOpportunity = axCoerceString(breakOpportunity);
		digitCase = axCoerceString(digitCase);
		digitWidth = axCoerceString(digitWidth);
		ligatureLevel = axCoerceString(ligatureLevel);
		typographicCase = axCoerceString(typographicCase);
		super();
		console.warn('[ElementFormat] not implemented');
	}

	// JS -> AS Bindings

	public clone: () => ElementFormat;

	// AS -> JS Bindings

	// _alignmentBaseline: string;
	// _alpha: number;
	// _baselineShift: number;
	// _breakOpportunity: string;
	// _color: number /*uint*/;
	// _dominantBaseline: string;
	// _fontDescription: flash.text.engine.FontDescription;
	// _digitCase: string;
	// _digitWidth: string;
	// _ligatureLevel: string;
	// _fontSize: number;
	// _kerning: string;
	// _locale: string;
	// _textRotation: string;
	// _trackingRight: number;
	// _trackingLeft: number;
	// _typographicCase: string;
	// _locked: boolean;
	public get alignmentBaseline(): string {
		console.warn('[ElementFormat] - get alignmentBaseline not implemented');
		return null;
	}

	public set alignmentBaseline(alignmentBaseline: string) {
		alignmentBaseline = axCoerceString(alignmentBaseline);
		console.warn('[ElementFormat] - set alignmentBaseline not implemented');
	}

	public get alpha(): number {
		console.warn('[ElementFormat] - get alpha not implemented');
		return null;
	}

	public set alpha(value: number) {
		value = +value;
		console.warn('[ElementFormat] - set alpha not implemented');
	}

	public get baselineShift(): number {
		console.warn('[ElementFormat] - get baselineShift not implemented');
		return null;
	}

	public set baselineShift(value: number) {
		value = +value;
		console.warn('[ElementFormat] - set baselineShift not implemented');
	}

	public get breakOpportunity(): string {
		console.warn('[ElementFormat] - get breakOpportunity not implemented');
		return null;
	}

	public set breakOpportunity(opportunityType: string) {
		opportunityType = axCoerceString(opportunityType);
		console.warn('[ElementFormat] - set breakOpportunity not implemented');
	}

	public get color(): number /*uint*/ {
		console.warn('[ElementFormat] - get color not implemented');
		return null;
	}

	public set color(value: number /*uint*/) {
		value = value >>> 0;
		console.warn('[ElementFormat] - set color not implemented');
	}

	public get dominantBaseline(): string {
		console.warn('[ElementFormat] - get dominantBaseline not implemented');
		return null;
	}

	public set dominantBaseline(dominantBaseline: string) {
		dominantBaseline = axCoerceString(dominantBaseline);
		console.warn('[ElementFormat] - set dominantBaseline not implemented');
	}

	public get fontDescription(): FontDescription {
		console.warn('[ElementFormat] - get fontDescription not implemented');
		return null;
	}

	public set fontDescription(value: FontDescription) {
		console.warn('[ElementFormat] - set fontDescription not implemented');
	}

	public get digitCase(): string {
		console.warn('[ElementFormat] - get digitCase not implemented');
		return null;
	}

	public set digitCase(digitCaseType: string) {
		digitCaseType = axCoerceString(digitCaseType);
		console.warn('[ElementFormat] - set digitCase not implemented');
	}

	public get digitWidth(): string {
		console.warn('[ElementFormat] - get digitWidth not implemented');
		return null;
	}

	public set digitWidth(digitWidthType: string) {
		digitWidthType = axCoerceString(digitWidthType);
		console.warn('[ElementFormat] - set digitWidth not implemented');
	}

	public get ligatureLevel(): string {
		console.warn('[ElementFormat] - get ligatureLevel not implemented');
		return null;
	}

	public set ligatureLevel(ligatureLevelType: string) {
		ligatureLevelType = axCoerceString(ligatureLevelType);
		console.warn('[ElementFormat] - set ligatureLevel not implemented');
	}

	public get fontSize(): number {
		console.warn('[ElementFormat] - get fontSize not implemented');
		return null;
	}

	public set fontSize(value: number) {
		value = +value;
		console.warn('[ElementFormat] - set fontSize not implemented');
	}

	public get kerning(): string {
		console.warn('[ElementFormat] - get kerning not implemented');
		return null;
	}

	public set kerning(value: string) {
		value = axCoerceString(value);
		console.warn('[ElementFormat] - set kerning not implemented');
	}

	public get locale(): string {
		console.warn('[ElementFormat] - get locale not implemented');
		return null;
	}

	public set locale(value: string) {
		value = axCoerceString(value);
		console.warn('[ElementFormat] - set locale not implemented');
	}

	public get textRotation(): string {
		console.warn('[ElementFormat] - get textRotation not implemented');
		return null;
	}

	public set textRotation(value: string) {
		value = axCoerceString(value);
		console.warn('[ElementFormat] - set textRotation not implemented');
	}

	public get trackingRight(): number {
		console.warn('[ElementFormat] - get trackingRight not implemented');
		return null;
	}

	public set trackingRight(value: number) {
		value = +value;
		console.warn('[ElementFormat] - set trackingRight not implemented');
	}

	public get trackingLeft(): number {
		console.warn('[ElementFormat] - get trackingLeft not implemented');
		return null;
	}

	public set trackingLeft(value: number) {
		value = +value;
		console.warn('[ElementFormat] - set trackingLeft not implemented');
	}

	public get typographicCase(): string {
		console.warn('[ElementFormat] - get typographicCase not implemented');
		return null;
	}

	public set typographicCase(typographicCaseType: string) {
		typographicCaseType = axCoerceString(typographicCaseType);
		console.warn('[ElementFormat] - set typographicCase not implemented');
	}

	public get locked(): boolean {
		console.warn('[ElementFormat] - get locked not implemented');
		return null;
	}

	public set locked(value: boolean) {
		console.warn('[ElementFormat] - set locked not implemented');
	}

	public getFontMetrics(): FontMetrics {
		console.warn('[ElementFormat] - getFontMetrics not implemented');
		return null;
	}
}
