import { Event } from '../../events/Event';
import { ASObject } from '@awayfl/avm2';
export class NetDataEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	timestamp: number;
	info: ASObject;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		timestamp: number = 0, info: ASObject = null) {
		super(type, bubbles, cancelable);
		this.timestamp = +timestamp;
		this.info = info;
	}

	// JS -> AS Bindings
	static MEDIA_TYPE_DATA: string = 'mediaTypeData';
}