import { IOError } from './IOError';

export class EOFError extends IOError {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor (message: string = '', id: number /*int*/ = 0) {
		super(message, id);
	}
}
