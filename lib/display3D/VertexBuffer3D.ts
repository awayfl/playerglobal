import { ASObject, Float64Vector } from '@awayfl/avm2';
import { IContextGL, IVertexBuffer, VertexBufferWebGL } from '@awayjs/stage';

export class VertexBuffer3D extends ASObject {
	public _adaptee: IVertexBuffer

	static classInitializer = null;

	static axClass: typeof VertexBuffer3D;

	constructor(context: IContextGL, numVertices, dataPerVertex) {
		super();
		this._adaptee = context.createVertexBuffer(numVertices, dataPerVertex);
	}

	public uploadFromVector(data: Float64Vector, startVertex: number, numVertices) {
		const dataFloat32Array: Float32Array = new Float32Array(data.length);
        for(var i:number = 0; i < data.length; i++) {
            data[i] = dataFloat32Array[i];
        }
		this._adaptee.uploadFromArray(dataFloat32Array, startVertex, numVertices);
	}
}