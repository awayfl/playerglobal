import { ASObject, axCoerceString } from '@awayfl/avm2';
import { FontDescription } from './FontDescription';
import { FontMetrics } from './FontMetrics';
import { TextFormat, TextFormatAlign } from '@awayjs/scene';
import { FontLookUpMode } from '@awayjs/scene';
import { TextBaseline } from './TextBaseline';
import { Debug } from '@awayjs/core';

const noLogs = true;
let elementFormatIDs = 0;
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
	private _id: number;

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

		this._id = elementFormatIDs++;
		noLogs || console.log('[ElementFormat] ' + this._id + ' constructor',
			'fontDescription', fontDescription,
			'fontSize', fontSize,
			'color', color,
			'alpha', alpha,
			'textRotation', textRotation,
			'dominantBaseline', dominantBaseline,
			'alignmentBaseline', alignmentBaseline,
			'baselineShift', baselineShift,
			'kerning', kerning,
			'trackingRight', trackingRight,
			'trackingLeft', trackingLeft,
			'locale', locale,
			'breakOpportunity', breakOpportunity,
			'digitCase', digitCase,
			'digitWidth', digitWidth,
			'ligatureLevel', ligatureLevel,
			'typographicCase', typographicCase,
		);
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

	public createAwayTextformat(): TextFormat {
		const awayTextFormat = new TextFormat();
		awayTextFormat.size = this._fontSize;
		awayTextFormat.color = this._color;
		awayTextFormat.fontLookUpMode = <FontLookUpMode>(this._fontDescription ?
			this._fontDescription.fontLookup : FontLookUpMode.DEVICE);
		awayTextFormat.font_name = this._fontDescription?.fontName;
		awayTextFormat.italic = this._fontDescription?.fontPosture == 'italic';
		awayTextFormat.bold = this._fontDescription?.fontWeight == 'bold';
		awayTextFormat.align = TextFormatAlign.LEFT;

		if (this._baselineShift != 0) {
			console.warn('baselineshift is not 0', this._baselineShift);
		}
		if (this._alignmentBaseline != TextBaseline.USE_DOMINANT_BASELINE) {
			console.warn('_alignmentBaseline is not USE_DOMINANT_BASELINE', this._alignmentBaseline);
		}
		if (this._dominantBaseline != TextBaseline.ROMAN) {
			console.warn('_dominantBaseline is not ROMAN', this._dominantBaseline);
		}
		if (this._trackingRight != 0) {
			console.warn('_trackingRight is not 0', this._trackingRight);
		}
		if (this._trackingLeft != 0) {
			console.warn('_trackingLeft is not 0', this._trackingLeft);
		}
		if (this._alpha != 1) {
			console.warn('_alpha is not 1', this._alpha);
		}
		if (this._digitCase != 'default') {
			console.warn('_digitCase is not "default"', this._digitCase);
		}
		if (this._digitWidth != 'default') {
			console.warn('_digitWidth is not "default"', this._digitWidth);
		}
		if (this._typographicCase != 'default') {
			console.warn('_typographicCase is not "default"', this._typographicCase);
		}
		if (this._ligatureLevel != 'common') {
			console.warn('_ligatureLevel is not "common"', this._ligatureLevel);
		}

		noLogs || console.log('[ElementFormat] ' + this._id + ' createAwayTextformat', awayTextFormat.id,
			'fontDescription', this._fontDescription,
			'fontSize', this._fontSize,
			'color', this._color,
			'alpha', this._alpha,
			'textRotation', this._textRotation,
			'dominantBaseline', this._dominantBaseline,
			'alignmentBaseline', this._alignmentBaseline,
			'baselineShift', this._baselineShift,
			'kerning', this._kerning,
			'trackingRight', this._trackingRight,
			'trackingLeft', this._trackingLeft,
			'locale', this._locale,
			'breakOpportunity', this._breakOpportunity,
			'digitCase', this._digitCase,
			'digitWidth', this._digitWidth,
			'ligatureLevel', this._ligatureLevel,
			'typographicCase', this._typographicCase,
		);

		return awayTextFormat;
	}
	// JS -> AS Bindings

	public clone: () => ElementFormat;

	// AS -> JS Bindings

	public getBaseline(): string {
		if (this._alignmentBaseline == TextBaseline.USE_DOMINANT_BASELINE) {
			return this._dominantBaseline;
		}
		return this._alignmentBaseline;
	}

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
		// @todo
		Debug.throwPIR('playerglobals/text/engine/ElementFormat', 'set getFontMetrics', '');
		return null;
	}
}
