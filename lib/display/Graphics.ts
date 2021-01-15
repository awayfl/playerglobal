
import { Graphics as AwayGraphics } from '@awayjs/graphics';
import { notImplemented } from '@awayfl/swf-loader';
import { ASObject } from '@awayfl/avm2';
import { IAssetAdapter } from '@awayjs/core';

import { ASArray, GenericVector, AXClass } from '@awayfl/avm2';
import { BitmapData } from './BitmapData';
import { LoaderInfo } from './LoaderInfo';
import { SecurityDomain } from '../SecurityDomain';
import { Matrix } from '../geom/Matrix';

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
		this.adaptee.beginBitmapFill(bitmap.adaptee, matrix?.adaptee, repeat, smooth);
	}

	public endFill(): void {
		this.adaptee.endFill();
	}

	//    beginShaderFill(shader: flash.display.Shader, matrix: flash.geom.Matrix = null): void {
	//      //shader = shader; matrix = matrix;
	//      release || notImplemented("public flash.display.Graphics::beginShaderFill"); return;
	//    }

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
		this.adaptee.lineBitmapStyle(bitmap.adaptee, matrix?.adaptee, repeat, smooth);
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

	public drawPath(commands: GenericVector, data: GenericVector, winding: string = 'evenOdd'): void {
		notImplemented('Graphics.drawPath');
		//this.adaptee.drawPath(commands, data, winding);
	}

	public drawTriangles(vertices: GenericVector, indices: GenericVector = null,
		uvtData: GenericVector = null, culling: string = 'none'): void {
		console.warn('Graphics.drawTriangles');
		//this.adaptee.drawPath(commands, data, winding);
	}

	public drawGraphicsData(graphicsData: GenericVector): void {
		console.warn('Graphics.drawGraphicsData');
		//this.adaptee.drawPath(commands, data, winding);
	}

	public readGraphicsData(graphicsData: GenericVector): any[] {
		console.warn('Graphics.readGraphicsData');
		//this.adaptee.drawPath(commands, data, winding);
		return [];
	}

}