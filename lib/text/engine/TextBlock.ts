import { ASObject } from '@awayfl/avm2';
import { ContentElement } from './ContentElement';
import { FontDescription } from './FontDescription';
import { TextJustifier } from './TextJustifier';
import { TextLine } from './TextLine';

export class TextBlock extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	private _content: ContentElement;
	private _tabStops: any /*ASVector<TabStop>*/;
	private _textJustifier: TextJustifier;
	private _lineRotation: string;
	private _baselineZero: string;
	private _bidiLevel: number;
	private _applyNonLinearFontScaling: boolean;
	private _baselineFontDescription: FontDescription;
	private _baselineFontSize: number;
	private _userData: any;
	private _textLines: TextLine[];

	constructor(
		content: ContentElement = null,
		tabStops: any /*ASVector<TabStop>*/ = null,
		textJustifier: TextJustifier = null,
		lineRotation: string = 'rotate0',
		baselineZero: string = 'roman',
		bidiLevel: number /*int*/ = 0,
		applyNonLinearFontScaling: boolean = true,
		baselineFontDescription: FontDescription = null,
		baselineFontSize: number = 12) {
		super();
		this._content = content;
		this._tabStops = tabStops;
		this._textJustifier = textJustifier;
		this._lineRotation = lineRotation;
		this._baselineZero = baselineZero;
		this._bidiLevel = bidiLevel;
		this._applyNonLinearFontScaling = applyNonLinearFontScaling;
		this._baselineFontDescription = baselineFontDescription;
		this._baselineFontSize = baselineFontSize;
		this._textLines = [];
	}

	public createTextLine (
		previousLine?: TextLine,
		width?: number,
		lineOffset?: number,
		fitSomething?: boolean): TextLine {
		//console.warn('[TextBlock] - createTextLine not implemented', this._content, this._textJustifier);
		const newTextLine: TextLine = new (<any> this.sec).flash.text.engine.TextLine(
			previousLine,
			width,
			lineOffset,
			fitSomething,
			this._content);
		newTextLine.setTextBlock(this);
		this._textLines.push(newTextLine);
		return newTextLine;
	}

	public recreateTextLine(textLine: TextLine,
		previousLine?: TextLine,
		width?: number,
		lineOffset?: number,
		fitSomething?: boolean): TextLine {
		console.warn('[TextBlock] - recreateTextLine not implemented');
		return new (<any> this.sec).flash.text.engine.TextLine();
	}

	public get applyNonLinearFontScaling(): boolean {
		//console.warn('[TextBlock] - get applyNonLinearFontScaling not implemented');
		return this._applyNonLinearFontScaling;
	}

	public set applyNonLinearFontScaling(value: boolean) {
		//console.warn('[TextBlock] - set applyNonLinearFontScaling not implemented');
		this._applyNonLinearFontScaling = value;
	}

	public get baselineFontDescription(): FontDescription {
		//console.warn('[TextBlock] - get baselineFontDescription not implemented');
		return this._baselineFontDescription;
	}

	public set baselineFontDescription(value: FontDescription) {
		//console.warn('[TextBlock] - set baselineFontDescription not implemented');
		this._baselineFontDescription = value;
	}

	public get baselineFontSize(): number {
		//console.warn('[TextBlock] - get baselineFontSize not implemented');
		return this._baselineFontSize;
	}

	public set baselineFontSize(value: number) {
		//console.warn('[TextBlock] - set baselineFontSize not implemented');
		this._baselineFontSize = value;
	}

	public get baselineZero(): string {
		//console.warn('[TextBlock] - get baselineZero not implemented');
		return this._baselineZero;
	}

	public set baselineZero(value: string) {
		//console.warn('[TextBlock] - set baselineZero not implemented');
		this._baselineZero = value;
	}

	public get content(): ContentElement {
		//console.warn('[TextBlock] - get content not implemented');
		return this._content;
	}

	public set content(value: ContentElement) {
		//console.warn('[TextBlock] - set content not implemented');
		this._content = value;
	}

	public get bidiLevel(): number /*int*/ {
		//console.warn('[TextBlock] - get bidiLevel not implemented');
		return this._bidiLevel;
	}

	public set bidiLevel(value: number /*int*/) {
		//console.warn('[TextBlock] - set bidiLevel not implemented');
		this._bidiLevel = value;
	}

	public get firstInvalidLine(): TextLine {
		//console.warn('[TextBlock] - get firstInvalidLine not implemented');
		return null;
	}

	public get firstLine(): TextLine {
		//console.warn('[TextBlock] - get firstLine not implemented');
		return null;//this._textLines.length > 0 ? this._textLines[0] : null;
	}

	public get lastLine(): TextLine {
		//console.warn('[TextBlock] - get lastLine not implemented');
		return null;//this._textLines.length > 0 ? this._textLines[this._textLines.length - 1] : null;
	}

	public get textLineCreationResult(): string {
		console.warn('[TextBlock] - get textLineCreationResult not implemented');
		return null;
	}

	public get lineRotation(): string {
		return this._lineRotation;
	}

	public set lineRotation(value: string) {
		this._lineRotation = value;
	}

	public findNextAtomBoundary(afterCharIndex: number /*int*/): number /*int*/ {
		console.warn('[TextBlock] - findNextAtomBoundary not implemented');
		return null;
	}

	public findPreviousAtomBoundary(beforeCharIndex: number /*int*/): number /*int*/ {
		console.warn('[TextBlock] - findPreviousAtomBoundary not implemented');
		return null;
	}

	public findNextWordBoundary(afterCharIndex: number /*int*/): number /*int*/ {
		console.warn('[TextBlock] - findNextWordBoundary not implemented');
		return null;
	}

	public findPreviousWordBoundary(beforeCharIndex: number /*int*/): number /*int*/ {
		console.warn('[TextBlock] - findPreviousWordBoundary not implemented');
		return null;
	}

	public getTextLineAtCharIndex(charIndex: number /*int*/): TextLine {
		console.warn('[TextBlock] - getTextLineAtCharIndex not implemented');
		return null;
	}

	public releaseLineCreationData(): void {
		console.warn('[TextBlock] - releaseLineCreationData not implemented');
	}

	public releaseLines(firstLine: TextLine, lastLine: TextLine): void {
		//console.warn('[TextBlock] - releaseLines not implemented');
		this._textLines.length = 0;
	}

	public dump(): string {
		console.warn('[TextBlock] - dump not implemented');
		return null;
	}

	public DoCreateTextLine(
		previousLine: TextLine,
		width: number,
		lineOffset: number = 0,
		fitSomething: boolean = false,
		reuseLine: TextLine = null): TextLine {
		console.warn('[TextBlock] - DoCreateTextLine not implemented');
		return null;
	}

	public getTabStops(): any/*ASVector<flash.text.engine.TabStop>*/ {
		return this._tabStops;
	}

	public setTabStops(value: any/*ASVector<flash.text.engine.TabStop>*/) {
		this._tabStops = value;
	}

	public getTextJustifier(): TextJustifier {
		return this._textJustifier;
	}

	public setTextJustifier(value: TextJustifier) {
		this._textJustifier = value;
	}

	public get userData(): TextJustifier {
		return this._userData;
	}

	public set userData(value: TextJustifier) {
		this._userData = value;
	}
}
