import { Vector3D } from './Vector3D';
import { ASObject, Errors } from '@awayfl/avm2';
import { notImplemented, release, somewhatImplemented } from '@awayfl/swf-loader';
import { axCoerceString } from '@awayjs/graphics';
import { Matrix3D as AwayMatrix3D, Vector3D as AwayVector3D, Orientation3D } from '@awayjs/core';
import { Float64Vector, GenericVector } from '@awayfl/avm2';
import { SecurityDomain } from '../SecurityDomain';

/*
  * _matrix stores data by columns
  *  | 0  4  8  12 |
  *  | 1  5  9  13 |
  *  | 2  6 10  14 |
  *  | 3  7 11  15 |
  */

const transposeTransform = new Uint32Array([
	0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15
]);

export class Matrix3D extends ASObject {
	private _adaptee: AwayMatrix3D;

	static classInitializer = null;

	static axClass: typeof Matrix3D;

	public get adaptee(): AwayMatrix3D {
		return this._adaptee;
	}

	constructor (v: Float64Vector | AwayMatrix3D = null) {
		super();

		if (v instanceof AwayMatrix3D) {
			this._adaptee = v;
		} else {
			this._adaptee = new AwayMatrix3D();

			if (v && v.length >= 16) {
				this.copyRawDataFrom(v, 0, false);
			} else {
				this.identity();
			}
		}
	}

	static interpolate(thisMat: Matrix3D, toMat: Matrix3D, percent: number): Matrix3D {
		percent = +percent;
		release || notImplemented('public flash.geom.Matrix3D::static interpolate'); return;
	}

	public get rawData(): Float64Vector {
		const result: Float64Vector = new this.sec.Float64Vector();
		this.copyRawDataTo(result, 0, false);
		return result;
	}

	public set rawData(v: Float64Vector) {
		this.copyRawDataFrom(v, 0, false);
	}

	public get position(): Vector3D {
		return new (<SecurityDomain> this.sec).flash.geom.Vector3D(this._adaptee.position);
	}

	public set position(pos: Vector3D) {
		this.copyColumnFrom(3, pos);
	}

	public get determinant(): number {
		return this._adaptee.determinant;
	}

	public clone(): Matrix3D {
		return new (<SecurityDomain> this.sec).flash.geom.Matrix3D(this._adaptee.clone());
	}

	public copyToMatrix3D(dest: Matrix3D): void {
		this._adaptee.copyTo(dest.adaptee);
	}

	public append(lhs: Matrix3D): void {
		this._adaptee.append(lhs.adaptee);
	}

	public prepend(rhs: Matrix3D): void {
		this._adaptee.prepend(rhs.adaptee);
	}

	public invert(): boolean {
		return this._adaptee.invert();
	}

	public identity(): void {
		this._adaptee.identity();
	}

	public decompose(orientationStyle: string = 'eulerAngles'): GenericVector {
		const array = this._adaptee.decompose(axCoerceString(orientationStyle));

		const v = new (<SecurityDomain> this.sec).ObjectVector(3, true);

		for (let i = 0; i < 3; i++)
			v.axSetNumericProperty(i, new (<SecurityDomain> this.sec).flash.geom.Vector3D(array[i]));

		return v;
	}

