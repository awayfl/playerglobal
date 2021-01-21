import { EventDispatcher } from '../events/EventDispatcher';
import { GameInputDevice } from './GameInputDevice';
import { Debug } from '@awayjs/core';

// Class: GameInputControl
export class GameInputControl extends EventDispatcher {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// _numValues: number /*int*/;
	// _index: number /*int*/;
	// _relative: boolean;
	// _type: string;
	// _hand: string;
	// _finger: string;
	// _device: flash.ui.GameInputDevice;
	public get numValues(): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputControl', 'get numValues', '');
		return 0;
	}

	public get index(): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputControl', 'get index', '');
		return 0;
	}

	public get relative(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputControl', 'get relative', '');
		return true;
	}

	public get type(): string {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputControl', 'get type', '');
		return '';
	}

	public get hand(): string {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputControl', 'get hand', '');
		return '';
	}

	public get finger(): string {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputControl', 'get finger', '');
		return '';
	}

	public get device(): GameInputDevice {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputControl', 'get device', '');
		return null;
	}

	public getValueAt(index: number /*int*/ = 0): number {
		index = index | 0;
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputControl', 'getValueAt', '');
		return 0;
	}
}