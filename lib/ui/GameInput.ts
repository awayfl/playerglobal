import { EventDispatcher } from '../events/EventDispatcher';
import { GameInputDevice } from './GameInputDevice';
import { Errors } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';

// Class: GameInput
export class GameInput extends EventDispatcher {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super(undefined);
	}

	// JS -> AS Bindings

	// AS -> JS Bindings
	// static _numDevices: number /*int*/;
	// static _isSupported: boolean;
	static get numDevices(): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInput', 'static get numDevices', '');
		return 0;
		// return this._numDevices;
	}

	static get isSupported(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInput', 'static get isSupported', '');
		return false;
	}

	static getDeviceAt(index: number /*int*/): GameInputDevice {
		index = index | 0;

		// @todo
		Debug.throwPIR('playerglobals/ui/GameInput', 'static getDeviceAt', '');
		this.sec.throwError('RangeError', Errors.ParamRangeError, 'index');
		return null;
	}

}