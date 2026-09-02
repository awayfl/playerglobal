
import {
	Graphics as AwayGraphics,
	GraphicsPath as AwayGraphicsPath,
	GraphicsStrokeStyle,
	GraphicsFillStyle,
	GraphicsEndFill as AwayGraphicsEndFill,
	SolidFillStyle,
	GradientFillStyle,
	BitmapFillStyle,
	IGraphicsData as AwayIGraphicsData,
} from '@awayjs/graphics';
import { ASObject, Float64Vector, Int32Vector } from '@awayfl/avm2';
import { Debug, IAssetAdapter, Matrix as AwayMatrix } from '@awayjs/core';

import { ASArray, GenericVector, AXClass } from '@awayfl/avm2';
import { BitmapData } from './BitmapData';
import { LoaderInfo } from './LoaderInfo';
import { SecurityDomain } from '../SecurityDomain';
import { Matrix } from '../geom/Matrix';
import { DisplayObject } from './DisplayObject';
import { DisplayObjectContainer } from './DisplayObjectContainer';
import { GraphicsSolidFill } from './GraphicsSolidFill';
import { GraphicsEndFill } from './GraphicsEndFill';
import { GraphicsGradientFill } from './GraphicsGradientFill';
import { GraphicsBitmapFill } from './GraphicsBitmapFill';
import { GraphicsStroke } from './GraphicsStroke';
import { GraphicsPath } from './GraphicsPath';
import { GraphicsTrianglePath } from './GraphicsTrianglePath';

export class Graphics extends ASObject implements IAssetAdapter {

	static axClass: typeof Graphics & AXClass;

	public static currentAwayGraphics: AwayGraphics;

	static classInitializer: any = function (this: any) {
		// playerglobal.abcs Graphics is missing readGraphicsData, so linkClass never
		// installs $BgreadGraphicsData. AS3 then calls a missing function (Error #1006).
		const proto = this.dPrototype;
		if (!proto)
			return;
		if (typeof proto.readGraphicsData === 'function')
			proto.$BgreadGraphicsData = proto.readGraphicsData;
		if (typeof proto.nativeGetGraphicsData === 'function')
			proto.$BgnativeGetGraphicsData = proto.nativeGetGraphicsData;
	};

	private _adaptee: AwayGraphics;

	/**
	 * AS3 DisplayObject (Shape/Sprite) that owns this wrapper. Timeline instances
	 * share one AwayGraphics per symbol; we use this to copy-on-write on clear().
	 */
	public ownerAdapter: DisplayObject = null;

	constructor(adaptee: AwayGraphics = null) {
		super();
		this._adaptee = adaptee || new AwayGraphics();
		this._adaptee.adapter = this;
	}

	public dispose() {

	}

	public get adaptee(): AwayGraphics {
		return this._adaptee;
	}

	public static FromData(data: any, loaderInfo: LoaderInfo): Graphics {
		const graphics: Graphics = new (<SecurityDomain> this.sec).flash.display.Graphics();
		return graphics;
	}
	/*
	public getGraphicsData(): ShapeData {
		return this._graphicsData;
	}

	public getUsedTextures(): BitmapData[] {
		return this._textures;
	}*/

	public clear(): void {
		this._detachSharedGraphics();
		this.adaptee.clear();
	}

	/**
	 * Flash copy-on-write: graphics.clear() on one instance must not wipe the
	 * symbol Graphics used by other timeline instances (or graphicsPool).
	 * Replace this sprite's Graphics with a fresh empty one and leave the
	 * shared original intact so later instances can still read their paths.
	 */
	private _detachSharedGraphics(): void {
		const current = this._adaptee;
		if (!current)
			return;

		let owners = 0;
		if (typeof (current as any).forEachOwner === 'function') {
			(current as any).forEachOwner(() => { owners++; });
		}

		const owner = this.ownerAdapter || this._findOwner();
		const awayOwner: any = owner && owner.adaptee;
		const shared = owners > 1
			|| !!(current as any).sourceGraphics
			|| (awayOwner && awayOwner.graphics === current);

		if (!shared || !awayOwner || typeof awayOwner.graphics === 'undefined')
			return;

		const fresh = new AwayGraphics();
		this._adaptee = fresh;
		fresh.adapter = this;
		awayOwner.graphics = fresh;
	}

