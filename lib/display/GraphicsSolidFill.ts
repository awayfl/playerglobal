import { ASObject } from '@awayfl/avm2';
import { IGraphicsFill, IGraphicsData } from './IGraphicsData';

export class GraphicsSolidFill extends ASObject implements IGraphicsFill, IGraphicsData {

	public static classInitializer: any = null;

	// AS3 declares these as public vars (slots), so their values live under the
	// AS3 public names. linkClass maps each listed TS name onto that slot, so TS
	// code can use item.color etc. directly.
	public static instanceSymbols: string[] = ['color!', 'alpha!'];

	public color: number /*uint*/;
	public alpha: number;

	constructor(color: number /*uint*/ = 0, alpha: number = 1) {
		super();
		this.color = color >>> 0;
		this.alpha = +alpha;
	}
}
