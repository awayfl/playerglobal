import { ASObject } from '@awayfl/avm2';
import { IGraphicsFill, IGraphicsData } from './IGraphicsData';

export class GraphicsSolidFill extends ASObject implements IGraphicsFill, IGraphicsData {

	public static classInitializer: any = null;

	public color: number /*uint*/;
	public alpha: number;

	constructor(color: number /*uint*/ = 0, alpha: number = 1) {
		super();
		this.color = color >>> 0;
		this.alpha = +alpha;
	}
}
