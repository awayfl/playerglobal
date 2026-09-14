import { ASObject, axCoerceString } from '@awayfl/avm2';
import { IGraphicsData, IGraphicsFill, IGraphicsStroke } from './IGraphicsData';

export class GraphicsStroke extends ASObject implements IGraphicsData, IGraphicsStroke {

	public static classInitializer: any = null;

	public thickness: number;
	public pixelHinting: boolean;
	public miterLimit: number;
	public fill: IGraphicsFill;
	public scaleMode: string;
	public caps: string;
	public joints: string;

	constructor(
		thickness: number = NaN,
		pixelHinting: boolean = false,
		scaleMode: string = 'normal',
		caps: string = 'none',
		joints: string = 'round',
		miterLimit: number = 3,
		fill: IGraphicsFill = null) {
		super();
		this.thickness = +thickness;
		this.pixelHinting = !!pixelHinting;
		this.scaleMode = axCoerceString(scaleMode);
		this.caps = axCoerceString(caps);
		this.joints = axCoerceString(joints);
		this.miterLimit = +miterLimit;
		this.fill = fill;
	}
}
