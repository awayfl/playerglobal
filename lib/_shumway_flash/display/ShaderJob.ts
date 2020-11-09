
import { Shader } from './Shader';
import { EventDispatcher } from '../events/EventDispatcher';
import { ASObject } from '@awayfl/avm2';

export class ShaderJob extends EventDispatcher {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor (shader: Shader = null,
		target: ASObject = null,
		width: number /*int*/ = 0,
		height: number /*int*/ = 0) {
		super();
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

	// _shader: flash.display.Shader;
	// _target: ASObject;
	// _width: number /*int*/;
	// _height: number /*int*/;
	// _progress: number;
	public get shader(): Shader {
		console.warn('[playerglobal/display/ShaderJob] - get shader not implemented');
		return null;
	}

	public set shader(s: Shader) {
		console.warn('[playerglobal/display/ShaderJob] - set shader not implemented');
	}

	public get target(): ASObject {
		console.warn('[playerglobal/display/ShaderJob] - get target not implemented');
		return null;
	}

	public set target(s: ASObject) {
		console.warn('[playerglobal/display/ShaderJob] - set target not implemented');
	}

	public get width(): number /*int*/ {
		console.warn('[playerglobal/display/ShaderJob] - get width not implemented');
		return null;
	}

	public set width(v: number /*int*/) {
		console.warn('[playerglobal/display/ShaderJob] - set width not implemented');
	}

	public get height(): number /*int*/ {
		console.warn('[playerglobal/display/ShaderJob] - get height not implemented');
		return null;
	}

	public set height(v: number /*int*/) {
		console.warn('[playerglobal/display/ShaderJob] - get height not implemented');
	}

	public get progress(): number {
		console.warn('[playerglobal/display/ShaderJob] - get progress not implemented');
		return null;
	}

	public start(waitForCompletion: boolean = false): void {
		console.warn('[playerglobal/display/ShaderJob] - start not implemented');
	}

	public cancel(): void {
		console.warn('[playerglobal/display/ShaderJob] - cancel not implemented');
	}
}