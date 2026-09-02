
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

	static classInitializer: any = null;

	private _adaptee: AwayGraphics;

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
		this.adaptee.clear();
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
		if (!image) {
			return;
		}
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
		//@ts-ignore
		this.adaptee.drawPath(commands._buffer.slice(0, commands.length), data._buffer.slice(0, data.length), winding);
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
		const result = new this.sec.ObjectVector();
		const owner = this._findOwner();
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
			this.beginBitmapFill(item.bitmapData, item.matrix, item.repeat, item.smooth);
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
			if (item.commands && item.data)
				this.drawPath(item.commands, item.data, item.winding || 'evenOdd');
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
			const matrix = owner ? this._concatenatedMatrix(owner) : new AwayMatrix();
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
			return new sec.flash.display.GraphicsPath(
				this._toInt32Vector(path.commands),
				this._toFloat64Vector(this._transformPairs(path.data, concatenated)),
				path.winding || 'evenOdd'
			);
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
		if (bitmap.adaptee)
			return bitmap.adaptee;
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

}
