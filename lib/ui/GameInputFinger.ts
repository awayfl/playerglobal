import { ASObject } from '@awayfl/avm2';

// Class: GameInputFinger
export class GameInputFinger extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	static THUMB: string = 'thumb';
	static INDEX: string = 'index';
	static MIDDLE: string = 'middle';
	static UNKNOWN: string = 'unknown';
}