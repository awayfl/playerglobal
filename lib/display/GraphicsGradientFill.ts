import { ASArray, ASObject, axCoerceString } from '@awayfl/avm2';
import { Matrix } from '../geom/Matrix';
import { IGraphicsData, IGraphicsFill } from './IGraphicsData';

export class GraphicsGradientFill extends ASObject implements IGraphicsFill, IGraphicsData {

	public static classInitializer: any = null;

	// AS3 declares these as public vars (slots) or AS3 accessors, so their values live
	// under the AS3 public names. linkClass maps each listed TS name onto that AS3
	// property, so TS code can use item.colors etc. directly.
	public static instanceSymbols: string[] = [
		'colors!', 'alphas!', 'ratios!', 'matrix!', 'focalPointRatio!',
		'type!', 'spreadMethod!', 'interpolationMethod!'];

	public colors: ASArray;
	public alphas: ASArray;
	public ratios: ASArray;
	public matrix: Matrix;
	public focalPointRatio: number;
	public type: string;
	public spreadMethod: any;
	public interpolationMethod: string;

	constructor(type: string = 'linear', colors: ASArray = null, alphas: ASArray = null,
		ratios: ASArray = null, matrix: any = null, spreadMethod: any = 'pad',
		interpolationMethod: string = 'rgb', focalPointRatio: number = 0) {
		super();
		this.type = axCoerceString(type);
		this.colors = colors;
		this.alphas = alphas;
		this.ratios = ratios;
		this.matrix = matrix;
		this.spreadMethod = spreadMethod;
		this.interpolationMethod = axCoerceString(interpolationMethod);
		this.focalPointRatio = +focalPointRatio;
	}
}
