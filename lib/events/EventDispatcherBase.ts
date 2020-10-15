import { EventBase }					from '@awayjs/core';
import { ASObject, AXClass } from '@awayfl/avm2';

/**
 * Base export class for dispatching events
*
* @export class away.events.EventDispatcher
*
*/
export class EventDispatcherBase extends ASObject {
	static axClass: typeof EventDispatcherBase & AXClass;

	private _listenerObjects: Array<ListenerObject> = new Array<ListenerObject>();
	private _t: any;

	public toString(): string {
		return '';
	}

	constructor(target: any = null) {
		super();
		this._t = target || this;
	}

	/**
	 * Add an event listener
	 * @method addEventListener
	 * @param {String} Name of event to add a listener for
	 * @param {Function} Callback function
	 */
	public addEventListener(type: string,
		listener: (event: EventBase) => void,
		useCapture: boolean = false,
		priority: number /*int*/ = 0,
		useWeakReference: boolean = false): void {
		if (!this._listenerObjects)
			return;
		let l: ListenerObject = this._listenerObjects[type];

		if (l === undefined)
			l = this._listenerObjects[type] = new ListenerObject();

		l.addEventListener(listener, priority);
	}

	/**
	 * Remove an event listener
	 * @method removeEventListener
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	public removeEventListener(type: string, listener: (event: EventBase) => void): void {
		if (!this._listenerObjects)
			return;

		const l: ListenerObject = this._listenerObjects[type];

		if (l) {
			l.removeEventListener(listener);

			if (l.numListeners == 0)
				delete this._listenerObjects[type];
		}
	}

	/**
	 * Dispatch an event
	 * @method dispatchEvent
	 * @param {Event} Event to dispatch
	 */
	public dispatchEvent(event: EventBase): boolean {
		if (!this._listenerObjects) {
			//throw("dispatching event on object that wasnt init yet");
			return;
		}
		const l: ListenerObject = this._listenerObjects[event.type];

		if (l) {
			if (!event.target)
				event.target = this._t;
			//console.log("dispatchEvent", event.type, (<any>this).adaptee?.id);
			l.dispatchEvent(event);
		}
		return true;
	}

