import { ASObject, axCoerceString } from '@awayfl/avm2';

export class GraphicsTrianglePath extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null;

	constructor (
		vertices: any/*Float64Vector*/ = null,
		indices: any/*Int32Vector*/ = null,
		uvtData: any/*Float64Vector*/ = null,
		culling: string = 'none') {
		super();
		// TODO: coerce to vector types
		this.vertices = vertices;
		this.indices = indices;
		this.uvtData = uvtData;
		this.culling = axCoerceString(culling);
	}

	// JS -> AS Bindings

	public indices: any/*Int32Vector*/;
	public vertices: any/*Float64Vector*/;
	public uvtData: any/*Float64Vector*/;
	public _culling: string;
	public culling: string;

	// AS -> JS Bindings

	// _culling: string;
}
