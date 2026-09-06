import { ASObject, axCoerceString } from '@awayfl/avm2';
import { IGraphicsData, IGraphicsPath } from './IGraphicsData';

export class GraphicsTrianglePath extends ASObject implements IGraphicsData, IGraphicsPath {

	public static classInitializer: any = null;

	public indices: any/*Int32Vector*/;
	public vertices: any/*Float64Vector*/;
	public uvtData: any/*Float64Vector*/;
	public culling: string;

	constructor(
		vertices: any/*Float64Vector*/ = null,
		indices: any/*Int32Vector*/ = null,
		uvtData: any/*Float64Vector*/ = null,
		culling: string = 'none') {
		super();
		this.vertices = vertices;
		this.indices = indices;
		this.uvtData = uvtData;
		this.culling = axCoerceString(culling);
	}
}
