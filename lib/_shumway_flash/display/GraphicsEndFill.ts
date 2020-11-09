import { ASObject } from '@awayfl/avm2';
import { IGraphicsData, IGraphicsFill } from './interfaces';

export class GraphicsEndFill extends ASObject implements IGraphicsFill, IGraphicsData {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

}
