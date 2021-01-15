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
import { ElementFormat } from './ElementFormat';
import { GroupElement } from './GroupElement';
import { TextBlock } from './TextBlock';
import { TextLineMirrorRegion } from './TextLineMirrorRegion';

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

	constructor(
		previousLine: TextLine,
		width: number,
		lineOffset: number,
		fitSomething: boolean,
		content: ContentElement) {
		super();
		const adaptee: AwayDisplayObjectContainer = new AwayDisplayObjectContainer();
		this.adaptee = adaptee;
		this._previousLine = previousLine;
		this._width = width;
		this._textWidth = 0;
		this._textHeight = 0;
		this._lineOffset = lineOffset;
		this._fitSomething = fitSomething;
		this._content = content;
		this._rawText = '';
		this._textFormatsIndices = [];
		this._textFormats = [];
		//console.log('create TextLine', this._width, this._lineOffset, this._fitSomething, content);
		this.resolveGroupElements(content);
		this._textBlockBeginIndex = 0;
		this._specifiedWidth = this._width;

		const newTextField = new TextField();
		newTextField.multiline = true;
		newTextField.wordWrap = true;
		newTextField.width = this._width;

		newTextField.y = -this._lineOffset * 3;
		if (this._previousLine) {
			//console.log("previousLine", this._previousLine);
			//newTextField.y += this._previousLine.textHeight;
		}
		//newTextField.autoSize = TextFieldAutoSize.LEFT;
		(<AwayDisplayObjectContainer> this.adaptee).addChild(newTextField);
		this._textFormatsIndices.push(this._rawText.length);
		newTextField.text = this._rawText;

		let startIdx = 0;
		for (let i = 0; i < this._textFormatsIndices.length; i++) {
			const endIdx = this._textFormatsIndices[i];
			newTextField.setTextFormat(this._textFormats[i], startIdx, endIdx);
			startIdx = endIdx;
		}
		this._textWidth = newTextField.textWidth + 4;
		this._textHeight = newTextField.textHeight;
		console.log('new textfield', this._rawText, this._textHeight, this._textFormats);

		if (previousLine) {
			previousLine.setNextLine(this);
		}
	}

	public resolveGroupElements(content: ContentElement) {

		if (content.axClassName == 'flash.text.engine.TextElement') {
			const text = content.text;
			const elementFormat = content.elementFormat;
			//console.log('create TextField', text, this._width, this._lineOffset, this._fitSomething, elementFormat);
			let tf;
			if (elementFormat)
				tf = elementFormat.createAwayTextformat();
			else {
				tf = new TextFormat();
			}
			this._rawText += text ? text : '';
			this._textFormats.push(tf);
			this._textFormatsIndices.push(this._rawText.length);
		}
		if (content.axClassName == 'flash.text.engine.GroupElement') {
			const group = <GroupElement><any>content;
			//console.log('resolve GroupElement', group.elementCount);
			for (let i = 0; i < group.elementCount; i++) {
				this.resolveGroupElements(group.getElementAt(i));
			}
		}
	}

	public static MAX_LINE_WIDTH: number /*int*/ = 1000000;

	public setNextLine(value: TextLine) {
		this._nextLine = value;
	}

	public setTextBlock(value: TextBlock) {
		this._textBlock = value;
	}

	public userData: any;
	public getMirrorRegion(mirror: EventDispatcher): TextLineMirrorRegion {
		console.warn('[TextLine] - get textBlock not implemented');
		return null;
	}

	public flushAtomData(): void {
		console.warn('[TextLine] - get flushAtomData not implemented');
	}

	public get textBlock(): TextBlock {
		//console.warn('[TextLine] - get textBlock not implemented');
		return this._textBlock;
	}

	public get hasGraphicElement(): boolean {
		console.warn('[TextLine] - get hasGraphicElement not implemented', this._text);
		return false;//this._hasGraphicElement;
	}

	public get hasTabs(): boolean {
		console.warn('[TextLine] - get hasTabs not implemented');
		return this._hasTabs;
	}

	public get nextLine(): TextLine {
		//console.warn('[TextLine] - get nextLine not implemented');
		return this._nextLine;
	}

	public get previousLine(): TextLine {
		//console.warn('[TextLine] - get previousLine not implemented');
		return this._previousLine;
	}

	public get ascent(): number {
		console.warn('[TextLine] - get ascent not implemented');
		return this._textHeight;
	}

	public get descent(): number {
		console.warn('[TextLine] - get descent not implemented');
		return 100;//this._descent;
	}

	public get textHeight(): number {
		//console.warn('[TextLine] - get textHeight not implemented');
		return this._textHeight;
	}

	public get textWidth(): number {
		//console.warn('[TextLine] - get textWidth not implemented');
		return this._textWidth;
	}

	public get totalAscent(): number {
		console.warn('[TextLine] - get totalAscent not implemented');
		return 100;//this._totalAscent;
	}

	public get totalDescent(): number {
		console.warn('[TextLine] - get totalDescent not implemented');
		return 100;//this._totalDescent;
	}

	public get totalHeight(): number {
		console.warn('[TextLine] - get totalHeight not implemented');
		return this._textHeight;
	}

	public get textBlockBeginIndex(): number /*int*/ {
		console.warn('[TextLine] - get textBlockBeginIndex not implemented');
		return this._textBlockBeginIndex;
	}

	public get rawTextLength(): number /*int*/ {
		//console.warn('[TextLine] - get rawTextLength not implemented');
		return this._rawText.length;
	}

	public get specifiedWidth(): number {
		//console.warn('[TextLine] - get specifiedWidth not implemented');
		return this._specifiedWidth;
	}

	public get unjustifiedTextWidth(): number {
		console.warn('[TextLine] - get unjustifiedTextWidth not implemented');
		return this._unjustifiedTextWidth;
	}

	public get validity(): string {
		//console.warn('[TextLine] - get validity not implemented');
		return this._validity;
	}

	public set validity(value: string) {
		//console.warn('[TextLine] - set validity not implemented');
		this._validity = value;
	}

	public get atomCount(): number /*int*/ {
		console.warn('[TextLine] - get atomCount not implemented');
		return this._rawText.length;
	}

	public get mirrorRegions(): any/*ASVector<TextLineMirrorRegion >*/ {
		console.warn('[TextLine] - get mirrorRegions not implemented');
		return this._mirrorRegions;
	}

	public getAtomIndexAtPoint(stageX: number, stageY: number): number /*int*/ {
		console.warn('[TextLine] - getAtomIndexAtPoint not implemented');
		return null;
	}

	public getAtomIndexAtCharIndex(charIndex: number /*int*/): number /*int*/ {
		console.warn('[TextLine] - getAtomIndexAtCharIndex not implemented');
		return null;
	}

	public getAtomBounds(atomIndex: number /*int*/): Rectangle {
		console.warn('[TextLine] - getAtomBounds not implemented');
		return (<any> this.sec).flash.geom.Rectangle(0, 0, 10, 10);
	}

	public getAtomBidiLevel(atomIndex: number /*int*/): number /*int*/ {
		console.warn('[TextLine] - getAtomBidiLevel not implemented');
		return null;
	}

	public getAtomTextRotation(atomIndex: number /*int*/): string {
		console.warn('[TextLine] - getAtomTextRotation not implemented');
		return null;
	}

	public getAtomTextBlockBeginIndex(atomIndex: number /*int*/): number /*int*/ {
		console.warn('[TextLine] - getAtomTextBlockBeginIndex not implemented');
		return null;
	}

	public getAtomTextBlockEndIndex(atomIndex: number /*int*/): number /*int*/ {
		console.warn('[TextLine] - getAtomTextBlockEndIndex not implemented');
		return null;
	}

	public getAtomCenter(atomIndex: number /*int*/): number {
		console.warn('[TextLine] - getAtomCenter not implemented');
		return null;
	}

	public getAtomWordBoundaryOnLeft(atomIndex: number /*int*/): boolean {
		console.warn('[TextLine] - getAtomWordBoundaryOnLeft not implemented');
		return null;
	}

	public getAtomGraphic(atomIndex: number /*int*/): DisplayObject {
		console.warn('[TextLine] - getAtomGraphic not implemented');
		return null;
	}

	public getBaselinePosition(baseline: string): number {
		console.warn('[TextLine] - getBaselinePosition not implemented', baseline);
		return 0;//this._textHeight;
	}

	public dump(): string {
		console.warn('[TextLine] - dump not implemented');
		return null;
	}
}
