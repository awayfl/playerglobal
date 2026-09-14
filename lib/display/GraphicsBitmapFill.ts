import { ASObject } from '@awayfl/avm2';
import { Matrix } from '../geom/Matrix';
import { BitmapData } from './BitmapData';
import { IGraphicsData, IGraphicsFill } from './IGraphicsData';

export class GraphicsBitmapFill extends ASObject implements IGraphicsFill, IGraphicsData {

	public static classInitializer: any = function (this: any) {
		// playerglobal.abcs ships a bytecode ctor that never assigns the native
		// fields. AS3 `new GraphicsBitmapFill(bd, matrix, …)` then produces an
		// instance whose $BgbitmapData slot stays null. Bind the TS constructor.
		const proto = this.tPrototype || this.dPrototype;
		if (proto)
			proto.axInitializer = GraphicsBitmapFill;
	};

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
		const self = <any> this;
		self.$BgbitmapData = bitmapData;
		self.$Bgmatrix = matrix;
		self.$Bgrepeat = this.repeat;
		self.$Bgsmooth = this.smooth;
		self._nativeBitmapData = bitmapData;
		self._nativeMatrix = matrix;
		self._nativeRepeat = this.repeat;
		self._nativeSmooth = this.smooth;
	}
}