	public recompose(components: GenericVector, orientationStyle: string = 'eulerAngles'): boolean {
		// RUFFLE - unlike in OpenFL, we continue on even if some of the 'scale' components are 0
		if (components.length < 3) {
			return false;
		}

		if (!(orientationStyle == Orientation3D.AXIS_ANGLE || orientationStyle == Orientation3D.EULER_ANGLES || orientationStyle == Orientation3D.QUATERNION)) {
			this.sec.throwError("flash.geom.Matrix3D", Errors.Matrix3DDecomposeTypeInvalid, orientationStyle);
		}

		let awayComponets: Array<AwayVector3D> = new Array<AwayVector3D>(3);

		for (let i = 0; i < 3; i++)
			awayComponets[i] = components.axGetNumericProperty(i).adaptee;

		if (orientationStyle == Orientation3D.QUATERNION) {
			// Flash throws exceptions from 'recompose' certain values of 'components',
			// which we need to reproduce. See the 'matrix3d_compose' test
			somewhatImplemented("public flash.geom.Matrix3D::recompose with Orientation3D.QUATERNION");
		}

		this.adaptee.identity();

		let _rawData = this.adaptee._rawData;

		var scale = [];
		scale[0] = scale[1] = scale[2] = awayComponets[2].x;
		scale[4] = scale[5] = scale[6] = awayComponets[2].y;
		scale[8] = scale[9] = scale[10] = awayComponets[2].z;

		switch (orientationStyle) {
			case Orientation3D.EULER_ANGLES:
				var cx = Math.cos(awayComponets[1].x);
				var cy = Math.cos(awayComponets[1].y);
				var cz = Math.cos(awayComponets[1].z);
				var sx = Math.sin(awayComponets[1].x);
				var sy = Math.sin(awayComponets[1].y);
				var sz = Math.sin(awayComponets[1].z);

				_rawData[0] = cy * cz * scale[0];
				_rawData[1] = cy * sz * scale[1];
				_rawData[2] = -sy * scale[2];
				_rawData[3] = 0;
				_rawData[4] = (sx * sy * cz - cx * sz) * scale[4];
				_rawData[5] = (sx * sy * sz + cx * cz) * scale[5];
				_rawData[6] = sx * cy * scale[6];
				_rawData[7] = 0;
				_rawData[8] = (cx * sy * cz + sx * sz) * scale[8];
				_rawData[9] = (cx * sy * sz - sx * cz) * scale[9];
				_rawData[10] = cx * cy * scale[10];
				_rawData[11] = 0;
				_rawData[12] = awayComponets[0].x;
				_rawData[13] = awayComponets[0].y;
				_rawData[14] = awayComponets[0].z;
				_rawData[15] = 1;
				break;

			default:
				var x = awayComponets[1].x;
				var y = awayComponets[1].y;
				var z = awayComponets[1].z;
				var w = awayComponets[1].w;

				if (orientationStyle == Orientation3D.AXIS_ANGLE) {
					x *= Math.sin(w / 2);
					y *= Math.sin(w / 2);
					z *= Math.sin(w / 2);
					w = Math.cos(w / 2);
				}

				_rawData[0] = (1 - 2 * y * y - 2 * z * z) * scale[0];
				_rawData[1] = (2 * x * y + 2 * w * z) * scale[1];
				_rawData[2] = (2 * x * z - 2 * w * y) * scale[2];
				_rawData[3] = 0;
				_rawData[4] = (2 * x * y - 2 * w * z) * scale[4];
				_rawData[5] = (1 - 2 * x * x - 2 * z * z) * scale[5];
				_rawData[6] = (2 * y * z + 2 * w * x) * scale[6];
				_rawData[7] = 0;
				_rawData[8] = (2 * x * z + 2 * w * y) * scale[8];
				_rawData[9] = (2 * y * z - 2 * w * x) * scale[9];
				_rawData[10] = (1 - 2 * x * x - 2 * y * y) * scale[10];
				_rawData[11] = 0;
				_rawData[12] = awayComponets[0].x;
				_rawData[13] = awayComponets[0].y;
				_rawData[14] = awayComponets[0].z;
				_rawData[15] = 1;
		}

		if (awayComponets[2].x == 0) {
			_rawData[0] = 1e-15;
		}

		if (awayComponets[2].y == 0) {
			_rawData[5] = 1e-15;
		}

		if (awayComponets[2].z == 0) {
			_rawData[10] = 1e-15;
		}

		return !(awayComponets[2].x == 0 || awayComponets[2].y == 0 || awayComponets[2].y == 0);
	}

	public appendTranslation(x: number, y: number, z: number): void {
		this._adaptee.appendTranslation(+x, +y, +z);
	}

	public appendRotation(degrees: number, axis: Vector3D, pivotPoint: Vector3D = null): void {
		release || somewhatImplemented('public flash.geom.Matrix3D::appendRotation');

		this._adaptee.appendRotation(+degrees, axis.adaptee);
	}

	public appendScale(xScale: number, yScale: number, zScale: number): void {
		this._adaptee.appendScale(+xScale, +yScale, +zScale);
	}

	public prependTranslation(x: number, y: number, z: number): void {
		this._adaptee.prependTranslation(+x, +y, +z);
	}

