import { ASObject } from '@awayfl/avm2';
import { Matrix } from '../geom/Matrix';
import { BitmapData } from './BitmapData';
import { IGraphicsData, IGraphicsFill } from './IGraphicsData';

export class GraphicsBitmapFill extends ASObject implements IGraphicsFill, IGraphicsData {

	public static classInitializer: any = null;

	public bitmapData: BitmapData;
	public matrix: Matrix;
	public repeat: boolean;
	public smooth: boolean;

	constructor(bitmapData: BitmapData = null,
		matrix: Matrix = null, repeat: boolean = true, smooth: boolean = false) {
		super();
		this.bitmapData = bitmapData;
		this.matrix = matrix;
		this.repeat = !!repeat;
		this.smooth = !!smooth;
	}
}