	/**
	 * Sets a solid color and opacity as the fill for subsequent drawing commands.
	 *
	 * @see
	 * http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/Graphics.html#beginFill%28%29
	 * @param color
	 * @param alpha While any Number is a valid input, the value is clamped to [0,1] and then scaled
	 * to an integer in the interval [0,0xff].
	 */
	public beginFill(color: number /*uint*/, alpha: number = 1): void {
		if (alpha < 0)
			alpha = 0;
		if (alpha > 1)
			alpha = 1;
		this.adaptee.beginFill(color, alpha);
	}

	public beginGradientFill(type: string, colors: ASArray, alphas: ASArray, ratios: ASArray,
		matrix: Matrix = null, spreadMethod: string = 'pad',
		interpolationMethod: string = 'rgb', focalPointRatio: number = 0): void {
		this.adaptee.beginGradientFill(
			<any>type, colors.value, alphas.value, ratios.value, matrix?.adaptee,
			spreadMethod, interpolationMethod, focalPointRatio);
	}

	public beginBitmapFill(bitmap: BitmapData, matrix: Matrix = null,
		repeat: boolean = true, smooth: boolean = false): void {
		const image = this._resolveBitmapImage(bitmap);
		if (!image)
			return;
		this.adaptee.beginBitmapFill(image, matrix?.adaptee, repeat, smooth);
	}

	public endFill(): void {
		this.adaptee.endFill();
	}

	public beginShaderFill(shader: any = null, matrix: Matrix = null): void {
		// Pixel Bender shaders are not supported; keep the native trait bound.
	}


	public lineStyle(thickness: number, color: number /*uint*/ = 0, alpha: number = 1,
		pixelHinting: boolean = false, scaleMode: string = 'normal', caps: string = null,
		joints: string = null, miterLimit: number = 3): void {
		this.adaptee.lineStyle(
			thickness, color, alpha, pixelHinting, <any>scaleMode, <any>caps, <any>joints, miterLimit);
	}

	public lineGradientStyle(type: string, colors: ASArray, alphas: ASArray, ratios: ASArray,
		matrix: Matrix = null, spreadMethod: string = 'pad',
		interpolationMethod: string = 'rgb', focalPointRatio: number = 0): void {
		this.adaptee.lineGradientStyle(
			<any>type, colors.value, alphas.value, ratios.value,
			matrix?.adaptee, spreadMethod, interpolationMethod, focalPointRatio);
	}

	public lineBitmapStyle(bitmap: BitmapData, matrix: Matrix = null,
		repeat: boolean = true, smooth: boolean = false): void {
		const image = this._resolveBitmapImage(bitmap);
		if (!image)
			return;
		this.adaptee.lineBitmapStyle(image, matrix?.adaptee, repeat, smooth);
	}

	public lineShaderStyle(shader: any = null, matrix: Matrix = null): void {
		// Pixel Bender shaders are not supported; keep the native trait bound.
	}

	public drawRect(x: number, y: number, width: number, height: number): void {
		this.adaptee.drawRect(x, y, width, height);
	}

	public drawRoundRect(x: number, y: number, width: number, height: number, ellipseWidth: number,
		ellipseHeight: number): void {
		this.adaptee.drawRoundRect(x, y, width, height, ellipseWidth, ellipseHeight);

	}

	public drawRoundRectComplex(x: number, y: number, width: number, height: number,
		topLeftRadius: number, topRightRadius: number,
		bottomLeftRadius: number,
		bottomRightRadius: number): void {

		this.adaptee.drawRoundRectComplex(
			x, y, width, height, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius);

	}

	public drawCircle(x: number, y: number, radius: number): void {
		this.adaptee.drawCircle(x, y, radius);
	}

	/**
	 * Here x and y are the top-left coordinates of the bounding box of the
	 * ellipse not the center as is the case for circles.
	 */
	public drawEllipse(x: number, y: number, width: number, height: number): void {
		this.adaptee.drawEllipse(x, y, width, height);
	}

	public moveTo(x: number, y: number): void {
		this.adaptee.moveTo(x, y);
	}