	public prependRotation(degrees: number, axis: Vector3D, pivotPoint: Vector3D = null): void {
		release || somewhatImplemented('public flash.geom.Matrix3D::prependRotation');

		this._adaptee.prependRotation(+degrees, axis.adaptee);
	}

	public prependScale(xScale: number, yScale: number, zScale: number): void {
		this._adaptee.prependScale(+xScale, +yScale, +zScale);
	}

	public transformVector(v: Vector3D): Vector3D {
		return new (<SecurityDomain> this.sec).flash.geom.Vector3D(this._adaptee.transformVector(v.adaptee));
	}

	public deltaTransformVector(v: Vector3D): Vector3D {
		return new (<SecurityDomain> this.sec).flash.geom.Vector3D(this._adaptee.deltaTransformVector(v.adaptee));
	}

	public transformVectors(vin: Float64Vector, vout: Float64Vector): void {
		const m: Float32Array = this._adaptee._rawData;
		const m11 = m[0], m12 = m[4], m13 = m[8 ], m14 = m[12],
			m21 = m[1], m22 = m[5], m23 = m[9 ], m24 = m[13],
			m31 = m[2], m32 = m[6], m33 = m[10], m34 = m[14];

		for (let i = 0; i < vin.length - 2; i += 3) {
			const x = vin.axGetNumericProperty(i),
				y = vin.axGetNumericProperty(i + 1),
				z = vin.axGetNumericProperty(i + 2);
			vout.push(m11 * x + m12 * y + m13 * z + m14);
			vout.push(m21 * x + m22 * y + m23 * z + m24);
			vout.push(m31 * x + m32 * y + m33 * z + m34);
		}
	}

	public transpose(): void {
		this._adaptee.transpose();
	}

	public pointAt(pos: Vector3D, at: Vector3D = null, up: Vector3D = null): void {
		release || notImplemented('public flash.geom.Matrix3D::pointAt'); return;
	}

	public interpolateTo(toMat: Matrix3D, percent: number): void {
		percent = +percent;
		release || notImplemented('public flash.geom.Matrix3D::interpolateTo'); return;
	}

	public copyFrom(sourceMatrix3D: Matrix3D): void {
		this._adaptee.copyFrom(sourceMatrix3D.adaptee);
	}

	public copyRawDataTo(vector: Float64Vector, index: number /*uint*/ = 0, transpose: boolean = false): void {
		index = index >>> 0; transpose = !!transpose;
		const m: Float32Array = this._adaptee._rawData;
		if (transpose) {
			for (let i = 0, j = index | 0; i < 16; i++, j++) {
				vector.axSetNumericProperty(j, m[transposeTransform[i]]);
			}
		} else {
			for (let i = 0, j = index | 0; i < 16; i++, j++) {
				vector.axSetNumericProperty(j, m[i]);
			}
		}
	}

	public copyRawDataFrom(vector: Float64Vector, index: number /*uint*/ = 0, transpose: boolean = false): void {
		index = index >>> 0; transpose = !!transpose;
		const m = this._adaptee._rawData;
		if (transpose) {
			for (let i = 0, j = index | 0; i < 16; i++, j++) {
				m[transposeTransform[i]] = vector.axGetNumericProperty(j) || 0; // removing NaN
			}
		} else {
			for (let i = 0, j = index | 0; i < 16; i++, j++) {
				m[i] = vector.axGetNumericProperty(j) || 0; // removing NaN
			}
		}
	}

	public copyRowTo(row: number /*uint*/, vector3D: Vector3D): void {
		this._adaptee.copyRowTo(row >>> 0, vector3D.adaptee);
	}

	public copyColumnTo(column: number /*uint*/, vector3D: Vector3D): void {
		this._adaptee.copyColumnTo(column >>> 0, vector3D.adaptee);
	}

	public copyRowFrom(row: number /*uint*/, vector3D: Vector3D): void {
		this._adaptee.copyRowFrom(row >>> 0, vector3D.adaptee);
	}

	public copyColumnFrom(column: number /*uint*/, vector3D: Vector3D): void {
		this._adaptee.copyColumnFrom(column >>> 0, vector3D.adaptee);
	}
}
