import { ASObject } from '@awayfl/avm2';
import { IGraphicsData, IGraphicsFill } from './IGraphicsData';

export class GraphicsEndFill extends ASObject implements IGraphicsFill, IGraphicsData {

	public static classInitializer: any = null;

	constructor() {
		super();
	}
}
