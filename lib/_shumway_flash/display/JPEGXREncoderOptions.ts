import { ASObject, axCoerceString } from '@awayfl/avm2';

export class JPEGXREncoderOptions extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // ["quantization", "colorSpace", "trimFlexBits"];

	constructor (quantization: number /*uint*/ = 20, colorSpace: string = 'auto', trimFlexBits: number /*uint*/ = 0) {
		super();
		this.quantization = quantization >>> 0;
		this.colorSpace = axCoerceString(colorSpace);
		this.trimFlexBits = trimFlexBits >>> 0;
	}

	public quantization: number /*uint*/;
	public colorSpace: string;
	public trimFlexBits: number /*uint*/;
}