import { ASError } from '@awayfl/avm2';
import { ErrorEvent } from './ErrorEvent';
import { Event } from './Event';
export class AsyncErrorEvent extends ErrorEvent {

	static ASYNC_ERROR: string = 'asyncError';

	static classInitializer: any = null;

	$Bgerror: ASError;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		text: string = '', error: ASError = null) {
		super(type, bubbles, cancelable, text);
		this.$Bgerror = error;
	}

	public get error() {
		return this.$Bgerror;
	}

	clone(): Event {
		return new AsyncErrorEvent(this._type, this._bubbles, this._cancelable,
			this._text, this.$Bgerror);
	}

	toString(): string {
		return this.formatToString('AsyncErrorEvent', 'type', 'bubbles', 'cancelable', 'eventPhase',
			'text', 'error');
	}
}