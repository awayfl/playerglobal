import { DisplayObject } from '../../display/DisplayObject';
import { DisplayObjectContainer } from '../../display/DisplayObjectContainer';
import { EventDispatcher } from '../../events/EventDispatcher';
import { Rectangle } from '../../geom/Rectangle';
import { TextBlock } from './TextBlock';

export class TextLine extends DisplayObjectContainer {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	public static initializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null;

	constructor() {
		super();
		console.warn('[TextLine] not implemented');
	}

	// JS -> AS Bindings
	public static MAX_LINE_WIDTH: number /*int*/ = 1000000;

	public userData: any;
	public getMirrorRegion: (mirror: EventDispatcher) => any /* flash.text.engine.TextLineMirrorRegion */;
	public flushAtomData: () => void;

	// AS -> JS Bindings

	// _focusRect: ASObject;
	// _tabChildren: boolean;
	// _tabEnabled: boolean;
	// _tabIndex: number /*int*/;
	// _contextMenu: flash.ui.ContextMenu;
	// _textBlock: flash.text.engine.TextBlock;
	// _hasGraphicElement: boolean;
	// _hasTabs: boolean;
	// _nextLine: flash.text.engine.TextLine;
	// _previousLine: flash.text.engine.TextLine;
	// _ascent: number;
	// _descent: number;
	// _textHeight: number;
	// _textWidth: number;
	// _totalAscent: number;
	// _totalDescent: number;
	// _totalHeight: number;
	// _textBlockBeginIndex: number /*int*/;
	// _rawTextLength: number /*int*/;
	// _specifiedWidth: number;
	// _unjustifiedTextWidth: number;
	// _validity: string;
	// _atomCount: number /*int*/;
	// _mirrorRegions: ASVector<flash.text.engine.TextLineMirrorRegion>;
	public get textBlock(): TextBlock {
		console.warn('[TextLine] - get textBlock not implemented');
		return null;
	}

	public get hasGraphicElement(): boolean {
		console.warn('[TextLine] - get hasGraphicElement not implemented');
		return null;
	}

	public get hasTabs(): boolean {
		console.warn('[TextLine] - get hasTabs not implemented');
		return null;
	}

	public get nextLine(): TextLine {
		console.warn('[TextLine] - get nextLine not implemented');
		return null;
	}

	public get previousLine(): TextLine {
		console.warn('[TextLine] - get previousLine not implemented');
		return null;
	}

	public get ascent(): number {
		console.warn('[TextLine] - get ascent not implemented');
		return null;
	}

	public get descent(): number {
		console.warn('[TextLine] - get descent not implemented');
		return null;
	}

	public get textHeight(): number {
		console.warn('[TextLine] - get textHeight not implemented');
		return null;
	}

	public get textWidth(): number {
		console.warn('[TextLine] - get textWidth not implemented');
		return null;
	}

	public get totalAscent(): number {
		console.warn('[TextLine] - get totalAscent not implemented');
		return null;
	}

	public get totalDescent(): number {
		console.warn('[TextLine] - get totalDescent not implemented');
		return null;
	}

	public get totalHeight(): number {
		console.warn('[TextLine] - get totalHeight not implemented');
		return null;
	}

	public get textBlockBeginIndex(): number /*int*/ {
		console.warn('[TextLine] - get textBlockBeginIndex not implemented');
		return null;
	}

	public get rawTextLength(): number /*int*/ {
		console.warn('[TextLine] - get rawTextLength not implemented');
		return null;
	}

	public get specifiedWidth(): number {
		console.warn('[TextLine] - get specifiedWidth not implemented');
		return null;
	}

	public get unjustifiedTextWidth(): number {
		console.warn('[TextLine] - get unjustifiedTextWidth not implemented');
		return null;
	}

	public get validity(): string {
		console.warn('[TextLine] - get validity not implemented');
		return null;
	}

	public set validity(value: string) {
		console.warn('[TextLine] - set validity not implemented');
	}

	public get atomCount(): number /*int*/ {
		console.warn('[TextLine] - get atomCount not implemented');
		return null;
	}

	public get mirrorRegions(): any/*ASVector<flash.text.engine.TextLineMirrorRegion >*/ {
		console.warn('[TextLine] - get mirrorRegions not implemented');
		return null;
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
