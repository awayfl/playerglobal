import { ASObject } from "@awayfl/avm2";
import { IContextGL, IIndexBuffer } from "@awayjs/stage";

export class IndexBuffer3D extends ASObject {
    static classInitializer = null;

	static axClass: typeof IndexBuffer3D;

    public _adaptee:IIndexBuffer

    constructor(context: IContextGL, numIndices: number) {
        super()
        this._adaptee = context.createIndexBuffer(numIndices)
    }

    public uploadFromVector(data:Array<number>, startOffset:number, count:number):void{
        var uint16ArrayData = new Uint16Array(data)
        this._adaptee.uploadFromArray(uint16ArrayData, startOffset, count)
    }
    
}