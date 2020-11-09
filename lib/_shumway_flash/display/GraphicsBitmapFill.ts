import { ASObject } from '@awayfl/avm2';
import { Matrix } from '../geom/Matrix';
import { BitmapData } from './BitmapData';
import { IGraphicsData, IGraphicsFill } from './interfaces';

export class GraphicsBitmapFill extends ASObject implements IGraphicsFill, IGraphicsData {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // ["bitmapData", "matrix", "repeat", "smooth"];

	constructor (bitmapData: BitmapData = null,
		matrix: Matrix = null, repeat: boolean = true, smooth: boolean = false) {
		super();
		this.bitmapData = bitmapData;
		this.matrix = matrix;
		this.repeat = !!repeat;
		this.smooth = !!smooth;
	}

	// JS -> AS Bindings

	public bitmapData: BitmapData;
	public matrix: Matrix;
	public repeat: boolean;
	public smooth: boolean;

	// AS -> JS Bindings

}
