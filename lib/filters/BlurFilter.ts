import { BitmapFilter, InterfaceOf } from './BitmapFilter';
import { NumberUtilities } from '@awayfl/swf-loader';
import { SecurityDomain } from '../SecurityDomain';

export class BlurFilter extends BitmapFilter {

	static axClass: typeof BlurFilter;

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null;

	public static FromUntyped(obj: any, sec: SecurityDomain) {
		return new sec.flash.filters.BlurFilter(obj.blurX, obj.blurY, obj.quality);
	}

	constructor (blurX: number = 4, blurY: number = 4, quality: number /*int*/ = 1) {
		super();
		this.blurX = blurX;
		this.blurY = blurY;
		this.quality = quality;
	}

	public readonly filterName = 'blur';
	// JS -> AS Bindings

	// AS -> JS Bindings

	private _blurX: number;
	private _blurY: number;
	private _quality: number /*int*/;

	get blurX(): number {
		return this._blurX;
	}

	set blurX(value: number) {
		this._blurX = NumberUtilities.clamp(+value, 0, 255);
	}

	get blurY(): number {
		return this._blurY;
	}

	set blurY(value: number) {
		this._blurY = NumberUtilities.clamp(+value, 0, 255);
	}

	get quality(): number /*int*/ {
		return this._quality;
	}

	set quality(value: number /*int*/) {
		this._quality = NumberUtilities.clamp(value | 0, 0, 15);
	}

	clone(): BitmapFilter {
		return new (<SecurityDomain> this.sec).flash.filters.BlurFilter(this._blurX, this._blurY, this._quality);
	}

	toAwayObject(): InterfaceOf<BlurFilter> {
		return this;
	}
}