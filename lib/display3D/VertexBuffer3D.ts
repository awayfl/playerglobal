import { ASObject, AXClass, Float64Vector } from '@awayfl/avm2';
import { Debug } from '@awayfl/swf-loader';
import { IVertexBuffer } from '@awayjs/stage';
import { ByteArray } from '../utils/ByteArray';
import { Context3D } from './Context3D';

export class VertexBuffer3D extends ASObject {
	static axClass: typeof VertexBuffer3D & AXClass;
	static classInitializer: any = null;
	static classSymbols: string [] = null; // [];
	static instanceSymbols: string [] = null;
	public _adaptee: IVertexBuffer

	constructor(context3D: Context3D, numVertices: number, data32PerVertex: number) {
		super();
		this._adaptee = context3D.adaptee.context.createVertexBuffer(numVertices, data32PerVertex * 4);
	}

	public uploadFromVector(data: Float64Vector, startVertex: number, numVertices) {
		const dataFloat32Array: Float32Array = new Float32Array(data.length);
		for (let i: number = 0; i < data.length; i++) {
			dataFloat32Array[i] = data.axGetNumericProperty(i);
		}
		this._adaptee.uploadFromArray(dataFloat32Array, startVertex, numVertices);
	}

	public uploadFromByteArray(data: ByteArray, byteArrayOffset: number /*int*/, startVertex: number /*int*/, numVertices: number /*int*/): void {
		Debug.notImplemented('public flash.display3D.VertexBuffer3D::uploadFromByteArray'); return;
	}

	public dispose(): void {
		this._adaptee.dispose();
	}
}