import { ASObject } from '@awayfl/avm2';
import { ContentElement } from './ContentElement';
import { FontDescription } from './FontDescription';
import { TextJustifier } from './TextJustifier';
import { TextLine } from './TextLine';

export class TextBlock extends ASObject {

	static forceNative: boolean = true;
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	public static initializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null;
	// ["userData", "textJustifier", "textJustifier", "tabStops", "tabStops", "createTextLine", "recreateTextLine"];

	constructor(
		content: ContentElement = null,
		tabStops: any /*ASVector<flash.text.engine.TabStop> */= null,
		textJustifier: TextJustifier = null,
		lineRotation: string = 'rotate0',
		baselineZero: string = 'roman',
		bidiLevel: number /*int*/ = 0,
		applyNonLinearFontScaling: boolean = true,
		baselineFontDescription: FontDescription = null,
		baselineFontSize: number = 12) {
		super();
		console.warn('[TextBlock] not implemented');
	}

	// JS -> AS Bindings

	public userData: any;
	public textJustifier: TextJustifier;
	// tabStops: ASVector<flash.text.engine.TabStop>;
	public createTextLine (
		previousLine?: TextLine,
		width?: number,
		lineOffset?: number,
		fitSomething?: boolean): TextLine {
		console.warn('[TextBlock] - createTextLine not implemented');
		return null;
	}

	public recreateTextLine(textLine: TextLine,
		previousLine?: TextLine,
		width?: number,
		lineOffset?: number,
		fitSomething?: boolean): TextLine {
		console.warn('[TextBlock] - recreateTextLine not implemented');
		return null;

	}

	// AS -> JS Bindings

	// _applyNonLinearFontScaling: boolean;
	// _baselineFontDescription: flash.text.engine.FontDescription;
	// _baselineFontSize: number;
	// _baselineZero: string;
	// _content: flash.text.engine.ContentElement;
	// _bidiLevel: number /*int*/;
	// _firstInvalidLine: flash.text.engine.TextLine;
	// _firstLine: flash.text.engine.TextLine;
	// _lastLine: flash.text.engine.TextLine;
	// _textJustifier: flash.text.engine.TextJustifier;
	// _textLineCreationResult: string;
	// _lineRotation: string;
	// _tabStops: ASVector<flash.text.engine.TabStop>;
	public get applyNonLinearFontScaling(): boolean {
		console.warn('[TextBlock] - get applyNonLinearFontScaling not implemented');
		return null;
	}

	public set applyNonLinearFontScaling(value: boolean) {
		console.warn('[TextBlock] - set applyNonLinearFontScaling not implemented');
	}

	public get baselineFontDescription(): FontDescription {
		console.warn('[TextBlock] - get baselineFontDescription not implemented');
		return null;
	}

	public set baselineFontDescription(value: FontDescription) {
		console.warn('[TextBlock] - set baselineFontDescription not implemented');
	}

	public get baselineFontSize(): number {
		console.warn('[TextBlock] - get baselineFontSize not implemented');
		return null;
	}

	public set baselineFontSize(value: number) {
		console.warn('[TextBlock] - set baselineFontSize not implemented');
	}

	public get baselineZero(): string {
		console.warn('[TextBlock] - get baselineZero not implemented');
		return null;
	}

	public set baselineZero(value: string) {
		console.warn('[TextBlock] - set baselineZero not implemented');
	}

	public get content(): ContentElement {
		console.warn('[TextBlock] - get content not implemented');
		return null;
	}

	public set content(value: ContentElement) {
		console.warn('[TextBlock] - set content not implemented');
	}

	public get bidiLevel(): number /*int*/ {
		console.warn('[TextBlock] - get bidiLevel not implemented');
		return null;
	}

	public set bidiLevel(value: number /*int*/) {
		console.warn('[TextBlock] - set bidiLevel not implemented');
	}

	public get firstInvalidLine(): TextLine {
		console.warn('[TextBlock] - get firstInvalidLine not implemented');
		return null;
	}

	public get firstLine(): TextLine {
		console.warn('[TextBlock] - get firstLine not implemented');
		return null;
	}

	public get lastLine(): TextLine {
		console.warn('[TextBlock] - get lastLine not implemented');
		return null;
	}

	public get textLineCreationResult(): string {
		console.warn('[TextBlock] - get textLineCreationResult not implemented');
		return null;
	}

	public get lineRotation(): string {
		console.warn('[TextBlock] - get lineRotation not implemented');
		return null;
	}

	public set lineRotation(value: string) {
		console.warn('[TextBlock] - set lineRotation not implemented');
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
		console.warn('[TextBlock] - releaseLines not implemented');
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

	getTabStops(): any/*ASVector<flash.text.engine.TabStop>*/ {
		console.warn('[TextBlock] - getTabStops not implemented');
		return null;
	}

	setTabStops(value: any/*ASVector<flash.text.engine.TabStop>*/): void {
		console.warn('[TextBlock] - setTabStops not implemented');
	}

	public getTextJustifier(): TextJustifier {
		console.warn('[TextBlock] - getTextJustifier not implemented');
		return null;
	}

	public setTextJustifier(value: TextJustifier): void {
		console.warn('[TextBlock] - setTextJustifier not implemented');
	}
}
