import { EventDispatcher } from '../events/EventDispatcher';
import { GameInputControl } from './GameInputControl';
import { GenericVector, ByteArray } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';

// Class: GameInputDevice
export class GameInputDevice extends EventDispatcher {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	static MAX_BUFFER_SIZE: number /*int*/ = 4800;

	// _numControls: number /*int*/;
	// _sampleInterval: number /*int*/;
	// _enabled: boolean;
	// _id: string;
	// _name: string;
	public get numControls(): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputDevice', 'get numControls', '');
		return 0;
	}

	public get sampleInterval(): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputDevice', 'get sampleInterval', '');
		return;
		// return this._sampleInterval;
	}

	public set sampleInterval(val: number /*int*/) {
		val = val | 0;
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputDevice', 'set sampleInterval', '');
		// this._sampleInterval = val;
	}

	public get enabled(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputDevice', 'get enabled', '');
		// return this._enabled;
		return true;
	}

	public set enabled(val: boolean) {
		val = !!val;
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputDevice', 'set enabled', '');
		// this._enabled = val;
	}

	public get id(): string {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputDevice', 'get id', '');
		return '';
		// return this._id;
	}

	public get name(): string {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputDevice', 'get name', '');
		return '';
		// return this._name;
	}

	public getControlAt(i: number /*int*/): GameInputControl {
		i = i | 0;
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputDevice', 'getControlAt', '');
		return null;
	}

	public startCachingSamples(numSamples: number /*int*/, controls: GenericVector): void {
		numSamples = numSamples | 0;
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputDevice', 'startCachingSamples', '');
		return;
	}

	public stopCachingSamples(): void {
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputDevice', 'stopCachingSamples', '');
		return;
	}

	public getCachedSamples(data: ByteArray, append: boolean = false): number /*int*/ {
		append = !!append;
		// @todo
		Debug.throwPIR('playerglobals/ui/GameInputDevice', 'getCachedSamples', '');
		return 0;
	}
}