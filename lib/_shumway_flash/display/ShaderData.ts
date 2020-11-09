import { ASObject, ByteArray } from '@awayfl/avm2';

export class ShaderData extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor (byteCode: ByteArray) {
		super();
		this.byteCode = byteCode;
	}

	public byteCode: ByteArray;
}