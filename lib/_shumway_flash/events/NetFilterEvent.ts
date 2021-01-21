import { ByteArray } from '@awayfl/avm2';
import { Event } from '../../events/Event';
export class NetFilterEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	header: ByteArray;
	data: ByteArray;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		header: ByteArray = null, data: ByteArray = null) {
		super(type, bubbles, cancelable);
		// TODO: coerce
		this.header = header;
		this.data = data;
	}
}