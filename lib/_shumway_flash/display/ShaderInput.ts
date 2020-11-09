import { ASObject } from '@awayfl/avm2';

export class ShaderInput extends ASObject {

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

	// _input: ASObject;
	// _width: number /*int*/;
	// _height: number /*int*/;
	// _channels: number /*int*/;
	// _index: number /*int*/;
	public get input(): ASObject {
		console.warn('[playerglobal/display/ShaderInput] - get input not implemented');
		return null;
	}

	public set input(input: ASObject) {
		console.warn('[playerglobal/display/ShaderInput] - set input not implemented');
	}

	public get width(): number /*int*/ {
		console.warn('[playerglobal/display/ShaderInput] - get width not implemented');
		return null;
	}

	public set width(value: number /*int*/) {
		console.warn('[playerglobal/display/ShaderInput] - set width not implemented');
	}

	public get height(): number /*int*/ {
		console.warn('[playerglobal/display/ShaderInput] - get height not implemented');
		return null;
	}

	public set height(value: number /*int*/) {
		console.warn('[playerglobal/display/ShaderInput] - set height not implemented');
	}

	public get channels(): number /*int*/ {
		console.warn('[playerglobal/display/ShaderInput] - get channels not implemented');
		return null;
	}

	public get index(): number /*int*/ {
		console.warn('[playerglobal/display/ShaderInput] - get index not implemented');
		return null;
	}
}