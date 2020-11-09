import { ASArray, ASObject, axCoerceString } from '@awayfl/avm2';
import { Matrix } from '../geom/Matrix';
import { IGraphicsData, IGraphicsFill } from './interfaces';

export class GraphicsGradientFill extends ASObject implements IGraphicsFill, IGraphicsData {

	public static classInitializer: any = null;

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

	public colors: ASArray;
	public alphas: ASArray;
	public ratios: ASArray;
	public matrix: Matrix;
	public focalPointRatio: number;
	public type: string;
	public spreadMethod: any;
	public interpolationMethod: string;
}
