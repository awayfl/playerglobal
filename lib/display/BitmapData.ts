import { Debug, IAssetAdapter, Point as APoint } from '@awayjs/core';
import { StageManager, BitmapImage2D } from '@awayjs/stage';
import { Rectangle } from '../geom/Rectangle';
import { Point } from '../geom/Point';
import { Matrix } from '../geom/Matrix';
import { ColorTransform } from '../geom/ColorTransform';
import { BitmapFilter } from '../filters/BitmapFilter';
import { IBitmapDrawable } from './IBitmapDrawable';
import { SceneImage2D } from '@awayjs/scene';

import { IBitmapDataOwner } from './IBitmapDataOwner';
import { ASObject, ByteArray, Uint32Vector, GenericVector, ASArray } from '@awayfl/avm2';
import { SecurityDomain } from '../SecurityDomain';

const ALER_TABLE: StringMap<boolean> = {};
const ALERT_ONCE = (id: string, message: string) => {
	if (ALER_TABLE[id]) return;
	console.warn(`${id}:`, message);
	ALER_TABLE[id] = true;
};

// Flash-exact PMA→straight channel conversion (Adobe getPixels bit-exact).
// 256-entry factors (same as Ruffle FLASH_PREMUL_FACTOR). Replaces the prior
// packed bit correction LUT with (c * FACTOR[a] + 0x8000) >> 16.
const FLASH_UNPREMUL_FACTOR = new Uint32Array([
	0, 16678912, 8339456, 5559638, 4169728, 3335783, 2779819, 2386603,
	2086230, 1855488, 1667892, 1518251, 1391151, 1285234, 1193302, 1111928,
	1043895, 981113, 927744, 879275, 834621, 795535, 759126, 726358,
	695839, 668183, 642538, 618737, 596651, 576171, 555964, 538706,
	522104, 506319, 490557, 477321, 464038, 451353, 439544, 428244,
	417582, 407500, 397768, 388535, 379630, 371117, 363179, 355235,
	348050, 340965, 334052, 327038, 321269, 315077, 309159, 303586,
	298189, 293092, 287981, 283080, 278251, 273892, 269268, 265179,
	261087, 256971, 253160, 249322, 245508, 242164, 238575, 235245,
	231859, 228848, 225785, 222712, 219616, 216827, 213985, 211432,
	208835, 206075, 203750, 201196, 198895, 196223, 194301, 191987,
	189686, 187636, 185559, 183426, 181453, 179444, 177638, 175855,
	174054, 171948, 170489, 168695, 166889, 165365, 163519, 162045,
	160508, 158970, 157429, 156150, 154610, 153081, 151803, 150511,
	148986, 147709, 146420, 145116, 143868, 142586, 141545, 140277,
	139194, 137957, 136954, 135676, 134652, 133621, 132604, 131577,
	130552, 129527, 128508, 127476, 126451, 125432, 124670, 123645,
	122818, 121847, 121082, 120060, 119288, 118263, 117502, 116720,
	115967, 115195, 114424, 113655, 112893, 112125, 111356, 110563,
	109811, 109048, 108287, 107766, 107004, 106236, 105724, 104953,
	104434, 103676, 102904, 102375, 101879, 101119, 100604, 99834,
	99321, 98813, 98112, 97533, 97019, 96509, 95994, 95486,
	94713, 94185, 93689, 93179, 92667, 92149, 91643, 91129,
	90621, 90068, 89597, 89342, 88829, 88318, 87804, 87294,
	87034, 86523, 85994, 85499, 85245, 84732, 84222, 83956,
	83450, 82937, 82685, 82173, 81840, 81405, 80889, 80638,
	80127, 79862, 79354, 79103, 78590, 78332, 78077, 77565,
	77308, 76795, 76541, 76284, 75766, 75518, 75262, 74748,
	74493, 74238, 73691, 73470, 73214, 72959, 72447, 72189,
	71935, 71671, 71166, 70911, 70651, 70399, 70140, 69886,
	69615, 69116, 68861, 68603, 68350, 68093, 67839, 67576,
	67326, 67070, 66813, 66556, 66302, 66046, 65791, 65408,
]);

