import { BitmapFilter } from './BitmapFilter';
import { toNumber, isNullOrUndefined } from '@awayfl/swf-loader';
import { Errors, ASArray, AXSecurityDomain } from '@awayfl/avm2';
import { IFilter } from '@awayjs/scene';
import { SecurityDomain } from '../SecurityDomain';

/**
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Class: ColorMatrixFilter

export interface IColorMatrix {
	filterName: 'colorMatrix';
	matrix: number[];
}

export class ColorMatrixFilter extends BitmapFilter {

	static axClass: typeof ColorMatrixFilter;

	static classInitializer: any = null;

	public static FromUntyped(obj: IFilter, sec: SecurityDomain) {
		return new sec.flash.filters.ColorMatrixFilter(sec.createArrayUnsafe(obj.matrix));
	}

	constructor (matrix: ASArray = null) {
		super();
		if (matrix) {
			this.matrix = matrix;
		} else {
			this._matrix = [
				1, 0, 0, 0, 0,
				0, 1, 0, 0, 0,
				0, 0, 1, 0, 0,
				0, 0, 0, 1, 0
			];
		}
	}

	_serialize(message) {
		const matrix: number[] = this._matrix;
		message.ensureAdditionalCapacity((matrix.length + 1) * 4);
		message.writeIntUnsafe(6);
		for (let i: number = 0; i < matrix.length; i++) {
			message.writeFloatUnsafe(matrix[i]);
		}
	}

	private _matrix: number[];

	get matrix(): ASArray {
		return this.sec.createArrayUnsafe(this._matrix.concat());
	}

	set matrix(value_: ASArray) {
		if (isNullOrUndefined(value_)) {
			this.sec.throwError('TypeError', Errors.NullPointerError, 'matrix');
		}
		const matrix = [
			0, 0, 0, 0, 0,
			0, 0, 0, 0, 0,
			0, 0, 0, 0, 0,
			0, 0, 0, 0, 0
		];
		const value = value_.value;
		for (let i = 0, n = Math.min(value.length, 20); i < n; i++) {
			matrix[i] = toNumber(value[i]);
		}
		this._matrix = matrix;
	}

	clone(): BitmapFilter {
		return new ColorMatrixFilter(this.matrix);
	}

	toAwayObject() {
		return {
			filterName: 'colorMatrix',
			matrix: this._matrix
		};
	}
}