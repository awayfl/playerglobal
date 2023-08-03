import { clamp, isNullOrUndefined } from '@awayfl/swf-loader';
import { ASObject } from '@awayfl/avm2';

type NonFunctionPropertyNames<T> = {
	[K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonPrimitiveProperty<T> = {
	[K in keyof T]: T[K] extends object ? any: T[K];
};

export type InterfaceOf<T> = NonPrimitiveProperty<Pick<T, NonFunctionPropertyNames<T>>>;

export class BitmapFilter extends ASObject {

	static axClass: typeof BitmapFilter;

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	constructor() {
		super();
	}

	clone(): BitmapFilter {
		return null;
	}

	toAwayObject(): InterfaceOf<any>  {
		return null;
	}

}

export class GradientArrays {

	static colors: any[];
	static alphas: any[];
	static ratios: any[];

	// colors null or empty - all empty
	// ratios empty - all empty
	// ratios null and alphas null - length: colors, alphas set to 0, ratios set to 0
	// ratios null and alphas != null - length: colors, alphas filled with 1, ratios set to 0
	// ratios not empty and alphas null - length: min(colors,ratios), alphas set to 0
	// ratios not empty and alphas != null - length: min(colors,ratios), alphas filled with 1
	static sanitize(colors: any[], alphas: any[], ratios: any[]) {
		if (isNullOrUndefined(colors) || colors.length === 0) {
			this.colors = [];
			this.alphas = [];
			this.ratios = [];
		} else {
			let len: number;
			if (isNullOrUndefined(ratios)) {
				this.colors = this.sanitizeColors(colors);
				len = this.colors.length;
				this.ratios = this.initArray(len);
				if (isNullOrUndefined(alphas)) {
					this.alphas = this.initArray(len);
				} else {
					this.alphas = this.sanitizeAlphas(alphas, len, len, 1);
				}
			} else {
				if (ratios.length === 0) {
					this.colors = [];
					this.alphas = [];
					this.ratios = [];
				} else {
					len = Math.min(colors.length, ratios.length, 16);
					this.colors = this.sanitizeColors(colors, len);
					this.ratios = this.sanitizeRatios(ratios, len);
					if (isNullOrUndefined(alphas)) {
						this.alphas = this.initArray(len);
					} else {
						this.alphas = this.sanitizeAlphas(alphas, len, len, 1);
					}
				}
			}
		}
	}

	static sanitizeColors(colors: number[], maxLen: number = 16): number[] {
		const arr: number[] = [];
		for (let i = 0, n = Math.min(colors.length, maxLen); i < n; i++) {
			arr[i] = (colors[i] >>> 0) & 0xffffff;
		}
		return arr;
	}

	static sanitizeAlphas(alphas: number[], maxLen: number = 16, minLen: number = 0, value: number = 0): number[] {
		const arr: number[] = [];
		let i;
		const n = Math.min(alphas.length, maxLen);
		for (i = 0; i < n; i++) {
			arr[i] = clamp(+alphas[i], 0, 1);
		}
		while (i < minLen) {
			arr[i++] = value;
		}
		return arr;
	}

	static sanitizeRatios(ratios: number[], maxLen: number = 16, minLen: number = 0, value: number = 0): number[] {
		const arr: number[] = [];
		let i;
		const n = Math.min(ratios.length, maxLen);
		for (i = 0; i < n; i++) {
			arr[i] = clamp(+ratios[i], 0, 255);
		}
		while (i < minLen) {
			arr[i++] = value;
		}
		return arr;
	}

	static initArray(len: number, value: number = 0): number[] {
		const arr: number[] = Array(len);
		for (let i = 0; i < len; i++) {
			arr[i] = value;
		}
		return arr;
	}
}