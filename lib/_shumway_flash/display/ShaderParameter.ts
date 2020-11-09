import { ASArray, ASObject } from '@awayfl/avm2';

export class ShaderParameter extends ASObject {

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

	// _value: any [];
	// _type: string;
	// _index: number /*int*/;
	public get value(): ASArray {
		console.warn('[playerglobal/display/ShaderParameter] - get value not implemented');
		return null;
	}

	public set value(v: ASArray) {
		console.warn('[playerglobal/display/ShaderParameter] - set value not implemented');
	}

	public get type(): string {
		console.warn('[playerglobal/display/ShaderParameter] - get type not implemented');
		return null;
	}

	public get index(): number /*int*/ {
		console.warn('[playerglobal/display/ShaderParameter] - get index not implemented');
		return null;
	}
}