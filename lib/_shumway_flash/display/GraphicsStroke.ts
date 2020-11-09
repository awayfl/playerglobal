import { ASObject, axCoerceString } from '@awayfl/avm2';
import { IGraphicsFill } from './interfaces';

export class GraphicsStroke extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null;

	constructor (
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

	// JS -> AS Bindings

	public thickness: number;
	public pixelHinting: boolean;
	public miterLimit: number;
	public fill: IGraphicsFill;
	public scaleMode: string;
	public caps: string;
	public joints: string;

	// AS -> JS Bindings

	// _scaleMode: string;
	// _caps: string;
	// _joints: string;
}
