import { Event } from '../../events/Event';
export class AccelerometerEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	timestamp: number;
	accelerationX: number;
	accelerationY: number;
	accelerationZ: number;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		timestamp: number = 0, accelerationX: number = 0, accelerationY: number = 0,
		accelerationZ: number = 0) {
		super(type, bubbles, cancelable);
		this.timestamp = +timestamp;
		this.accelerationX = +accelerationX;
		this.accelerationY = +accelerationY;
		this.accelerationZ = +accelerationZ;
	}

	// JS -> AS Bindings
	static UPDATE: string = 'update';
}
