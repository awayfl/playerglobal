import { EventDispatcher } from '../../events/EventDispatcher';

export class Accelerometer extends EventDispatcher {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string[] = null; // [];

	constructor() {
		super();
	}

	// JS -> AS Bindings

	// AS -> JS Bindings
	// static _isSupported: boolean;
	get isSupported(): boolean {
		return false;
		// return this._isSupported;
	}

	// _muted: boolean;
	get muted(): boolean {
		return false;
	}

	setRequestedUpdateInterval(interval: number): void {
		interval = +interval;
	}
}
