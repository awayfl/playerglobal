import { BitmapFilter, InterfaceOf } from './BitmapFilter';
import { somewhatImplemented, release } from '@awayfl/swf-loader';
import { axCoerceString } from '@awayfl/avm2';
import { Point } from '../geom/Point';
import { BitmapData } from '../display/BitmapData';
import { SecurityDomain } from '../SecurityDomain';

type DisplacementMode = 'clamp' | 'wrap' | 'ignore' | 'color';
interface IDisplacementFilter {
	filterName: 'displacement';
	mapBitmap: BitmapData;
	mapPoint: Point;
	componentX: ui8;
	componentY: ui8;
	scaleX: number;
	scaleY: number;
	mode: DisplacementMode;
	color: ui32;
	alpha: number;
}

export class DisplacementMapFilter extends BitmapFilter implements IDisplacementFilter {

	static axClass: typeof DisplacementMapFilter;

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null;

	public static FromUntyped(obj: any, sec: SecurityDomain) {
		return new sec.flash.filters.DisplacementMapFilter(
			obj.mapBitmap,
			obj.mapPoint,
			obj.componentX,
			obj.componentY,
			obj.scaleX,
			obj.scaleY,
			obj.mode,
			obj.color,
			obj.alpha
		);
	}

	constructor (mapBitmap: BitmapData = null, mapPoint: Point = null,
		componentX: number /*uint*/ = 0, componentY: number /*uint*/ = 0,
		scaleX: number = 0, scaleY: number = 0, mode: 'clamp' | 'wrap' | 'ignore' | 'color' = 'wrap',
		color: number /*uint*/ = 0, alpha: number = 0) {
		super();
		this.mapBitmap = mapBitmap;
		this.mapPoint = mapPoint;
		this.componentX = componentX;
		this.componentY = componentY;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.mode = mode;
		this.color = color;
		this.alpha = alpha;
	}

	readonly filterName: 'displacement';
	// JS -> AS Bindings

	// AS -> JS Bindings

	private _mapBitmap: BitmapData;
	private _mapPoint: Point;
	private _componentX: number /*uint*/;
	private _componentY: number /*uint*/;
	private _scaleX: number;
	private _scaleY: number;
	private _mode: 'clamp' | 'wrap' | 'ignore' | 'color';
	private _color: number /*uint*/;
	private _alpha: number;

	get mapBitmap(): BitmapData {
		release || somewhatImplemented('public flash.filters.DisplacementMapFilter::get mapBitmap');
		return this._mapBitmap;
	}

	set mapBitmap(value: BitmapData) {
		release || somewhatImplemented('public flash.filters.DisplacementMapFilter::set mapBitmap');
		this._mapBitmap = value;
	}

	get mapPoint(): Point {
		release || somewhatImplemented('public flash.filters.DisplacementMapFilter::get mapPoint');
		return this._mapPoint;
	}

	set mapPoint(value: Point) {
		release || somewhatImplemented('public flash.filters.DisplacementMapFilter::set mapPoint');
		this._mapPoint = value;
	}

	get componentX(): number /*uint*/ {
		return this._componentX;
	}

	set componentX(value: number /*uint*/) {
		release || somewhatImplemented('public flash.filters.DisplacementMapFilter::set componentX');
		this._componentX = value >>> 0;
	}

	get componentY(): number /*uint*/ {
		return this._componentY;
	}

	set componentY(value: number /*uint*/) {
		release || somewhatImplemented('public flash.filters.DisplacementMapFilter::set componentY');
		this._componentY = value >>> 0;
	}

	get scaleX(): number {
		return this._scaleX;
	}

	set scaleX(value: number) {
		release || somewhatImplemented('public flash.filters.DisplacementMapFilter::set scaleX');
		this._scaleX = +value;
	}

	get scaleY(): number {
		return this._scaleY;
	}

	set scaleY(value: number) {
		release || somewhatImplemented('public flash.filters.DisplacementMapFilter::set scaleY');
		this._scaleY = +value;
	}

	get mode() {
		return this._mode;
	}

	set mode (value: DisplacementMode) {
		release || somewhatImplemented('public flash.filters.DisplacementMapFilter::set mode');
		this._mode = <any>axCoerceString(value);
	}

	get color(): number /*uint*/ {
		return this._color;
	}

	set color(value: number /*uint*/) {
		release || somewhatImplemented('public flash.filters.DisplacementMapFilter::set color');
		this._color = (value >>> 0) & 0xffffff;
	}

	get alpha(): number {
		return this._alpha;
	}

	set alpha(value: number) {
		release || somewhatImplemented('public flash.filters.DisplacementMapFilter::set alpha');
		this._alpha = +value;
	}

	clone(): DisplacementMapFilter {
		return new (<SecurityDomain> this.sec).flash.filters.DisplacementMapFilter(
			this._mapBitmap,
			this._mapPoint,
			this._componentX,
			this._componentY,
			this._scaleX,
			this._scaleY,
			this._mode,
			this._color,
			this._alpha
		);
	}

	toAwayObject(): InterfaceOf<IDisplacementFilter> {
		return {
			filterName: 'displacement',
			mapBitmap: this._mapBitmap.adaptee,
			mapPoint: this._mapPoint.adaptee,
			componentX: this._componentX,
			componentY: this._componentY,
			scaleX: this._scaleX,
			scaleY: this._scaleY,
			mode: this._mode,
			color: this._color,
			alpha: this._alpha
		};
	}
}