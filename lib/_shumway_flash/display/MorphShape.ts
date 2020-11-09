import { AXClass } from '@awayfl/avm2';
import { DisplayObject } from './DisplayObject';
import { Graphics } from './Graphics';

export class MorphShape extends DisplayObject {
	public static classSymbols: string [] = null; // [];
	public static instanceSymbols: string [] = null; // [];

	public static axClass: typeof MorphShape & AXClass;

	public static classInitializer: any = null;

	//_symbol: MorphShapeSymbol;

	/*
	applySymbol() {
		this._initializeFields();
		release || assert(this._symbol);
		this._setStaticContentFromSymbol(this._symbol);
		// TODO: Check what do do if the computed bounds of the graphics object don't
		// match those given by the symbol.
		this._setFlags(DisplayObjectFlags.ContainsMorph);
	}*/

	constructor () {
		super();
	}

	/*
	_canHaveGraphics(): boolean {
		return true;
	}

	_getGraphics(): Graphics {
		return this._graphics;
	}
	*/

	public get graphics(): Graphics {
		console.warn('[playerglobal/display/MorphShape] - get graphics not implemented');
		return null;
	}
	/*
	_containsPointDirectly(localX: number, localY: number,
		globalX: number, globalY: number): boolean {
		const graphics = this._getGraphics();
		return graphics && graphics._containsPoint(localX, localY, true, this._ratio / 0xffff);
	}
	*/
}

/*
export class MorphShapeSymbol extends ShapeSymbol {
	morphFillBounds: Bounds;
	morphLineBounds: Bounds;
	constructor(data: SymbolData, sec: ISecurityDomain) {
		super(data, MorphShape.axClass);
	}

	static FromData(data: any, loaderInfo: LoaderInfo): MorphShapeSymbol {
		const symbol = new MorphShapeSymbol(data, loaderInfo.sec);
		symbol._setBoundsFromData(data);
		symbol.graphics = Graphics.FromData(data, loaderInfo);
		symbol.processRequires(data.require, loaderInfo);
		symbol.morphFillBounds = data.morphFillBounds;
		symbol.morphLineBounds = data.morphLineBounds;
		return symbol;
	}
}
*/