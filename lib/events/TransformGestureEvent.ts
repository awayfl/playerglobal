import { GestureEvent } from './GestureEvent';
export class TransformGestureEvent extends GestureEvent {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor(type: string, bubbles: boolean = true, cancelable: boolean = false,
		phase: string = null, localX: number = 0, localY: number = 0, scaleX: number = 1,
		scaleY: number = 1, rotation: number = 0, offsetX: number = 0, offsetY: number = 0,
		ctrlKey: boolean = false, altKey: boolean = false, shiftKey: boolean = false) {
		super(type, bubbles, cancelable, phase, localX, localY, ctrlKey, altKey, shiftKey);
	}

	// JS -> AS Bindings
	static GESTURE_ZOOM: string = 'gestureZoom';
	static GESTURE_PAN: string = 'gesturePan';
	static GESTURE_ROTATE: string = 'gestureRotate';
	static GESTURE_SWIPE: string = 'gestureSwipe';
}
