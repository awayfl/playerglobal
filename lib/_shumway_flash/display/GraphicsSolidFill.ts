import { ASObject } from '@awayfl/avm2';
import { IGraphicsFill, IGraphicsData } from './interfaces';

export class GraphicsSolidFill extends ASObject implements IGraphicsFill, IGraphicsData {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // ["color", "alpha"];

	constructor (color: number /*uint*/ = 0, alpha: number = 1) {
		super();
		this.color = color >>> 0;
		this.alpha = +alpha;
	}

	// JS -> AS Bindings

	public color: number /*uint*/;
	public alpha: number;

	// AS -> JS Bindings

}
