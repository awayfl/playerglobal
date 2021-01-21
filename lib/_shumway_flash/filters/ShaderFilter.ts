import { Shader } from '../display/Shader';
import { BitmapFilter } from '../../filters/BitmapFilter';

export class ShaderFilter extends BitmapFilter {

	static axClass: typeof ShaderFilter;

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null;

	constructor (shader: Shader = null) {
		super();
	}

	// JS -> AS Bindings

	leftExtension: number /*int*/;
	topExtension: number /*int*/;
	rightExtension: number /*int*/;
	bottomExtension: number /*int*/;

	// AS -> JS Bindings

	// _shader: flash.display.Shader;
	// _leftExtension: number /*int*/;
	// _topExtension: number /*int*/;
	// _rightExtension: number /*int*/;
	// _bottomExtension: number /*int*/;
	get shader(): Shader {
		return null;
		// return this._shader;
	}

	set shader(shader: Shader) {
		// this._shader = shader;
	}
}