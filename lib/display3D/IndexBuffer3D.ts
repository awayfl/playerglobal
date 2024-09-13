import { ASObject, AXClass, Uint32Vector } from '@awayfl/avm2';
import { Debug } from '@awayfl/swf-loader';
import { ByteArray } from '../utils/ByteArray'
import { IContextGL, IIndexBuffer } from '@awayjs/stage';
import { Context3D } from './Context3D';

export class IndexBuffer3D extends ASObject {
	static axClass: typeof IndexBuffer3D & AXClass;
	static classInitializer: any = null;
	static classSymbols: string [] = null; // [];
	static instanceSymbols: string [] = null;

	public _adaptee: IIndexBuffer

	constructor(context3D: Context3D, numIndices: number) {
		super();
		this._adaptee = context3D.adaptee.context.createIndexBuffer(numIndices);
	}

	public uploadFromVector(data: Uint32Vector, startOffset: number, count: number): void {
		let uint16ArrayData = new Uint16Array(data.length);
		for (let i: number = 0; i < data.length; i++) {
			uint16ArrayData[i] = data.axGetNumericProperty(i);;
		}
		console.log(uint16ArrayData)
		this._adaptee.uploadFromArray(uint16ArrayData, startOffset, count);
	}

	public uploadFromByteArray(data: ByteArray, byteArrayOffset: number /*int*/, startOffset: number /*int*/, count: number /*int*/): void {
		Debug.notImplemented('public flash.display3D.IndexBuffer3D::uploadFromByteArray'); return;
	}

	public dispose(): void {
		this._adaptee.dispose()
	}

}