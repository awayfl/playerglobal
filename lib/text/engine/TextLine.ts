import { ASObject } from '@awayfl/avm2';
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

	constructor() {
		super();
	}

	public static MAX_LINE_WIDTH: number /*int*/ = 1000000;

	public userData: any;
	public getMirrorRegion(mirror: EventDispatcher): TextLineMirrorRegion {
		console.warn('[TextLine] - get textBlock not implemented');
		return null;
	}

	public flushAtomData(): void {
		console.warn('[TextLine] - get flushAtomData not implemented');
	}

	public get textBlock(): TextBlock {
		return this._textBlock;
	}

	public get hasGraphicElement(): boolean {
		return this._hasGraphicElement;
	}

	public get hasTabs(): boolean {
		return this._hasTabs;
	}

	public get nextLine(): TextLine {
		return this._nextLine;
	}

	public get previousLine(): TextLine {
		return this._previousLine;
	}

	public get ascent(): number {
		return this._ascent;
	}

	public get descent(): number {
		return this._descent;
	}

	public get textHeight(): number {
		return this._textHeight;
	}

	public get textWidth(): number {
		return this._textWidth;
	}

	public get totalAscent(): number {
		return this._totalAscent;
	}

	public get totalDescent(): number {
		return this._totalDescent;
	}

	public get totalHeight(): number {
		return this._totalHeight;
	}

	public get textBlockBeginIndex(): number /*int*/ {
		return this._textBlockBeginIndex;
	}

	public get rawTextLength(): number /*int*/ {
		return this._rawTextLength;
	}

	public get specifiedWidth(): number {
		return this._specifiedWidth;
	}

	public get unjustifiedTextWidth(): number {
		return this._unjustifiedTextWidth;
	}

	public get validity(): string {
		return this._validity;
	}

	public set validity(value: string) {
		this._validity = value;
	}

	public get atomCount(): number /*int*/ {
		return this._atomCount;
	}

	public get mirrorRegions(): any/*ASVector<TextLineMirrorRegion >*/ {
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
		console.warn('[TextLine] - getBaselinePosition not implemented');
		return null;
	}

	public dump(): string {
		console.warn('[TextLine] - dump not implemented');
		return null;
	}
}