	public lineTo(x: number, y: number): void {
		this.adaptee.lineTo(x, y);
	}

	public curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number): void {
		this.adaptee.curveTo(controlX, controlY, anchorX, anchorY);
	}

	public cubicCurveTo(controlX1: number, controlY1: number, controlX2: number, controlY2: number,
		anchorX: number, anchorY: number): void {
		this.adaptee.cubicCurveTo(controlX1, controlY1, controlX2, controlY2, anchorX, anchorY);
	}

	public copyFrom(sourceGraphics: Graphics): void {
		this.adaptee.copyFrom(sourceGraphics.adaptee);
	}

	public drawPath(commands: Int32Vector, data: Float64Vector, winding: string = 'evenOdd'): void {
		const cmdArr = this._vectorNums(commands);
		const dataArr = this._vectorNums(data);
		if (!cmdArr.length || !dataArr.length)
			return;
		//@ts-ignore
		this.adaptee.drawPath(cmdArr, dataArr, winding);
	}

	public drawTriangles(vertices: Float64Vector, indices: Int32Vector = null,
		uvtData: Int32Vector = null, culling: string = 'none'): void {
		// @todo
		Debug.throwPIR('playerglobals/display/Graphics', 'drawTriangles', '');
	}

	public drawGraphicsData(graphicsData: GenericVector): void {
		if (!graphicsData)
			return;

		const len = graphicsData.length | 0;
		for (let i = 0; i < len; i++) {
			const item = this._vectorAt(graphicsData, i);
			if (item)
				this._drawGraphicsDataItem(item);
		}
	}

	public readGraphicsData(recurse: boolean = true): GenericVector {
		return this.nativeGetGraphicsData(recurse, true);
	}

	/**
	 * AIR Graphics.as calls this private native from readGraphicsData().
	 * Present on playerglobal_new.abc; older catalogs omit readGraphicsData entirely.
	 */
	public nativeGetGraphicsData(recurse: boolean = true, _strokes: boolean = true): GenericVector {
		const result = new (<any> this.sec).ObjectVector();
		const owner = this.ownerAdapter || this._findOwner();
		this._collectGraphicsData(result, this.adaptee, owner, !!recurse, true);
		return result;
	}

	private _drawGraphicsDataItem(item: any): void {
		if (!item)
			return;

		if (this._isType(item, 'GraphicsSolidFill', GraphicsSolidFill)) {
			this.beginFill(item.color, item.alpha);
			return;
		}

		if (this._isType(item, 'GraphicsGradientFill', GraphicsGradientFill)) {
			this.beginGradientFill(
				item.type, item.colors, item.alphas, item.ratios,
				item.matrix, item.spreadMethod, item.interpolationMethod, item.focalPointRatio);
			return;
		}

		if (this._isType(item, 'GraphicsBitmapFill', GraphicsBitmapFill) ||
			this._isBitmapFillLike(item)) {
			const bd = item._nativeBitmapData || this._axProp(item, 'bitmapData');
			const mx = item._nativeMatrix || this._axProp(item, 'matrix');
			const rp = (item._nativeRepeat !== undefined) ? item._nativeRepeat : this._axProp(item, 'repeat');
			const sm = (item._nativeSmooth !== undefined) ? item._nativeSmooth : this._axProp(item, 'smooth');
			this.beginBitmapFill(bd, mx, rp !== false, !!sm);
			return;
		}

		if (this._isType(item, 'GraphicsEndFill', GraphicsEndFill)) {
			this.endFill();
			return;
		}

		if (this._isType(item, 'GraphicsStroke', GraphicsStroke)) {
			this._applyStroke(item);
			return;
		}

		if (this._isType(item, 'GraphicsPath', GraphicsPath)) {
			const commands = this._axProp(item, 'commands') || item.commands;
			const data = this._axProp(item, 'data') || item.data;
			const winding = this._axProp(item, 'winding') || item.winding || 'evenOdd';
			if (commands && data)
				this.drawPath(commands, data, winding);
			return;
		}

		if (this._isType(item, 'GraphicsTrianglePath', GraphicsTrianglePath)) {
			// AIR readGraphicsData skips triangles; drawTriangles is not implemented.
			return;
		}

		// Engine IGraphicsData (has data_type) can be forwarded directly.
		if (item.data_type && this.adaptee)
			this.adaptee.drawGraphicsData([item]);
	}

	private _applyStroke(stroke: GraphicsStroke): void {
		const fill: any = stroke.fill;
		let color = 0;
		let alpha = 1;

		if (this._isType(fill, 'GraphicsSolidFill', GraphicsSolidFill)) {
			color = fill.color;
			alpha = fill.alpha;
		}

		this.lineStyle(
			stroke.thickness, color, alpha,
			stroke.pixelHinting, stroke.scaleMode,
			stroke.caps, stroke.joints, stroke.miterLimit);

		if (this._isType(fill, 'GraphicsGradientFill', GraphicsGradientFill)) {
			this.lineGradientStyle(
				fill.type, fill.colors, fill.alphas, fill.ratios,
				fill.matrix, fill.spreadMethod, fill.interpolationMethod, fill.focalPointRatio);
			return;
		}

		if (this._isType(fill, 'GraphicsBitmapFill', GraphicsBitmapFill)) {
			this.lineBitmapStyle(fill.bitmapData, fill.matrix, fill.repeat, fill.smooth);
		}
	}

	private _collectGraphicsData(
		result: GenericVector,
		awayGraphics: AwayGraphics,
		owner: DisplayObject,
		recurse: boolean,
		isRoot: boolean
	): void {
		if (!isRoot && owner && owner.visible === false)
			return;

		if (!isRoot && owner && owner.parent && owner.parent.mask === owner)
			return;

		if (awayGraphics) {
			// AIR: IGraphicsData is in the local space of the Graphics being read.
			// Recursed children are transformed into that object's space, not stage space.
			const matrix = isRoot
				? new AwayMatrix()
				: (owner ? this._concatenatedMatrix(owner) : new AwayMatrix());
			const items = awayGraphics.readGraphicsData();
			for (let i = 0; i < items.length; i++) {
				const as3 = this._engineItemToAS3(items[i], matrix);
				if (as3)
					this._vectorPush(result, as3);
			}
		}

		if (!recurse || !owner || !this._isContainer(owner))
			return;

		const container = <DisplayObjectContainer> owner;
		const n = container.numChildren;
		for (let i = 0; i < n; i++) {
			const child = container.getChildAt(i);
			if (!child || child.visible === false)
				continue;
			if (container.mask === child)
				continue;

			const childGraphics: Graphics = (<any> child).graphics;
			const childAdaptee = (childGraphics && childGraphics !== this)
				? childGraphics.adaptee
				: null;
			this._collectGraphicsData(result, childAdaptee, child, true, false);
		}
	}

	private _findOwner(): DisplayObject {
		let found: DisplayObject = null;
		const graphics = this.adaptee as any;
		if (graphics && typeof graphics.forEachOwner === 'function') {
			graphics.forEachOwner((owner: any) => {
				if (found)
					return;
				const adapter = owner && owner.adapter;
				if (adapter && adapter !== owner)
					found = adapter;
			});
		}
		return found;
	}

	private _isContainer(obj: DisplayObject): boolean {
		return !!(obj && typeof (<any> obj).numChildren === 'number' &&
			typeof (<any> obj).getChildAt === 'function');
	}

	private _concatenatedMatrix(obj: DisplayObject): AwayMatrix {
		const result = new AwayMatrix();
		const stack: AwayMatrix[] = [];
		let current: DisplayObject = obj;
		while (current) {
			const transform = current.adaptee && (<any> current.adaptee).transform;
			const local = transform && transform.matrix;
			if (local)
				stack.push(local);
			current = current.parent;
		}
		for (let i = stack.length - 1; i >= 0; i--)
			result.concat(stack[i]);
		return result;
	}

	private _engineItemToAS3(item: AwayIGraphicsData, concatenated: AwayMatrix): any {
		if (!item)
			return null;

		const sec = <SecurityDomain> this.sec;
		const type = item.data_type;

		if (type == GraphicsFillStyle.data_type)
			return this._engineItemToAS3((<GraphicsFillStyle<any>> item).fillStyle, concatenated);

		if (type == SolidFillStyle.data_type) {
			const solid = <SolidFillStyle> item;
			return new sec.flash.display.GraphicsSolidFill(solid.color, solid.alpha);
		}

		if (type == GradientFillStyle.data_type) {
			const gradient = <GradientFillStyle> item;
			return new sec.flash.display.GraphicsGradientFill(
				gradient.type,
				this._toASArray(gradient.colors),
				this._toASArray(gradient.alphas),
				this._toASArray(gradient.ratios),
				this._wrapMatrix(this._concatFillMatrix(gradient.matrix, concatenated)),
				gradient.spreadMethod,
				gradient.interpolationMethod,
				gradient.focalPointRatio
			);
		}

		if (type == BitmapFillStyle.data_type) {
			const bitmap = <BitmapFillStyle> item;
			const wrapped = this._wrapBitmapData(bitmap.image);
			return new sec.flash.display.GraphicsBitmapFill(
				wrapped,
				this._wrapMatrix(this._concatFillMatrix(bitmap.matrix, concatenated)),
				true,
				false
			);
		}

		if (type == AwayGraphicsEndFill.data_type)
			return new sec.flash.display.GraphicsEndFill();

		if (type == GraphicsStrokeStyle.data_type) {
			const stroke = <GraphicsStrokeStyle<any>> item;
			const fill = this._engineItemToAS3(this._strokeFill(stroke), concatenated);
			return new sec.flash.display.GraphicsStroke(
				stroke.thickness,
				false,
				'normal',
				'none',
				'round',
				3,
				fill
			);
		}

		if (type == AwayGraphicsPath.data_type) {
			const path = <AwayGraphicsPath> item;
			const winding = path.winding === 'nonZero' ? 'nonZero' : 'evenOdd';
			const commands = this._toInt32Vector(path.commands);
			const data = this._toFloat64Vector(this._transformPairs(path.data, concatenated));
			// Construct with a valid winding first (ABC validates it). Then poke
			// commands/data onto both JS fields and $Bg slots — the ABC ctor does not.
			const as3: any = new sec.flash.display.GraphicsPath(null, null, winding);
			as3.commands = commands;
			as3.data = data;
			as3.winding = winding;
			as3.$Bgcommands = commands;
			as3.$Bgdata = data;
			as3.$Bgwinding = winding;
			return as3;
		}

		return null;
	}

	private _strokeFill(stroke: GraphicsStrokeStyle<any>): AwayIGraphicsData {
		let fill: any = stroke.fillStyle;
		if (fill && fill.data_type == GraphicsFillStyle.data_type)
			fill = fill.fillStyle;
		return fill;
	}

	private _concatFillMatrix(local: AwayMatrix, concatenated: AwayMatrix): AwayMatrix {
		const result = concatenated ? concatenated.clone() : new AwayMatrix();
		if (local)
			result.concat(local);
		return result;
	}

	private _transformPairs(data: number[], matrix: AwayMatrix): number[] {
		if (!data)
			return [];
		const out = data.concat();
		if (!matrix || out.length < 2)
			return out;

		const raw = matrix.rawData;
		const a = raw[0], b = raw[1], c = raw[2], d = raw[3], tx = raw[4], ty = raw[5];
		for (let i = 0; i + 1 < out.length; i += 2) {
			const x = out[i];
			const y = out[i + 1];
			out[i] = a * x + c * y + tx;
			out[i + 1] = b * x + d * y + ty;
		}
		return out;
	}

	private _wrapMatrix(matrix: AwayMatrix): Matrix {
		if (!matrix)
			return null;
		return new (<SecurityDomain> this.sec).flash.geom.Matrix(matrix.clone());
	}

	private _wrapBitmapData(image: any): BitmapData {
		if (!image)
			return null;

		const adapter = image.adapter;
		// BitmapImage2D.adapter defaults to the image itself when unset.
		if (adapter && adapter !== image && adapter.adaptee === image)
			return adapter;

		// Keep a hard adapter so WeakRef GC cannot dispose the SWF texture.
		if (typeof image.unuseWeakRef === 'function')
			image.unuseWeakRef();

		return new (<SecurityDomain> this.sec).flash.display.BitmapData(image);
	}

	private _resolveBitmapImage(bitmap: any): any {
		if (!bitmap)
			return null;
		const adaptee = bitmap.adaptee || bitmap._adaptee || this._axProp(bitmap, 'adaptee');
		if (adaptee)
			return adaptee;
		// Image2D / BitmapImage2D passed through because adapter defaulted to self.
		if (typeof bitmap.width === 'number' && typeof bitmap.height === 'number')
			return bitmap;
		return null;
	}

	private _isBitmapFillLike(item: any): boolean {
		return !!(item && !item.data_type && !item.thickness &&
			'bitmapData' in item && 'repeat' in item && 'smooth' in item);
	}

	private _toASArray(values: number[]): ASArray {
		const list = values ? values.concat() : [];
		const sec: any = this.sec;
		if (typeof sec.createArray === 'function')
			return sec.createArray(list);
		const arr: any = list;
		arr.value = list.concat();
		return arr;
	}

	private _toInt32Vector(values: number[]): Int32Vector {
		const list = values || [];
		const vector = new this.sec.Int32Vector(list.length, false);
		for (let i = 0; i < list.length; i++)
			this._vectorSet(vector, i, list[i] | 0);
		return vector;
	}

	private _toFloat64Vector(values: number[]): Float64Vector {
		const list = values || [];
		const vector = new this.sec.Float64Vector(list.length, false);
		for (let i = 0; i < list.length; i++)
			this._vectorSet(vector, i, +list[i]);
		return vector;
	}

	private _isType(item: any, name: string, Ctor: any): boolean {
		if (!item)
			return false;
		if (item instanceof Ctor)
			return true;
		const ax = (<any> (<SecurityDomain> this.sec).flash.display)[name];
		if (!ax)
			return false;
		if (typeof ax.axIsType === 'function' && ax.axIsType(item))
			return true;
		if (item.axClass === ax)
			return true;
		const className = item.axClassName || (item.axClass && (item.axClass.name || item.axClass.__name));
		return className === name || className === 'flash.display.' + name;
	}

	private _vectorNums(vector: any): number[] {
		if (!vector)
			return [];
		const n = vector.length | 0;
		if (vector._buffer && typeof vector._buffer.slice === 'function')
			return Array.prototype.slice.call(vector._buffer, 0, n);
		if (typeof vector.axGetNumericProperty === 'function') {
			const out: number[] = [];
			for (let i = 0; i < n; i++)
				out.push(+vector.axGetNumericProperty(i));
			return out;
		}
		if (vector.value)
			return Array.prototype.slice.call(vector.value, 0, n);
		if (typeof vector.slice === 'function')
			return vector.slice(0, n);
		return [];
	}

	private _vectorAt(vector: any, index: number): any {
		if (typeof vector.axGetNumericProperty === 'function')
			return vector.axGetNumericProperty(index);
		if (vector.value)
			return vector.value[index];
		return vector[index];
	}

	private _vectorPush(vector: any, value: any): void {
		if (typeof vector.axSetNumericProperty === 'function') {
			vector.axSetNumericProperty(vector.length, value);
			return;
		}
		if (typeof vector.push === 'function') {
			vector.push(value);
			return;
		}
		vector[vector.length] = value;
	}

	private _vectorSet(vector: any, index: number, value: any): void {
		if (typeof vector.axSetNumericProperty === 'function') {
			vector.axSetNumericProperty(index, value);
			return;
		}
		vector[index] = value;
	}

	private _axProp(item: any, name: string): any {
		if (!item)
			return undefined;
		// ABC slots default to null ($Bgfoo). The TS constructor writes `this.foo`,
		// so prefer a non-null own/JS field over an uninitialized slot.
		const direct = item[name];
		if (direct != null)
			return direct;
		const bg = item['$Bg' + name];
		if (bg != null)
			return bg;
		if (typeof item.axGetPublicProperty === 'function') {
			try {
				const v = item.axGetPublicProperty(name);
				if (v != null)
					return v;
			} catch (_e) { /* ignore */ }
		}
		return direct != null ? direct : bg;
	}

}
