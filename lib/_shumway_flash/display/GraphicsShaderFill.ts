import { ASObject } from '@awayfl/avm2';
import { Matrix } from '../geom/Matrix';
import { IGraphicsData, IGraphicsFill } from './interfaces';
import { Shader } from './Shader';

export class GraphicsShaderFill extends ASObject implements IGraphicsFill, IGraphicsData {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // ["shader", "matrix"];

	constructor (shader: Shader = null, matrix: Matrix = null) {
		super();
		this.shader = shader;
		this.matrix = matrix;
	}

	// JS -> AS Bindings

	public shader: Shader;
	public matrix: Matrix;

	// AS -> JS Bindings

}