import { axCoerceString } from '@awayfl/avm2';
import { Event } from '../../events/Event';

export class StatusEvent extends Event {

	static classInitializer: any = null;

	private _code: string;
	private _level: string;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		code: string = '', level: string = '') {
		super(type, bubbles, cancelable);
		this._code = axCoerceString(code);
		this._level = axCoerceString(level);
	}

	public get level(): string {
		return this._level;
	}

	public set level(value: string) {
		this._level = value;
	}

	public get code(): string {
		return this._code;
	}

	public set code(value: string) {
		this._code = value;
	}

	clone(): Event {
		return new StatusEvent(this._type, this._bubbles, this._cancelable,
			this._code, this._level);
	}

	toString(): string {
		return this.formatToString('StatusEvent', 'type', 'bubbles', 'cancelable', 'eventPhase',
			'code', 'level');
	}

	static STATUS: string = 'status';
}