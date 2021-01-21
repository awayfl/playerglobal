import { axCoerceString } from '@awayjs/graphics';
import { EventDispatcher } from '../../events/EventDispatcher';

export class XMLSocket extends EventDispatcher {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // ["timeout", "timeout", "connected", "connect", "send", "close"];

	constructor (host: string = null, port: number /*int*/ = 0) {
		super();
		host = axCoerceString(host); port = port | 0;
	}

	// JS -> AS Bindings

	timeout: number /*int*/;
	connected: boolean;
	connect: (host: string, port: number /*int*/) => void;
	send: (object: any) => void;
	close: () => void;

	// AS -> JS Bindings

	// _timeout: number /*int*/;
	// _connected: boolean;
}