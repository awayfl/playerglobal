import { ASObject } from '@awayfl/avm2';
import { Matrix } from '../geom/Matrix';
import { BitmapData } from './BitmapData';
import { IGraphicsData, IGraphicsFill } from './IGraphicsData';

export class GraphicsBitmapFill extends ASObject implements IGraphicsFill, IGraphicsData {

	// The bytecode constructor in playerglobal.abcs never assigns its arguments,
	// so run this TS constructor for AS3 `new GraphicsBitmapFill(...)` instead.
	public static forceNativeConstructor: boolean = true;

	public static classInitializer: any = null;

	// AS3 declares these as public vars (slots), so their values live under the
	// AS3 public names. linkClass maps each listed TS name onto that slot, so the
	// constructor below and TS readers share the slot storage.
	public static instanceSymbols: string[] = ['bitmapData!', 'matrix!', 'repeat!', 'smooth!'];

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
