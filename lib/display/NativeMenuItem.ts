import { Debug } from '@awayjs/core';
import { EventDispatcher } from '../events/EventDispatcher';

// Class: NativeMenuItem
export class NativeMenuItem extends EventDispatcher {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
		this._enabled = true;
	}

	protected _enabled: boolean;
	public get enabled(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/display/NativeMenuItem', 'get enabled', '');
		return this._enabled;
	}

	public set enabled(isSeparator: boolean) {
		isSeparator = !!isSeparator;
		// @todo
		Debug.throwPIR('playerglobals/display/NativeMenuItem', 'set enabled', '');
		this._enabled = isSeparator;
	}
}