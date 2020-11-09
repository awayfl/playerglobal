import { ASObject, ByteArray } from '@awayfl/avm2';
import { ShaderData } from './ShaderData';
export class Shader extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // ["byteCode"];

	constructor (byteCode: ByteArray = null) {
		super();
		// TODO: coerce
		this.byteCode = byteCode;
	}

	// JS -> AS Bindings

	public byteCode: ByteArray;

	// AS -> JS Bindings

	// _byteCode: flash.utils.ByteArray;
	// _data: flash.display.ShaderData;
	// _precisionHint: string;
	public get data(): ShaderData {
		console.warn('[playerglobal/display/Shader] - get data not implemented');
		return null;
	}

	public set data(p: ShaderData) {
		console.warn('[playerglobal/display/Shader] - set data not implemented');
	}

	public get precisionHint(): string {
		console.warn('[playerglobal/display/Shader] - get precisionHint not implemented');
		return null;
	}

	public set precisionHint(p: string) {
		console.warn('[playerglobal/display/Shader] - set precisionHint not implemented');
	}
}