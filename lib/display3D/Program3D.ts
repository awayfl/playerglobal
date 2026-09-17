import { ASObject, AXClass } from '@awayfl/avm2';
import { IContextGL, IProgram } from '@awayjs/stage';
import { ByteArray } from '../utils/ByteArray';
import { Context3D } from './Context3D';

export class Program3D extends ASObject {
	static axClass: typeof Program3D & AXClass;
	static classInitializer: any = null;
	static classSymbols: string [] = null; // [];
	static instanceSymbols: string [] = null;

	public _adaptee: IProgram
	private _context: IContextGL

	constructor(context3D: Context3D) {
		super();
		this._context = context3D.adaptee.context;
		this._adaptee = context3D.adaptee.context.createProgram();
	}

	public dispose() {
		this._adaptee.dispose();
	}

	public upload(vertexProgram: ByteArray, fragmentProgram: ByteArray): void {
		this._adaptee.upload(vertexProgram, fragmentProgram);
	}
}