/** Unpremultiply one premultiplied channel to Flash-matching straight 0..255. */
function unpremultiplyChannel(value: number, alpha: number): number {
	if (!alpha)
		return 0;
	if (value > alpha)
		value = alpha;
	return (value * FLASH_UNPREMUL_FACTOR[alpha] + 0x8000) >> 16;
}

/** Flash/Ruffle premul: (c * a + 127) / 255. Opposite of unpremultiplyChannel. */
function premultiplyChannel(value: number, alpha: number): number {
	if (!alpha)
		return 0;
	if (alpha === 0xff)
		return value;
	return ((value * alpha + 127) / 255) | 0;
}

/** Scratch RGBA for single-pixel get/set (avoids per-call alloc). */
const PIXEL_SCRATCH = new Uint8ClampedArray(4);

export class BitmapData extends ASObject implements IBitmapDrawable, IAssetAdapter {
	private _adaptee: SceneImage2D;
	private _owners: IBitmapDataOwner[] = [];

	// for AVM1:
	public compare(other: BitmapData): boolean {
		return true;
	}

	public get adaptee(): SceneImage2D {
		return this._adaptee;
	}

	public set adaptee(value: SceneImage2D) {
		this._adaptee = value;
	}

	static loadBitmap(id: string): BitmapData {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'loadBitmap', '');
		return null;
	}

	public setPixels(rect: Rectangle, inputByteArray: ByteArray): void {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'setPixels', '');
	}

	public getPixels(rect: Rectangle): ByteArray {
		const pixels = this.adaptee.getPixels(rect.adaptee);
		// Lazy decoding/readback can change the pixel representation.
		const isPMA = !this.adaptee.unpackPMA;
		const buffer = new Uint8Array(pixels.length);

		for (let i = 0; i < pixels.length; i += 4) {
			const alpha = pixels[i + 3];
			buffer[i] = alpha;

			for (let channel = 0; channel < 3; channel++) {
				let value = pixels[i + channel];
				if (isPMA)
					value = unpremultiplyChannel(value, alpha);
				buffer[i + channel + 1] = value;
			}
		}

		const arr = new (<SecurityDomain> this.sec).flash.utils.ByteArray();
		// @ts-ignore
		arr.setArrayBuffer(buffer.buffer);
		return arr;
	}

	public copyPixelsToByteArray(rect: Rectangle, data: ByteArray): void {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'copyPixelsToByteArray', '');
	}

	public getVector(rect: Rectangle): Uint32Vector {
		const u8 = this.adaptee.getPixels(rect.adaptee);
		const isPMA = !this.adaptee.unpackPMA;
		// construct small buffer
		const vector = new this.sec.Uint32Vector(0, true);
		const u32 = new Uint32Array(u8.buffer);

		// flash use ARGB view, adaptee is RGBA (PMA when !unpackPMA)
		for (let i = 0; i < u32.length; i++) {
			const a = u8[i * 4 + 3];
			let r = u8[i * 4 + 0];
			let g = u8[i * 4 + 1];
			let b = u8[i * 4 + 2];

			if (isPMA) {
				r = unpremultiplyChannel(r, a);
				g = unpremultiplyChannel(g, a);
				b = unpremultiplyChannel(b, a);
			}

			u32[i] = ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
		}

		// replace a buffer for avoid coping
		//@ts-ignore
		vector._buffer = u32;
		// remap size
		//@ts-ignore
		vector._length = u32.length;

		return vector;
	}

	public setVector(rect: Rectangle, inputVector: Uint32Vector): void {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'setVector', '');
	}

	public histogram(hRect: Rectangle = null): GenericVector {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'histogram', '');
		return;
	}

	public encode(rect: Rectangle, compressor: ASObject, byteArray: ByteArray = null): ByteArray {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'encode', '');
		return;
	}

	public drawWithQuality(
		source: any,
		matrix: Matrix = null,
		colorTransform: ColorTransform = null,
		blendMode: string = null,
		clipRect: Rectangle = null,
		smoothing: boolean = false,
		quality: string = null
	): void {
		this._adaptee.draw(
			source.adaptee,
			matrix?.adaptee,
			colorTransform?.adaptee,
			blendMode,
			clipRect?.adaptee,
			smoothing
		);
	}

	constructor(width: number | SceneImage2D | BitmapImage2D,
		height?: number, transparent: boolean = true, fillColor: number = 0xffffffff) {
		super();

		if (typeof width === 'number') {

			if (!this._adaptee) {
				this._adaptee =	SceneImage2D.getImage(width, height, transparent, fillColor, false,
					StageManager.getInstance().getStageAt(0));

				// we construct a SceneImage2D direct, use weak, that call dispose after garbaging
				this._adaptee.useWeakRef();
			}

		} else {
			this._adaptee = <any>width;
		}

		this._adaptee.adapter = this;
	}

	public get transparent(): boolean {
		return this._adaptee.transparent;
	}

	public set transparent(value: boolean) {
		this._adaptee.transparent = value;
	}

	public get width(): number {
		return this._adaptee.width;
	}

	public set width(value: number) {
		this._adaptee.width = value;
	}

	public get height(): number {
		return this._adaptee.height;
	}

	public set height(value: number) {
		this._adaptee.height = value;
	}

	public clone(): BitmapData {
		const clone: BitmapData = new (<SecurityDomain> this.sec).flash.display.BitmapData(
			this._adaptee.width,
			this._adaptee.height,
			this._adaptee.transparent,
			null
		);

		// refclone
		if (this._adaptee.copyTo) {
			this._adaptee.copyTo(clone._adaptee);
		} else {
			clone.copyPixels(this, this.rect, new (<SecurityDomain> this.sec).flash.geom.Point());
		}

		return clone;
	}

	public get rect(): Rectangle {
		return new (<SecurityDomain> this.sec).flash.geom.Rectangle(this._adaptee.rect.clone());
	}

	public getPixel(x: number, y: number): number {
		return this.getPixel32(x, y) & 0xffffff;
	}

	public getPixel32(x: number, y: number): number {
		x = x | 0;
		y = y | 0;
		if (!this._adaptee.rect.contains(x, y))
			return 0;

		// SceneImage2D.getPixel32 syncs GPU→CPU, but stage then trunc-unpremuls
		// (and always divides by alpha). Flash-exact factor unpremul needs the
		// raw storage bytes — same source as getPixels — so sync via getPixel32
		// then read/modify the 4-byte pixel via getPixelData.
		this._adaptee.getPixel32(x, y);

		const pixel = PIXEL_SCRATCH;
		this._adaptee.getPixelData(x, y, pixel);
		const a = pixel[3];
		if (!a)
			return 0;

		let r = pixel[0];
		let g = pixel[1];
		let b = pixel[2];
		if (!this.adaptee.unpackPMA) {
			r = unpremultiplyChannel(r, a);
			g = unpremultiplyChannel(g, a);
			b = unpremultiplyChannel(b, a);
		}

		return ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
	}

	public setPixel(x: number, y: number, color: number): void {
		// Opaque write; alpha forced to 0xff (Flash setPixel).
		this.setPixel32(x, y, (color & 0xffffff) | 0xff000000);
	}

	public setPixel32(x: number, y: number, color: number): void {
		x = x | 0;
		y = y | 0;
		if (!this._adaptee.rect.contains(x, y))
			return;

		color = color >>> 0;
		const a = (color >>> 24) & 0xff;
		let r = (color >>> 16) & 0xff;
		let g = (color >>> 8) & 0xff;
		let b = color & 0xff;

		// Flash: API takes unmultiplied ARGB; storage is PMA via (c*a+127)/255.
		// Stage setPixel32/fillRect uses trunc (c*a/255)|0 instead — write raw
		// Flash-premuls bytes so getPixel32/getPixels factor path round-trips.
		r = premultiplyChannel(r, a);
		g = premultiplyChannel(g, a);
		b = premultiplyChannel(b, a);

		const adaptee = this._adaptee as SceneImage2D & {
			canUseMSAAInternaly?: boolean;
			_dropMSAA?: () => void;
			_unpackPMA?: boolean;
		};
		if (adaptee.canUseMSAAInternaly && typeof adaptee._dropMSAA === 'function')
			adaptee._dropMSAA();

		const pixel = PIXEL_SCRATCH;
		pixel[0] = r;
		pixel[1] = g;
		pixel[2] = b;
		pixel[3] = a;
		adaptee.setPixelData(x, y, pixel);
		adaptee._unpackPMA = false;
	}

	public applyFilter(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		filter: BitmapFilter
	): void {

		if (this._adaptee.applyFilter(
			sourceBitmap.adaptee,
			sourceRect.adaptee,
			destPoint.adaptee,
			filter.toAwayObject()
		)) {
			return;
		}

		Debug.throwPIR('playerglobals/display/BitmapData', 'applyFilter', filter.axClassName);

	}

	public colorTransform(rect: Rectangle, colorTransform: ColorTransform) {
		this._adaptee.colorTransform(rect.adaptee, colorTransform.adaptee);
	}

	public copyChannel(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		sourceChannel: number,
		destChannel: number
	) {
		this._adaptee.copyChannel(
			sourceBitmap.adaptee,
			sourceRect.adaptee,
			destPoint.adaptee,
			sourceChannel,
			destChannel
		);
	}

	public copyPixels(
		sourceBitmap: any,
		sourceRect: Rectangle,
		destPoint: Point,
		alphaBitmapData: BitmapData = null,
		alphaPoint: Point = null,
		mergeAlpha: boolean = false
	) {
		this._adaptee.copyPixels(
			sourceBitmap.adaptee,
			sourceRect.adaptee,
			destPoint.adaptee,
			alphaBitmapData ? alphaBitmapData.adaptee : null,
			alphaPoint ? alphaPoint.adaptee : null,
			mergeAlpha
		);
	}

	public dispose() {
		// already disposed or not setted
		if (!this._adaptee)
			return;

		//remove all owners
		this._owners = [];

		if (this._adaptee.canUnload) {
			this._adaptee.dispose();
		}
		this._adaptee = null;
	}

	public draw(
		source: any,
		matrix: Matrix,
		colorTransform: ColorTransform = null,
		blendMode: any = '',
		clipRect: Rectangle = null,
		smoothing: boolean = false
	) {
		this._adaptee.draw(
			source.adaptee,
			matrix?.adaptee,
			colorTransform?.adaptee,
			blendMode,
			clipRect?.adaptee,
			smoothing
		);
	}

	public fillRect(rect: Rectangle, color: number) {
		// var colorArr = ColorUtils.float32ColorToARGB(color);
		// color = ColorUtils.ARGBtoFloat32(colorArr[0], colorArr[3], colorArr[2], colorArr[1]);
		this._adaptee.fillRect(rect.adaptee, color);
	}

	public floodFill(x: number, y: number, color: number) {
		ALERT_ONCE('floodFill:' + this._adaptee.id, 'Unsage implementation!');
		this._adaptee.floodFill(x, y, color);
	}

	public generateFilterRect(sourceRect: Rectangle, filter: BitmapFilter): Rectangle {
		Debug.throwPIR('playerglobals/display/BitmapData', 'generateFilterRect', '');
		return null;
	}

	public getColorBoundsRect(mask: number, color: number, findColor: boolean): Rectangle {
		Debug.throwPIR('playerglobals/display/BitmapData', 'getColorBoundsRect', '');
		return  new (<SecurityDomain> this.sec).flash.geom.Rectangle(
			this._adaptee.getColorBoundsRect(mask, color, findColor));
	}

	public hitTest(
		firstPoint: Point,
		firstAlphaThreshold: number,
		secondObject: any,
		secondBitmapPoint: Point,
		secondAlphaThreshold: number = 0
	): boolean {
		Debug.throwPIR('playerglobals/display/BitmapData', 'hitTest', '');
		return this._adaptee.hitTest(
			firstPoint.adaptee,
			firstAlphaThreshold,
			secondObject?.adaptee,
			secondBitmapPoint?.adaptee,
			secondAlphaThreshold
		);
	}

	public lock(): void {
		this._adaptee.lock();
	}

	public merge(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		redMult: number,
		greenMult: number,
		blueMult: number,
		alphaMult: number
	) {
		this._adaptee.merge(
			sourceBitmap.adaptee,
			sourceBitmap.rect.adaptee,
			destPoint.adaptee,
			redMult,
			greenMult,
			blueMult,
			alphaMult
		);
	}

	public noise(randomSeed: number, low: number, high: number, channelOptions: number, grayScale: boolean) {
		this._adaptee.noise(randomSeed, low, high, channelOptions, grayScale);
	}

	public paletteMap(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		redArray: any[],
		greenArray: any[],
		blueArray: any[],
		alphaArray: any[]
	) {
		Debug.throwPIR('playerglobals/display/BitmapData', 'paletteMap', '');
	}

	public perlinNoise(
		baseX: number,
		baseY: number,
		numOctaves: number,
		randomSeed: number,
		stitch: boolean,
		fractalNoise: boolean,
		channelOptions: number,
		grayScale: boolean,
		offsets: ASArray = null
	) {
		const map_offsets: Array<number> = offsets ? [] : null;

		if (offsets) {
			const value = offsets.value;
			const len = value.length;

			// this is VERY strange, some games use [1, 1] and then push Point to offsets, map to [x, y, x, y]
			for (let i = 0; i < len; i++) {
				if (typeof value[i] === 'number') {
					map_offsets.push(value[i]);
				} else if (typeof value[i].x === 'number') {
					map_offsets.push(value[i].x, value[i].y);
				}
			}
		}
		//@ts-ignore
		this._adaptee.perlinNoise(baseX, baseY, numOctaves, randomSeed, stitch, fractalNoise, channelOptions, grayScale, map_offsets);
		Debug.throwPIR('playerglobals/display/BitmapData', 'perlinNoise', 'Unsafe implementation, results not equal!');
	}

	public pixelDissolve(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		randomSeed: number,
		numberOfPixels: number,
		fillColor: number
	): number {
		Debug.throwPIR('playerglobals/display/BitmapData', 'pixelDissolve', '');
		return 0;
	}

	public scroll(x: number, y: number) {
		x = x | 0;
		y = y | 0;

		// 0, 0 scroll - is not scroll
		if (!x && !y) return;

		this._adaptee.copyPixels(
			this._adaptee, this._adaptee.rect, new APoint(x,y) , null, null, false);
		//console.log('scroll not implemented yet in flash/BitmapData');
	}

	public threshold(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		operation: string,
		threshold: number,
		color: number,
		mask: number,
		copySource: boolean
	): number {
		this._adaptee.threshold(
			sourceBitmap.adaptee,
			sourceRect.adaptee,
			destPoint.adaptee,
			operation,
			threshold,
			color,
			mask,
			copySource
		);

		return 0; //number of pixels is not implemented
	}

	public unlock(): void {
		this._adaptee.unlock();
	}

	public _addOwner(owner: IBitmapDataOwner) {
		//if (this._owners.indexOf(owner) == -1) this._owners.push(owner);
	}

	public _removeOwner(owner: IBitmapDataOwner) {
		// const index: number = this._owners.indexOf(owner);

		// if (index != -1) {
		// 	this._owners.splice(index, 1);

		// 	if (this._owners.length === 0)
		// 		this._adaptee.clear();
		// }
	}
}
