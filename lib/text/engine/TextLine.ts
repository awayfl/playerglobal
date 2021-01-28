import { ASObject } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';
import {
	TextField, DisplayObjectContainer as AwayDisplayObjectContainer,
	TextFieldAutoSize, TextFormat
} from '@awayjs/scene';
import { DisplayObject } from '../../display/DisplayObject';
import { DisplayObjectContainer } from '../../display/DisplayObjectContainer';
import { EventDispatcher } from '../../events/EventDispatcher';
import { Rectangle } from '../../geom/Rectangle';
import { ContextMenu } from '../../ui/ContextMenu';
import { ContentElement } from './ContentElement';
import { ElementFormat } from './ElementFormat';
import { TextBaseline } from './TextBaseline';
import { TextBlock } from './TextBlock';
import { TextLineMirrorRegion } from './TextLineMirrorRegion';
import { TextLineValidity } from './TextLineValidity';

const noLogs = true;

export class TextLine extends DisplayObjectContainer {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	private _text: string;
	private _focusRect: ASObject;
	private _tabChildren: boolean;
	private _tabEnabled: boolean;
	private _tabIndex: number /*int*/;
	private _contextMenu: ContextMenu;
	private _textBlock: TextBlock;
	private _hasGraphicElement: boolean;
	private _hasTabs: boolean;
	private _nextLine: TextLine;
	private _previousLine: TextLine;
	private _ascent: number;
	private _descent: number;
	private _textHeight: number;
	private _textWidth: number;
	private _totalAscent: number;
	private _totalDescent: number;
	private _totalHeight: number;
	private _textBlockBeginIndex: number /*int*/;
	private _rawText: string /*int*/;
	private _textFormatsIndices: number[] /*int*/;
	private _specifiedWidth: number;
	private _unjustifiedTextWidth: number;
	private _validity: string;
	private _mirrorRegions: any /*ASVector<flash.text.engine.TextLineMirrorRegion>*/;

	private _textFormats: TextFormat[];

	private _width: number;
	private _lineOffset: number;
	private _fitSomething: boolean;
	private _content: ContentElement;
	private _textLength: number;
	private _textfield: TextField;

