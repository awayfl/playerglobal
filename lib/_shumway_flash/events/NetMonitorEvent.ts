import { Event } from '../../events/Event';
export class NetMonitorEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	netStream: NetStream;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		netStream: NetStream = null) {
		super(type, bubbles, cancelable);
		// TODO: coerce
		this.netStream = netStream;
	}

	// JS -> AS Bindings
	static NET_STREAM_CREATE: string = 'netStreamCreate';
}