	/**
	 * check if an object has an event listener assigned to it
	 * @method hasListener
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	public hasEventListener(type: string, listener?: (event: EventBase) => void): boolean {
		if (this._listenerObjects[type] === undefined)
			return false;

		if (listener != null)
			return this._listenerObjects[type].getEventListenerIndex(listener) !== -1;

		return this._listenerObjects[type].numListeners > 0;
	}
}

interface IListenerPriority{
	priority: number,
	listeners?: Array<(event: EventBase) => void>

}
function sortListenersByPriority(a: IListenerPriority, b: IListenerPriority) {
	return a.priority < b.priority ? -1 : 1;
}
export class ListenerObject {
	private _index: number = 0;
	private _singlePriority: number = 0;

	private _listeners: Array<(event: EventBase) => void> = new Array<(event: EventBase) => void>();

	private _listenersByPriority: IListenerPriority[];

	public numListeners: number = 0;

	public addEventListener(listener: (event: EventBase) => void, priority: number = 0): void {

		// if event already exists, it will not be added again, and old priority will remain

		if (!this._listenersByPriority) {
			// single priority mode:
			if (this._listeners.indexOf(listener) !== -1) {
				// the listener is already present - do nothing just return
				return;
			} else {
				// its a new listener
				if (this._listeners.length == 0 || priority == this._singlePriority) {
					// same priority as existing listeners. just add it and return
					this._listeners.push(listener);
					this.numListeners++;
					return;
				} else {
					// different priority - switch to multi-priority mode
					if (this._singlePriority < priority) {
						this._listenersByPriority = [
							{
								priority:this._singlePriority,
								listeners:this._listeners.concat()
							},
							{
								priority:priority,
								listeners:[listener]
							}
						];
					} else {
						this._listenersByPriority = [
							{
								priority:priority,
								listeners:[listener]
							},
							{
								priority:this._singlePriority,
								listeners:this._listeners.concat()
							}
						];
					}
					this.numListeners++;
				}
				return;
			}
		}
		// multi-priority mode:
		//check if a listener already exists
		for (let i = 0; i < this._listenersByPriority.length; i++) {
			if (this._listenersByPriority[i].listeners.indexOf(listener) !== -1) {
				return;
			}
		}
		// find priority item
		let priorityItem = null;
		for (let i = 0; i < this._listenersByPriority.length; i++) {
			if (this._listenersByPriority[i].priority == priority) {
				priorityItem = this._listenersByPriority[i];
				break;
			}
		}
		if (!priorityItem) {
			priorityItem = {
				priority:priority,
				listeners:[]
			};
			this._listenersByPriority.push(priorityItem);
			if (this._listenersByPriority.length > 1) {
				this._listenersByPriority.sort(sortListenersByPriority);
			}
		}
		priorityItem.listeners.push(listener);
		this.numListeners++;
	}

	public removeEventListener(listener: (event: EventBase) => void): void {
		let index: number = -1;
		if (!this._listenersByPriority) {
			index = this._listeners.indexOf(listener);

			if (index === -1)
				return;

			this._listeners.splice(index, 1);

			this.numListeners--;
			return;
		}
		//check if listener exists
		for (let i = 0; i < this._listenersByPriority.length; i++) {
			index = this._listenersByPriority[i].listeners.indexOf(listener);
			if (index !== -1) {
				this.numListeners--;
				this._listenersByPriority[i].listeners.splice(index, 1);
				return;

			}
		}
	}

	public dispatchEvent(event: EventBase): void {
		// when listeners do attach/remove new listeners the new listeners will be ignored during this dispatch,
		// and listeners that got removed will still dispatch during this dispatch
		// this means we need to concat the listener-array before we iterate it
		if (!this._listenersByPriority) {
			// single-priority mode:
			const listeners = this._listeners.length > 1 ? this._listeners.concat() : this._listeners;
			const numListeners = listeners.length;
			let i = 0;
			for (i = 0; i < numListeners; i++) {
				if (listeners[i])
					listeners[i].call(listeners[i], event);
			}
			return;
		}
		// multi-priority mode:
		let p = this._listenersByPriority.length;
		//console.log("multi-priority mode", p);
		while (p > 0) {
			p--;
			//console.log("multi-priority mode next", p);
			const listeners = this._listenersByPriority[p].listeners.length > 1 ? this._listenersByPriority[p].listeners.concat() : this._listenersByPriority[p].listeners;
			const numListeners = listeners.length;
			let i = 0;
			//let len=events.length;
			//console.log("events", len);
			for (i = 0; i < numListeners; i++) {
				if (listeners[i])
					listeners[i].call(listeners[i], event);
			}
		}
		if (this._listenersByPriority.length == 1) {
			// if only 1 priority exists, we can go back to single-priority-mode
			this._listeners = this._listenersByPriority[0].listeners.concat();
			this._singlePriority = this._listenersByPriority[0].priority;
			this._listenersByPriority = null;
		}
	}

	/**
	 * get Event Listener Index in array. Returns -1 if no listener is added
	 * @method getEventListenerIndex
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	public getEventListenerIndex(listener: (event: EventBase) => void): number {
		if (!this._listenersByPriority) {
			// single-priority mode:
			return this._listeners.indexOf(listener);
		}
		// multi-priority mode:
		for (let i = 0; i < this._listenersByPriority.length; i++) {
			for (let e = 0; e < this._listenersByPriority[i].listeners.length; e++) {
				if (this._listenersByPriority[i].listeners[e] == listener) {
					return i;
				}
			}
		}
		return -1;
	}
}
export default EventDispatcherBase;