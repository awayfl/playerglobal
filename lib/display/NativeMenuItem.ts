import { release, warning } from '@awayfl/swf-loader';
import { EventDispatcher } from '../events/EventDispatcher';

const partialImp =
	(obj: Object, field: string) => warning(`[Builtins] Partial implemented ${obj.constructor.name}::${field}`);

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
		release || partialImp(this, 'get enabled');
		return this._enabled;
	}

	public set enabled(isSeparator: boolean) {
		isSeparator = !!isSeparator;
		release || partialImp(this, 'set enabled');
		this._enabled = isSeparator;
	}
}