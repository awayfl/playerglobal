import { release, notImplemented } from '@awayfl/swf-loader';
import { Float64Vector } from '@awayfl/avm2';
import { Vector3D } from './Vector3D';
import { Matrix3D } from './Matrix3D';
import { ASObject } from '@awayfl/avm2';
export class Utils3D extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// AS -> JS Bindings
	static projectVector(m: Matrix3D, v: Vector3D): Vector3D {
		Matrix3D;
		release || notImplemented('public flash.geom.Utils3D::static projectVector'); return;
	}

	static projectVectors(m: Matrix3D, verts: Float64Vector, projectedVerts: Float64Vector, uvts: Float64Vector): void {
		release || notImplemented('public flash.geom.Utils3D::static projectVectors'); return;
	}

	static pointTowards(percent: number, mat: Matrix3D, pos: Vector3D,
		at: Vector3D = null, up: Vector3D = null): Matrix3D {
		percent = +percent;
		release || notImplemented('public flash.geom.Utils3D::static pointTowards'); return;
	}
}