import { ASObject } from '@awayfl/avm2';
import { TextFormat } from '@awayjs/scene';
import { ContentElement } from './ContentElement';
import { ElementFormat } from './ElementFormat';
import { FontDescription } from './FontDescription';
import { GroupElement } from './GroupElement';
import { TextBaseline } from './TextBaseline';
import { TextJustifier } from './TextJustifier';
import { TextLine } from './TextLine';
import { TextLineCreationResult } from './TextLineCreationResult';

const enum CHAR_CODES {
	TAB = 9,
	LF = 10,
	CR = 13,
	SPACE = 32,
	BS = 92,
	N = 110,
	R = 114,
}
export interface ITextData {
	formats: TextFormat[],
	elementFormats: ElementFormat[],
	formatIndices: number[],
	text: string,
	processedIdx: number,
	creationResult: string,
	spaces: NumberMap<boolean>,
	lineBreaks: NumberMap<number>,
	charWidths: number[],
}

const noLogs = true;
let textBlockIDs = 0;
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
	private _creationResult: string;
	private _textData: ITextData;
	private _id: number;

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
		this._id = textBlockIDs++;
		noLogs || console.log('[TextBlock]  ' + this._id + '   - new textblock ',
			content, tabStops, textJustifier,
			lineRotation, baselineZero, bidiLevel, applyNonLinearFontScaling,
			baselineFontDescription, baselineFontSize);
		this._content = content;
		if (content) {
			this._content.setTextBlock(this);
		}
		this._tabStops = tabStops;
		this._textJustifier = textJustifier;
		this._lineRotation = lineRotation;
		this._baselineZero = baselineZero;
		this._bidiLevel = bidiLevel;
		this._applyNonLinearFontScaling = applyNonLinearFontScaling;
		this._baselineFontDescription = baselineFontDescription;
		this._baselineFontSize = baselineFontSize;
		this._textLines = [];
		this._creationResult = null;
	}

	public setTextDataDirty() {
		this._textData = null;
	}

	private _convertContentToTextData() {
		if (this._textData) {
			return this._textData;
		}
		this._textData = {
			text: '',
			formats: [],
			elementFormats: [],
			formatIndices: [],
			processedIdx: 0,
			creationResult: null,
			spaces: {},
			lineBreaks: {},
			charWidths: []
		};
		this.resolveGroupElements(this._content);

		if (this._textData.formatIndices[this._textData.formatIndices.length - 1] != this._textData.text.length)
			this._textData.formatIndices.push(this._textData.text.length);

		const formats = this._textData.formats;
		const formatsIndicies = this._textData.formatIndices;
		/*if (this._textData.text.charCodeAt(this._textData.text.length - 1) == 8233) {
			this._textData.text = this._textData.text.substring(0, this._textData.text.length - 1);
		}*/
		const text = this._textData.text;
		this._content.rawText = text;
		const spaces = this._textData.spaces;
		const lineBreaks = this._textData.lineBreaks;
		const charWidths = this._textData.charWidths;

		let c = 0;
		const form_len = formats.length;
		for (let f = 0; f < form_len; f++) {

			const tf = formats[f];
			tf.font_table.initFontSize(tf.size);
			const lastChar = formatsIndicies[f];
			for (c; c <= lastChar; c++) {
				const char_code = text.charCodeAt(c);
				const isLineBreak = char_code === CHAR_CODES.LF || char_code === 8233;
				if (isLineBreak) {
					lineBreaks[c] = 1;
					charWidths[charWidths.length] = 0;
				} else {
					charWidths[charWidths.length] = tf.font_table.getCharWidth(char_code.toString());
					const isSpace = char_code == CHAR_CODES.TAB || char_code == CHAR_CODES.SPACE;
					if (isSpace) {
						spaces[c] = true;
					}
				}
			}
		}
	}

	private resolveGroupElements(content: ContentElement) {

		if (content.axClassName == 'flash.text.engine.TextElement') {
			const text = content.text;
			const elementFormat = content.elementFormat;
			let tf;
			if (elementFormat)
				tf = elementFormat.createAwayTextformat();
			else {
				tf = new TextFormat();
			}
			this._textData.text += text ? text : '';
			this._textData.formats.push(tf);
			this._textData.elementFormats.push(elementFormat);
			this._textData.formatIndices.push(this._textData.text.length);
		}
		if (content.axClassName == 'flash.text.engine.GroupElement') {
			const group = <GroupElement><any>content;
			//noLogs || console.log('resolve GroupElement', group.elementCount);
			for (let i = 0; i < group.elementCount; i++) {
				this.resolveGroupElements(group.getElementAt(i));
			}
		}
	}

	public createTextLine(
		previousLine?: TextLine,
		width?: number,
		lineOffset?: number,
		fitSomething?: boolean): TextLine {

		if (!this._textData) {
			this._textLines = [];
			this._convertContentToTextData();
		}

		if (this._tabStops && this._tabStops.buffer.length > 0) {
			console.warn('this._tabStops is not []', this._tabStops);
		}
		if (this._textJustifier && this._textJustifier.lineJustification != "unjustified") {
			console.warn('lineJustification is not unjustified', this._textJustifier.lineJustification);
		}
		if (this._textJustifier && (<any> this._textJustifier).letterSpacing != 0) {
			console.warn('letterSpacing is not 0', (<any> this._textJustifier).letterSpacing);
		}
		if (this._baselineZero != TextBaseline.ROMAN) {
			console.warn('_baselineZero is not "roman"', this._baselineZero);
		}

		noLogs || console.log('[TextBlock]  ' + this._id + '   - createTextLine',
			'\n		width', width,
			'\n		previousLine', previousLine,
			'\n		lineOffset', lineOffset,
			'\n		fitSomething', fitSomething,
			'\n		processedIdx', this._textData.processedIdx);

		const text = this._textData.text;
		const processedIdx = this._textData.processedIdx;
		if (processedIdx > text.length) {
			this._creationResult = TextLineCreationResult.COMPLETE;
			noLogs || console.log('[TextBlock]  ' + this._id + '   - all textlines already complete',
				processedIdx, text.length);
			return null;
		}
		const formats = this._textData.formats;
		const elementFormats = this._textData.elementFormats;
		const formatsIndicies = this._textData.formatIndices;
		const spaces = this._textData.spaces;
		const lineBreaks = this._textData.lineBreaks;
		const charWidths = this._textData.charWidths;

		const form_len = formats.length;
		let c = processedIdx;
		let newText = '';
		let newWord = '';
		let newCharCnt = 0;
		const newFormats = [];
		const newElementFormats = [];
		const newFormatindices = [];
		let result = TextLineCreationResult.EMERGENCY; // is valid if its a linebreak or at least one word that fits
		let textWidth = 2;
		let defaultFormat;
		let defaultElementFormat;
		loop1:
		for (let f = 0; f < form_len; f++) {
			if (processedIdx > formatsIndicies[f]) {
				continue;
			}
			const format = formats[f];
			defaultFormat = format;
			newFormats[newFormats.length] = format;
			newElementFormats[newElementFormats.length] = elementFormats[f];
			defaultElementFormat =  elementFormats[f];
			newFormatindices[newFormatindices.length] = 0;
			const lastChar = formatsIndicies[f];
			for (c; c <= lastChar; c++) {
				if (lineBreaks[c] === 1) {
					noLogs || console.log('lineBreaks', result, c, text[c]);
					newText += newWord;
					newCharCnt += newWord.length + 1;
					result = TextLineCreationResult.SUCCESS;
					this._textData.processedIdx = c;
					// remove the linebreak marker so we not stuck in infinite loop
					lineBreaks[c] = 2;
					break loop1;
				}
				if (spaces[c]) {
					noLogs || console.log('space', result, c, text[c], newWord);
					result = TextLineCreationResult.SUCCESS;
					newText += newWord;
					newCharCnt += newWord.length;
					newWord = '';
					this._textData.processedIdx = c;
				}
				if (newWord.length == 1 &&
					(newWord.charCodeAt(0) == CHAR_CODES.SPACE || newWord.charCodeAt(0) == CHAR_CODES.TAB)) {
					result = TextLineCreationResult.SUCCESS;
					newText += newWord;
					newCharCnt += newWord.length;
					newWord = '';
					this._textData.processedIdx = c;
				}
				textWidth += charWidths[c];
				if (textWidth > width) {
					noLogs || console.log('text is to wide', 'textWidth', textWidth,
						'width', width, newText, result, text[c], newWord);
					if (result == TextLineCreationResult.SUCCESS) {
						break loop1;
					}
					newText += newWord;
					newCharCnt += newWord.length;
					this._textData.processedIdx = c;
					break loop1;

				}
				if (c == text.length) {
					newText += newWord;
					newCharCnt += newWord.length;
					this._textData.processedIdx = c + 1;
					break loop1;
				}
				if (!lineBreaks[c])
					newWord += text[c];
			}
			newFormatindices[newFormatindices.length - 1] = newText.length + newWord.length - 1;
		}
		newFormatindices[newFormatindices.length - 1] = newText.length;
		if (this._textData.processedIdx >= text.length) {
			noLogs || console.log('[TextBlock]  ' + this._id + '   - all text processed',
				this._textData.processedIdx, text.length);
			this._textData.processedIdx++;
			result = TextLineCreationResult.COMPLETE;
		}

		noLogs || console.log('[TextBlock]  ' + this._id + '   - textline prepared',
			this._textData.processedIdx, `"${newText}"`);
		noLogs || console.log('[TextBlock]  ' + this._id + '   - all text length',
			text.length, 'textline text length', processedIdx + newCharCnt);

		//this._textData.processedIdx = text.length + 1;

		if (newFormats.length == 0) {
			newFormats[0] = defaultFormat;
			newElementFormats[0] = defaultElementFormat;
		}
		const newTextLine: TextLine = new (<any> this.sec).flash.text.engine.TextLine(
			previousLine,
			width,
			lineOffset,
			fitSomething,
			newText, newFormats, newFormatindices,
			processedIdx, newCharCnt, newElementFormats);

		this._creationResult = result;
		newTextLine.setTextBlock(this);
		this._textLines.push(newTextLine);
		return newTextLine;
	}

	public recreateTextLine(textLine: TextLine,
		previousLine?: TextLine,
		width?: number,
		lineOffset?: number,
		fitSomething?: boolean): TextLine {
		console.warn('[TextBlock]  ' + this._id + '   - recreateTextLine not implemented');
		return new (<any> this.sec).flash.text.engine.TextLine();
	}

	public get textLineCreationResult(): string {
		noLogs || console.log('[TextBlock]  ' + this._id + '   - textLineCreationResult', this._creationResult);
		return this._creationResult;
	}

	public get applyNonLinearFontScaling(): boolean {
		console.warn('[TextBlock]  ' + this._id + '   - get applyNonLinearFontScaling not implemented');
		return this._applyNonLinearFontScaling;
	}

	public set applyNonLinearFontScaling(value: boolean) {
		console.warn('[TextBlock]  ' + this._id + '   - set applyNonLinearFontScaling not implemented');
		this._applyNonLinearFontScaling = value;
	}

	public get baselineFontDescription(): FontDescription {
		console.warn('[TextBlock]  ' + this._id + '   - get baselineFontDescription not implemented');
		return this._baselineFontDescription;
	}

	public set baselineFontDescription(value: FontDescription) {
		console.warn('[TextBlock]  ' + this._id + '   - set baselineFontDescription not implemented');
		this._baselineFontDescription = value;
	}

	public get baselineFontSize(): number {
		console.warn('[TextBlock]  ' + this._id + '   - get baselineFontSize not implemented');
		return this._baselineFontSize;
	}

	public set baselineFontSize(value: number) {
		console.warn('[TextBlock]  ' + this._id + '   - set baselineFontSize not implemented');
		this._baselineFontSize = value;
	}

	public get baselineZero(): string {
		noLogs || console.log('[TextBlock]  ' + this._id + '   - get baselineZero', this._baselineZero);
		return this._baselineZero;
	}

	public set baselineZero(value: string) {
		noLogs || console.log('[TextBlock]  ' + this._id + '   - set baselineZero', value);
		this._baselineZero = value;
	}

	public get content(): ContentElement {
		//console.warn('[TextBlock]  ' + this._id + '   - get content not implemented');
		noLogs || console.log('[TextBlock]  ' + this._id + '   - get content', this._content);
		return this._content;
	}

	public set content(value: ContentElement) {
		//console.warn('[TextBlock]  ' + this._id + '   - set content not implemented');
		noLogs || console.log('[TextBlock]  ' + this._id + '   - set content', value);
		this._textData = null;
		if (this._content)
			this._content.setTextBlock(null);
		this._content = value;
		if (this._content)
			this._content.setTextBlock(this);
	}

	public get bidiLevel(): number /*int*/ {
		//console.warn('[TextBlock]  ' + this._id + '   - get bidiLevel not implemented');
		return this._bidiLevel;
	}

	public set bidiLevel(value: number /*int*/) {
		//console.warn('[TextBlock]  ' + this._id + '   - set bidiLevel not implemented');
		this._bidiLevel = value;
	}

	public get firstInvalidLine(): TextLine {
		console.warn('[TextBlock]  ' + this._id + '   - get firstInvalidLine not implemented');
		return null;
	}

	public get firstLine(): TextLine {
		noLogs || console.log('[TextBlock]  ' + this._id + '   - get firstLine',
			this._textLines.length > 0 ? this._textLines[0] : null);
		return this._textLines.length > 0 ? this._textLines[0] : null;
	}

	public get lastLine(): TextLine {
		noLogs || console.log('[TextBlock]  ' + this._id + '   - get lastLine',
			this._textLines.length > 0 ? this._textLines[this._textLines.length - 1] : null);
		return this._textLines.length > 0 ? this._textLines[this._textLines.length - 1] : null;
	}

	public get lineRotation(): string {
		return this._lineRotation;
	}

	public set lineRotation(value: string) {
		this._lineRotation = value;
	}

	public findNextAtomBoundary(afterCharIndex: number /*int*/): number /*int*/ {
		console.warn('[TextBlock]  ' + this._id + '   - findNextAtomBoundary not implemented');
		return null;
	}

	public findPreviousAtomBoundary(beforeCharIndex: number /*int*/): number /*int*/ {
		console.warn('[TextBlock]  ' + this._id + '   - findPreviousAtomBoundary not implemented');
		return null;
	}

	public findNextWordBoundary(afterCharIndex: number /*int*/): number /*int*/ {
		console.warn('[TextBlock]  ' + this._id + '   - findNextWordBoundary not implemented');
		return null;
	}

	public findPreviousWordBoundary(beforeCharIndex: number /*int*/): number /*int*/ {
		console.warn('[TextBlock]  ' + this._id + '   - findPreviousWordBoundary not implemented');
		return null;
	}

	public getTextLineAtCharIndex(charIndex: number /*int*/): TextLine {
		console.warn('[TextBlock]  ' + this._id + '   - getTextLineAtCharIndex not implemented');
		return null;
	}

	public releaseLineCreationData(): void {
		console.warn('[TextBlock]  ' + this._id + '   - releaseLineCreationData not implemented');
	}

	public releaseLines(firstLine: TextLine, lastLine: TextLine): void {
		//console.warn('[TextBlock]  ' + this._id + '   - releaseLines not implemented');
		this._textLines.length = 0;
	}

	public dump(): string {
		console.warn('[TextBlock]  ' + this._id + '   - dump not implemented');
		return null;
	}

	public DoCreateTextLine(
		previousLine: TextLine,
		width: number,
		lineOffset: number = 0,
		fitSomething: boolean = false,
		reuseLine: TextLine = null): TextLine {
		console.warn('[TextBlock]  ' + this._id + '   - DoCreateTextLine not implemented');
		return null;
	}

	public getTabStops(): any/*ASVector<flash.text.engine.TabStop>*/ {
		noLogs || console.log('[TextBlock]  ' + this._id + '   - getTabStops', this._tabStops);
		return this._tabStops;
	}

	public setTabStops(value: any/*ASVector<flash.text.engine.TabStop>*/) {
		noLogs || console.log('[TextBlock]  ' + this._id + '   - setTabStops not implemented', value);
		this._tabStops = value;
	}

	public getTextJustifier(): TextJustifier {
		noLogs || console.log('[TextBlock]  ' + this._id + '   - getTextJustifier', this._textJustifier);
		return this._textJustifier;
	}

	public setTextJustifier(value: TextJustifier) {
		noLogs || console.log('[TextBlock]  ' + this._id + '   - setTextJustifier', value);
		this._textJustifier = value;
	}

	public get userData(): any {
		noLogs || console.log('[TextBlock]  ' + this._id + '   - get userData', this._userData);
		return this._userData;
	}

	public set userData(value: any) {
		noLogs || console.log('[TextBlock]  ' + this._id + '   - set userData', value);
		this._userData = value;
	}
}
