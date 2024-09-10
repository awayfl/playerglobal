import { ASObject, Uint32Vector } from '@awayfl/avm2';
import { IContextGL, IIndexBuffer } from '@awayjs/stage';

export class IndexBuffer3D extends ASObject {
	static classInitializer = null;

	static axClass: typeof IndexBuffer3D;

	public _adaptee: IIndexBuffer

	constructor(context: IContextGL, numIndices: number) {
		super();
		this._adaptee = context.createIndexBuffer(numIndices);
	}

	public uploadFromVector(data: Uint32Vector, startOffset: number, count: number): void {
		const uint16ArrayData = new Uint16Array(data.length);
		for(var i:number = 0; i < data.length; i++) {
			data[i] = uint16ArrayData[i];
		}
		this._adaptee.uploadFromArray(uint16ArrayData, startOffset, count);
	}

}