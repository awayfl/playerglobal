import { Event } from './Event';
import { SecurityDomain } from '../SecurityDomain';

export class TimerEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor(type: string, bubbles?: boolean, cancelable?: boolean) {
		super(type, bubbles, cancelable);
	}

	// JS -> AS Bindings
	static TIMER: string = 'timer';
	static TIMER_COMPLETE: string = 'timerComplete';

	clone(): Event {
		return new (<SecurityDomain> this.sec).flash.events.TimerEvent(this.type, this.bubbles, this.cancelable);
	}

	toString(): string {
		return this.formatToString('TimerEvent', 'type', 'bubbles', 'cancelable', 'eventPhase');
	}

	updateAfterEvent(): void {
	//release || console.log("TimerEvent.updateAfterEvent not implemented");
		this.sec.player.requestRender();
	}
}