	constructor(
		previousLine: TextLine,
		width: number,
		lineOffset: number,
		fitSomething: boolean,
		text: string,
		formats: TextFormat[],
		formatsIndices: number[],
		textBlockBeginIndex: number,
		textLength: number,
		elementsFormats: ElementFormat[]) {
		super();
		const adaptee: AwayDisplayObjectContainer = new AwayDisplayObjectContainer();
		this.adaptee = adaptee;
		this._previousLine = previousLine;
		if (previousLine) {
			previousLine.setNextLine(this);
		}
		this._width = width;
		this._textWidth = 0;
		this._textHeight = 0;
		this._lineOffset = lineOffset;
		this._fitSomething = fitSomething;
		this._rawText = text ? text : '';
		this._textFormatsIndices = formatsIndices;
		this._textFormats = formats;
		this._textLength = textLength;
		this._textBlockBeginIndex = textBlockBeginIndex;
		this._specifiedWidth = this._width;

		this._textfield = new TextField();
		this.initTextline(elementsFormats);

		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' textfield:', this._textfield,
			'\n		previousLine', previousLine,
			'\n		width', width,
			'\n		lineOffset', lineOffset,
			'\n		fitSomething', fitSomething,
			'\n		text', text,
			'\n		formats', formats,
			'\n		formatsIndices', formatsIndices,
			'\n		textBlockBeginIndex', textBlockBeginIndex,
			'\n		textLength', textLength,
			'\n		_ascent', this._ascent,
			'\n		_descent', this._descent,
			'\n		newTextField.textWidth', this._textfield.textWidth);
	}

	public initTextline(elementsFormats: ElementFormat[]) {
		this._ascent = 0;
		this._descent = Number.POSITIVE_INFINITY;
		this._textfield.multiline = false;
		this._textfield.border = false;
		this._textfield.wordWrap = false;
		const defaultFormat = this._textFormats[0];
		const defaultElementFormat = elementsFormats[0];
		const lastAlignmentBaseline = defaultElementFormat.getBaseline();
		(<AwayDisplayObjectContainer> this.adaptee).addChild(this._textfield);
		if (this._rawText !== '') {

			this._textfield.autoSize = TextFieldAutoSize.LEFT;

			this._textfield.text = this._rawText;
			let startIdx = 0;
			for (let i = 0; i < this._textFormatsIndices.length; i++) {
				const textFormat = this._textFormats[i];
				const elementFormat = elementsFormats[i];
				if (lastAlignmentBaseline != elementFormat.getBaseline()) {
					console.warn('[TextLine] - one Textline with different alignmentBaseline');
				}
				const endIdx = this._textFormatsIndices[i];
				let ascent = (<any> textFormat).font_table.ascent;
				let descent = (<any> textFormat).font_table.descent;
				const em_size = (<any> textFormat).font_table.get_font_em_size();
				ascent = (ascent / em_size) * textFormat.size;
				descent = (descent / em_size) * textFormat.size;
				/*console.log("em_size", em_size);
				console.log("ascent", ascent);
				console.log("descent", descent);
				console.log("both", ascent + descent);*/

				if (this._ascent < ascent) {
					this._ascent = ascent;
				}
				if (this._descent > descent) {
					this._descent = descent;
				}
				!this._textfield || this._textfield.setTextFormat(textFormat, startIdx, endIdx);
				startIdx = endIdx;
				this._textfield.height = this._ascent - this._descent;
			}
		} else {
			this._ascent = (<any> defaultFormat).font_table.ascent;
			this._descent = (<any> defaultFormat).font_table.descent;
			const em_size = (<any> defaultFormat).font_table.get_font_em_size();
			this._ascent = (this._ascent / em_size) * defaultFormat.size;
			this._descent = (this._descent / em_size) * defaultFormat.size;
			this._textfield.width = 10;
			this._textfield.height = this._ascent - this._descent;
		}
		this._textWidth = this._textfield ? this._textfield.textWidth + 4 : 10;
		this._unjustifiedTextWidth = this._textWidth;
		noLogs || console.log('[TextLine]', this._rawText.length, lastAlignmentBaseline, this._ascent, this._descent);
		this._descent = Math.abs(this._descent);

		this._ascent += 1;
		if (lastAlignmentBaseline == TextBaseline.ROMAN) {
			this._textfield.y = -(this._ascent);// - this._descent);
		} else if (lastAlignmentBaseline == TextBaseline.ASCENT) {
			this._textfield.y = -(this._ascent - this._descent) - this._ascent - this._descent;
		} else {
			console.warn('[TextLine] - unsupported alignmentBaseline', lastAlignmentBaseline);
			this._textfield.y = -(this._ascent - this._descent) - this._ascent;
		}
		this._textfield.x = 0;
		this._ascent = this._ascent - this._descent;

		//this._forceWidth = this._ascent + this._descent;
		//this._forceHeight = this._ascent - this._descent;
		//this._forceHeight = 200;//Math.ceil(this._forceHeight * 20) / 20;
		/*if (lineOffset == 0 && previousLine && previousLine._lineOffset) {
			lineOffset = previousLine._lineOffset;
		}*/

		noLogs || console.log('[TextLine] ' + this.adaptee.id, '_rawText', this._rawText);

		this._validity = TextLineValidity.VALID;
	}

	public static MAX_LINE_WIDTH: number /*int*/ = 1000000;

	public reUseTextLine(
		previousLine: TextLine,
		width: number,
		lineOffset: number,
		fitSomething: boolean,
		text: string,
		formats: TextFormat[],
		formatsIndices: number[],
		textBlockBeginIndex: number,
		textLength: number,
		elementsFormats: ElementFormat[]) {

		this._previousLine = previousLine;
		this._width = width;
		this._textWidth = 0;
		this._textHeight = 0;
		this._lineOffset = lineOffset;
		this._fitSomething = fitSomething;
		this._rawText = text ? text : '';
		this._textFormatsIndices = formatsIndices;
		this._textFormats = formats;
		this._textLength = textLength;
		this._textBlockBeginIndex = textBlockBeginIndex;
		this._specifiedWidth = this._width;

		this._textfield.reset();
		this._textfield.text = '';
		this.initTextline(elementsFormats);
	}

	public getBaselinePosition(baseline: string): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - getBaselinePosition', baseline);
		switch (baseline) {
			case TextBaseline.ROMAN:
				// does not seem to matter what we return here
				// for each TLF it checks 2 times for this value,
				// and than 1 time for the ASCENT value
				return -(this._ascent + this._descent);
			case TextBaseline.ASCENT:
				return -(this._ascent);// + this._descent);
		}
		return 0;
	}

	public setNextLine(value: TextLine) {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - setNextLine',  value);
		this._nextLine = value;
	}

	public setTextBlock(value: TextBlock) {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - setTextBlock',  value);
		this._textBlock = value;
	}

	public userData: any;
	public getMirrorRegion(mirror: EventDispatcher): TextLineMirrorRegion {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - getMirrorRegion',  mirror);
		return null;
	}

	public flushAtomData(): void {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - flushAtomData');
	}

	public get textBlock(): TextBlock {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get textBlock',  this._textBlock);
		return this._textBlock;
	}

	public get hasGraphicElement(): boolean {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get hasGraphicElement');
		return false;//this._hasGraphicElement;
	}

	public get hasTabs(): boolean {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get hasTabs',  this._hasTabs);
		return false;//this._hasTabs;
	}

	public get nextLine(): TextLine {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get nextLine',  this._nextLine);
		return this._nextLine;
	}

	public get previousLine(): TextLine {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get previousLine',  this._previousLine);
		return this._previousLine;
	}

	public get ascent(): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get ascent',  this._ascent);
		return 0;//this._ascent;
	}

	public get descent(): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get descent',  this._descent);
		return 0;//0.1 * this._descent;
	}

	public get textHeight(): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get textHeight',  this._ascent + this._descent);
		return this._ascent + this._descent;
	}

	public get textWidth(): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get textWidth',  this._textWidth);
		return this._textWidth;
	}

	public get totalAscent(): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get totalAscent',  this._ascent);
		return this._ascent;
	}

	public get totalDescent(): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get totalDescent',  this._descent);
		return this._descent;
	}

	public get totalHeight(): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get totalHeight',  this._ascent + this._descent);
		return this._ascent + this._descent;
	}

	public get textBlockBeginIndex(): number /*int*/ {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get textBlockBeginIndex',
			this._textBlockBeginIndex);
		return this._textBlockBeginIndex;
	}

	public get rawTextLength(): number /*int*/ {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get rawTextLength',  this._textLength);
		return this._textLength;
	}

	public get specifiedWidth(): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get specifiedWidth',  this._specifiedWidth);
		return this._specifiedWidth;
	}

	public get unjustifiedTextWidth(): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get unjustifiedTextWidth',
			this._unjustifiedTextWidth);
		return this._unjustifiedTextWidth;
	}

	public get validity(): string {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get validity',  this._validity);
		return this._validity;
	}

	public set validity(value: string) {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - set validity',  value);
		this._validity = value;
	}

	public get atomCount(): number /*int*/ {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get atomCount',  this._textLength);
		return this._textLength;
	}

	public get mirrorRegions(): any/*ASVector<TextLineMirrorRegion >*/ {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get mirrorRegions',  this._mirrorRegions);
		return this._mirrorRegions;
	}

	public getAtomIndexAtPoint(stageX: number, stageY: number): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLine', 'getAtomIndexAtPoint', '');
		return null;
	}

	public getAtomIndexAtCharIndex(charIndex: number /*int*/): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLine', 'getAtomIndexAtCharIndex', '');
		return charIndex;
	}

	public getAtomBounds(atomIndex: number /*int*/): Rectangle {
		const bounds = this._textfield.getCharBoundaries(atomIndex);
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - getAtomBounds',
			'atomIndex', atomIndex, 'bounds', bounds);
		return (<any> this.sec).flash.geom.Rectangle(bounds.x, bounds.y, bounds.width, this._ascent + this.descent);
	}

	public getAtomBidiLevel(atomIndex: number /*int*/): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLine', 'getAtomBidiLevel', '');
		return null;
	}

	public getAtomTextRotation(atomIndex: number /*int*/): string {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLine', 'getAtomTextRotation', '');
		return null;
	}

	public getAtomTextBlockBeginIndex(atomIndex: number /*int*/): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLine', 'getAtomTextBlockBeginIndex', '');
		return null;
	}

	public getAtomTextBlockEndIndex(atomIndex: number /*int*/): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLine', 'getAtomTextBlockEndIndex', '');
		return null;
	}

	public getAtomCenter(atomIndex: number /*int*/): number {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLine', 'getAtomCenter', '');
		return null;
	}

	public getAtomWordBoundaryOnLeft(atomIndex: number /*int*/): boolean {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLine', 'getAtomWordBoundaryOnLeft', '');
		return null;
	}

	public getAtomGraphic(atomIndex: number /*int*/): DisplayObject {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLine', 'getAtomGraphic', '');
		return null;
	}

	public dump(): string {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLine', 'dump', '');
		return null;
	}
}
