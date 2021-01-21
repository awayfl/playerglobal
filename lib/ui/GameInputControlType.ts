import { ASObject } from '@awayfl/avm2';

// Class: GameInputControlType
export class GameInputControlType extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	static MOVEMENT: string = 'movement';
	static ROTATION: string = 'rotation';
	static DIRECTION: string = 'direction';
	static ACCELERATION: string = 'acceleration';
	static BUTTON: string = 'button';
	static TRIGGER: string = 'trigger';
}