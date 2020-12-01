import { ASObject } from '@awayfl/avm2';
import { TextField, DisplayObjectContainer as AwayDisplayObjectContainer, TextFieldAutoSize } from '@awayjs/scene';
import { DisplayObject } from '../../display/DisplayObject';
import { DisplayObjectContainer } from '../../display/DisplayObjectContainer';
import { EventDispatcher } from '../../events/EventDispatcher';
import { Rectangle } from '../../geom/Rectangle';
import { ContextMenu } from '../../ui/ContextMenu';
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
	private _rawTextLength: number /*int*/;
	private _specifiedWidth: number;
	private _unjustifiedTextWidth: number;
	private _validity: string;
	private _atomCount: number /*int*/;
	private _mirrorRegions: any /*ASVector<flash.text.engine.TextLineMirrorRegion>*/;

	private _textfield: TextField;

	constructor(
		previousLine,
		width,
		lineOffset,
		fitSomething,
		text,
		elementFormat) {
		super();
		const adaptee: AwayDisplayObjectContainer = new AwayDisplayObjectContainer();
		this.adaptee = adaptee;
		this._textfield = new TextField();
		this._textfield.autoSize = TextFieldAutoSize.LEFT;
		adaptee.addChild(this._textfield);
		this._textfield.text = text;
		this._previousLine = previousLine;
		if (previousLine) {
			previousLine.setNextLine(this);
		}
		console.log('elementFormat', elementFormat);
		this._text = text;
		this._textBlockBeginIndex = 0;
		this._rawTextLength = text.length;
		this._specifiedWidth = width;
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
		//console.warn('[TextLine] - get ascent not implemented');
		return 0;//this._ascent;
	}

	public get descent(): number {
		//console.warn('[TextLine] - get descent not implemented');
		return 0;//this._descent;
	}

	public get textHeight(): number {
		return this._textfield.textHeight;
	}

	public get textWidth(): number {
		//console.warn('[TextLine] - get textWidth not implemented');
		return 100;//this._textfield.textWidth;
	}

	public get totalAscent(): number {
		console.warn('[TextLine] - get totalAscent not implemented');
		return 0;//this._totalAscent;
	}

	public get totalDescent(): number {
		console.warn('[TextLine] - get totalDescent not implemented');
		return 0;//this._totalDescent;
	}

	public get totalHeight(): number {
		console.warn('[TextLine] - get totalHeight not implemented');
		return 100;//this._totalHeight;
	}

	public get textBlockBeginIndex(): number /*int*/ {
		//console.warn('[TextLine] - get textBlockBeginIndex not implemented');
		return this._textBlockBeginIndex;
	}

	public get rawTextLength(): number /*int*/ {
		//console.warn('[TextLine] - get rawTextLength not implemented');
		return this._rawTextLength;
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
		return this._atomCount;
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
		return null;
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
		//console.warn('[TextLine] - getBaselinePosition not implemented');
		return 0;
	}

	public dump(): string {
		console.warn('[TextLine] - dump not implemented');
		return null;
	}
}
