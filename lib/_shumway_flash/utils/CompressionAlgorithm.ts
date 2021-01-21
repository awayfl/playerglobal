import { ASObject } from '@awayfl/avm2';
export class CompressionAlgorithm extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	static ZLIB: string = 'zlib';
	static DEFLATE: string = 'deflate';
	static LZMA: string = 'lzma';
}