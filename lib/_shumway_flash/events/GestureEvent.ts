import { axCoerceString } from '@awayjs/graphics';
import { Event } from '../../events/Event';
export class GestureEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor(type: string, bubbles: boolean = true, cancelable: boolean = false,
		phase: string = null, localX: number = 0, localY: number = 0,
		ctrlKey: boolean = false, altKey: boolean = false, shiftKey: boolean = false) {
		super(type, bubbles, cancelable);
		this._phase = axCoerceString(phase);
		this._localX = +localX;
		this._localY = +localY;
		this._ctrlKey = !!ctrlKey;
		this._altKey = !!altKey;
		this._shiftKey = !!shiftKey;
	}

	// JS -> AS Bindings
	static GESTURE_TWO_FINGER_TAP: string = 'gestureTwoFingerTap';

	private _phase: string;
	private _localX: number;
	private _localY: number;
	private _ctrlKey: boolean;
	private _altKey: boolean;
	private _shiftKey: boolean;

	// AS -> JS Bindings
	get localX(): number {
		return this._localX;
	}

	set localX(value: number) {
		this._localX = +value;
	}

	get localY(): number {
		return this._localY;
	}

	set localY(value: number) {
		this._localY = +value;
	}

	get stageX(): number {
		return 0;
	}

	get stageY(): number {
		return 0;
	}

	get ctrlKey(): boolean {
		return this._ctrlKey;
	}

	set ctrlKey(value: boolean) {
		this._ctrlKey = !!value;
	}

	get altKey(): boolean {
		return this._altKey;
	}

	set altKey(value: boolean) {
		this._altKey = !!value;
	}

	get shiftKey(): boolean {
		return this._shiftKey;
	}

	set shiftKey(value: boolean) {
		this._shiftKey = !!value;
	}

	get phase(): string {
		return this._phase;
	}

	set phase(value: string) {
		this._phase = axCoerceString(value);
	}

	updateAfterEvent(): void {}

	NativeCtor(phase: string, localX: number, localY: number,
		ctrlKey: boolean, altKey: boolean, shiftKey: boolean) {
		this._phase = axCoerceString(phase);
		this._localX = +localX;
		this._localY = +localY;
		this._ctrlKey = !!ctrlKey;
		this._altKey = !!altKey;
		this._shiftKey = !!shiftKey;
	}

	clone(): Event {
		return new GestureEvent(this.type, this.bubbles,
			this.cancelable, this.phase,
			this.localX, this.localY,
			this.ctrlKey, this.altKey,
			this.shiftKey);
	}

	toString(): string {
		return this.formatToString('GestureEvent', 'type', 'bubbles', 'cancelable', 'eventPhase',
			'localX', 'localY', 'ctrlKey', 'altKey', 'shiftKey');
	}
}