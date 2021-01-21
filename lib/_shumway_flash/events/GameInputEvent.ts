import { Event } from '../../events/Event';
import { GameInputDevice } from '../ui/GameInputDevice';

export class GameInputEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;
	device: GameInputDevice;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		device: GameInputDevice = null) {
		super(type, bubbles, cancelable);
		// TODO: coerce
		this.device = device;
	}

	// JS -> AS Bindings
	static DEVICE_ADDED: string = 'deviceAdded';
	static DEVICE_REMOVED: string = 'deviceRemoved';
}
