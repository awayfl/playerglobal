import { ASObject, AXClass } from '@awayfl/avm2';
import { ByteArray  as AwayByteArray } from '@awayjs/core';
import { IContextGL, IProgram, ProgramWebGL } from '@awayjs/stage';
import { ByteArray } from '../utils/ByteArray';
import { Context3D } from './Context3D';

export class Program3D extends ASObject {
	static axClass: typeof Program3D & AXClass;
	static classInitializer: any = null;
	static classSymbols: string [] = null; // [];
	static instanceSymbols: string [] = null;

	public _adaptee: IProgram

	constructor(context3D: Context3D) {
		super();
		this._adaptee = context3D.adaptee.context.createProgram();
	}

	public dispose() {
		this._adaptee.dispose();
	}

	public upload(vertexProgram: ByteArray, fragmentProgram: ByteArray): void {
		var awayVertexProgram:AwayByteArray = new ByteArray()
		var awayFragmentProgram:AwayByteArray = new ByteArray()
		vertexProgram.writeByteArray(awayVertexProgram)
		fragmentProgram.writeByteArray(awayFragmentProgram)
		this._adaptee.upload(awayVertexProgram, awayFragmentProgram);
	}
}