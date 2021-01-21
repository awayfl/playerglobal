import { EventDispatcher } from '../../events/EventDispatcher';

export class Geolocation extends EventDispatcher {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string[] = null; // [];

	constructor() {
		super();
	}

	// static _isSupported: boolean;
	get isSupported(): boolean {
		return false;
		// return this._isSupported;
	}

	// _muted: boolean;
	get muted(): boolean {
		return false;
		// return this._muted;
	}

	setRequestedUpdateInterval(interval: number): void {
		interval = +interval;
	}
}
