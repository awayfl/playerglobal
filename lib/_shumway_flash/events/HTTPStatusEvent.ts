import { Event } from '../../events/Event';

export class HTTPStatusEvent extends Event {

	static classInitializer: any = null;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		status: number /*int*/ = 0) {
		super(type, bubbles, cancelable);
		this._status = status | 0;
	}

	static HTTP_STATUS: string = 'httpStatus';
	static HTTP_RESPONSE_STATUS: string = 'httpResponseStatus';

	private _status: number;

	_setStatus(value: number): void {
		this._status = value;
	}

	get status(): number {
		return this._status;
	}

	clone(): Event {
		return new HTTPStatusEvent(this.type, this.bubbles, this.cancelable,
			this.status);
	}

	toString(): string {
		return this.formatToString('HTTPStatusEvent', 'type', 'bubbles', 'cancelable', 'eventPhase',
			'status');
	}
}
