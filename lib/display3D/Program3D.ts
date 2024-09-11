import { ASObject } from '@awayfl/avm2';
import { ByteArray as AwayByteArray } from '@awayjs/core';
import { IContextGL, IProgram } from '@awayjs/stage';
import { ByteArray } from '../utils/ByteArray';

export class Program3D extends ASObject {

	static classInitializer: any = null;
	static classSymbols: string [] = null; // [];
	static instanceSymbols: string [] = null;

	public _adaptee: IProgram

	constructor(context: IContextGL) {
		super();
		this._adaptee = context.createProgram();

	}

	public dispose() {
		this._adaptee.dispose();
	}

	public upload(vertexProgram: ByteArray, fragmentProgram: ByteArray): void {
		AwayByteArray;
		this._adaptee.upload(vertexProgram, fragmentProgram);
	}
}