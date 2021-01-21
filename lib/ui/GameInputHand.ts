import { ASObject } from '@awayfl/avm2';

// Class: GameInputHand
export class GameInputHand extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	static RIGHT: string = 'right';
	static LEFT: string = 'left';
	static UNKNOWN: string = 'unknown';
}