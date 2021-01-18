import { ASObject } from '@awayfl/avm2';
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
		defaultFormat: TextFormat) {
		super();
		const adaptee: AwayDisplayObjectContainer = new AwayDisplayObjectContainer();
		this.adaptee = adaptee;
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
		//noLogs || console.log('create TextLine', this._width, this._lineOffset, this._fitSomething, content);
		this._textBlockBeginIndex = textBlockBeginIndex;
		this._specifiedWidth = this._width;

		this._ascent = 0;
		this._descent = Number.POSITIVE_INFINITY;
		const newTextField = new TextField();
		newTextField.multiline = false;
		newTextField.border = true;
		newTextField.wordWrap = false;
		(<AwayDisplayObjectContainer> this.adaptee).addChild(newTextField);
		if (this._rawText !== '') {

			newTextField.autoSize = TextFieldAutoSize.LEFT;

			newTextField.text = this._rawText;
			let startIdx = 0;
			for (let i = 0; i < this._textFormatsIndices.length; i++) {
				const textFormat = this._textFormats[i];
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
				!newTextField || newTextField.setTextFormat(textFormat, startIdx, endIdx);
				startIdx = endIdx;
				newTextField.height = this._ascent - this._descent;
			}
		} else {
			this._ascent = (<any> defaultFormat).font_table.ascent;
			this._descent = (<any> defaultFormat).font_table.descent;
			const em_size = (<any> defaultFormat).font_table.get_font_em_size();
			this._ascent = (this._ascent / em_size) * defaultFormat.size;
			this._descent = (this._descent / em_size) * defaultFormat.size;
			newTextField.width = 1;
			newTextField.height = this._ascent - this._descent;
		}
		this._textWidth = newTextField ? newTextField.textWidth : 1;
		this._unjustifiedTextWidth = this._textWidth;

		//console.log("[TextLine]", lineOffset, text);
		//newTextField.y = this._ascent - this._ascent * lineOffset;
		this._descent = Math.abs(this._descent);
		this._ascent = this._ascent - this._descent;

		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - constructor', 'tf', newTextField,
			'previousLine', previousLine,
			'width', width,
			'lineOffset', lineOffset,
			'fitSomething', fitSomething,
			'text', text,
			'formats', formats,
			'formatsIndices', formatsIndices,
			'textBlockBeginIndex', textBlockBeginIndex,
			'textLength', textLength,
			'_ascent', this._ascent,
			'_rawText', this._rawText,
			'newTextField.textWidth', newTextField.textWidth);

		if (previousLine) {
			previousLine.setNextLine(this);
		}
		this._validity = TextLineValidity.VALID;
	}

	public static MAX_LINE_WIDTH: number /*int*/ = 1000000;

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
		return this._hasTabs;
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
		return this._ascent;
	}

	public get descent(): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get descent',  this._descent);
		return this._descent;
	}

	public get textHeight(): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get textHeight',  this._ascent + this._descent);
		return this._ascent;
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
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get atomCount',  this._rawText.length);
		return this._textLength;
	}

	public get mirrorRegions(): any/*ASVector<TextLineMirrorRegion >*/ {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - get mirrorRegions',  this._mirrorRegions);
		return this._mirrorRegions;
	}

	public getAtomIndexAtPoint(stageX: number, stageY: number): number /*int*/ {
		console.warn('[TextLine] ' + this.adaptee.id + ' - getAtomIndexAtPoint not implemented');
		return null;
	}

	public getAtomIndexAtCharIndex(charIndex: number /*int*/): number /*int*/ {
		console.warn('[TextLine] ' + this.adaptee.id + ' - getAtomIndexAtCharIndex not implemented');
		return null;
	}

	public getAtomBounds(atomIndex: number /*int*/): Rectangle {
		console.warn('[TextLine] ' + this.adaptee.id + ' - getAtomBounds not implemented');
		return (<any> this.sec).flash.geom.Rectangle(0, 0, 10, 10);
	}

	public getAtomBidiLevel(atomIndex: number /*int*/): number /*int*/ {
		console.warn('[TextLine] ' + this.adaptee.id + ' - getAtomBidiLevel not implemented');
		return null;
	}

	public getAtomTextRotation(atomIndex: number /*int*/): string {
		console.warn('[TextLine] ' + this.adaptee.id + ' - getAtomTextRotation not implemented');
		return null;
	}

	public getAtomTextBlockBeginIndex(atomIndex: number /*int*/): number /*int*/ {
		console.warn('[TextLine] ' + this.adaptee.id + ' - getAtomTextBlockBeginIndex not implemented');
		return null;
	}

	public getAtomTextBlockEndIndex(atomIndex: number /*int*/): number /*int*/ {
		console.warn('[TextLine] ' + this.adaptee.id + ' - getAtomTextBlockEndIndex not implemented');
		return null;
	}

	public getAtomCenter(atomIndex: number /*int*/): number {
		console.warn('[TextLine] ' + this.adaptee.id + ' - getAtomCenter not implemented');
		return null;
	}

	public getAtomWordBoundaryOnLeft(atomIndex: number /*int*/): boolean {
		console.warn('[TextLine] ' + this.adaptee.id + ' - getAtomWordBoundaryOnLeft not implemented');
		return null;
	}

	public getAtomGraphic(atomIndex: number /*int*/): DisplayObject {
		console.warn('[TextLine] ' + this.adaptee.id + ' - getAtomGraphic not implemented');
		return null;
	}

	public getBaselinePosition(baseline: string): number {
		noLogs || console.log('[TextLine] ' + this.adaptee.id + ' - getBaselinePosition', baseline);
		switch (baseline) {
			case TextBaseline.ROMAN:
				return 0;
			case TextBaseline.ASCENT:
				return 0;//this._descent;
		}
		return 0;
	}

	public dump(): string {
		console.warn('[TextLine] ' + this.adaptee.id + ' - dump not implemented');
		return null;
	}
}
