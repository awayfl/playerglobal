import { Context3D } from '../../display3D/Context3D';
import { EventDispatcher } from '../../events/EventDispatcher';

export class Stage3D extends EventDispatcher {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // [];

	constructor() {
		super();
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

	// _context3D: flash.display3D.Context3D;
	// _x: number;
	// _y: number;
	// _visible: boolean;
	public get context3D(): Context3D {
		console.warn('[playerglobal/display/Stage3D] - get context3D not implemented');
		return null;
	}

	public get x(): number {
		console.warn('[playerglobal/display/Stage3D] - get x not implemented');
		return null;
	}

	public set x(value: number) {
		value = +value;
		console.warn('[playerglobal/display/Stage3D] - set x not implemented');
	}

	public get y(): number {
		console.warn('[playerglobal/display/Stage3D] - get y not implemented');
		return null;
	}

	public set y(value: number) {
		value = +value;
		console.warn('[playerglobal/display/Stage3D] - set y not implemented');
	}

	public get visible(): boolean {
		console.warn('[playerglobal/display/Stage3D] - get visible not implemented');
		return null;
	}

	public set visible(value: boolean) {
		console.warn('[playerglobal/display/Stage3D] - set visible not implemented');
	}

	public requestContext3D(context3DRenderMode: string = 'auto', profile: string = 'baseline'): void {
		console.warn('[playerglobal/display/Stage3D] - requestContext3D not implemented');
	}
}
