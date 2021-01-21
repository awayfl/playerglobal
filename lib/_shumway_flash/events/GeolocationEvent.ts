import { Event } from '../../events/Event';
export class GeolocationEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		latitude: number = 0, longitude: number = 0, altitude: number = 0,
		hAccuracy: number = 0, vAccuracy: number = 0, speed: number = 0,
		heading: number = 0, timestamp: number = 0) {
		super(type, bubbles, cancelable);
	}

	// JS -> AS Bindings
	static UPDATE: string = 'update';
}