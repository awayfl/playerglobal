import { EventDispatcher } from '../events/EventDispatcher';
import { axCoerceString } from '@awayjs/graphics';

// Class: FrameLabel
export class FrameLabel extends EventDispatcher {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	constructor (name: string, frame: number /*int*/) {
		super();
		this._name = axCoerceString(name);
		this._frame = frame | 0;
	}

	private _name: string;
	private _frame: number /*int*/;

	get name(): string {
		return this._name;
	}

	get frame(): number /*int*/ {
		return this._frame;
	}

	clone() {
		return new FrameLabel(this._name, this._frame);
	}
}