import { ASObject } from "@awayfl/avm2";
import { IContextGL, IVertexBuffer, VertexBufferWebGL } from "@awayjs/stage";

export class VertexBuffer3D extends ASObject {
    public _adaptee:IVertexBuffer

    static classInitializer = null;

	static axClass: typeof VertexBuffer3D;
    
    constructor(context:IContextGL, numVertices, dataPerVertex) {
        super()
        this._adaptee = context.createVertexBuffer(numVertices, dataPerVertex)
    }

    public uploadFromVector(data:Array<number>, startVertex:number, numVertices){
        var dataFloat32Array:Float32Array = new Float32Array(data)
        this._adaptee.uploadFromArray(dataFloat32Array, startVertex, numVertices)
    }
}