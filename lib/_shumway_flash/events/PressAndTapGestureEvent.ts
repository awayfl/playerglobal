import { GestureEvent } from './GestureEvent';

export class PressAndTapGestureEvent extends GestureEvent {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	tapLocalX: number;
	tapLocalY: number;

	constructor(type: string, bubbles: boolean = true, cancelable: boolean = false,
		phase: string = null, localX: number = 0, localY: number = 0, tapLocalX: number = 0,
		tapLocalY: number = 0, ctrlKey: boolean = false, altKey: boolean = false,
		shiftKey: boolean = false) {
		super(type, bubbles, cancelable, phase, localX, localY, ctrlKey, altKey, shiftKey);
		this.tapLocalX = +tapLocalX;
		this.tapLocalY = +tapLocalY;
	}

	// JS -> AS Bindings
	static GESTURE_PRESS_AND_TAP: string = 'gesturePressAndTap';
}