import { Event } from './Event';
import { IEventMapper } from './IEventMapper';
import { EventDispatcherBase } from './EventDispatcherBase';

import { EventBase, UUID } from '@awayjs/core';
import { release } from '@awayfl/swf-loader';
import { assert } from '@awayjs/graphics';
import { SecurityDomain } from '../SecurityDomain';

import { MouseEvent } from '../events/MouseEvent';
import { Settings } from '@awayfl/avm2';
/**
	 * [broadcast event] Dispatched when the Flash Player or AIR application operating
	 * loses system focus and is becoming inactive.
	 * @eventType	flash.events.Event.DEACTIVATE
	[Event(name="deactivate", type="flash.events.Event")]

	 * [broadcast event] Dispatched when the Flash Player or AIR application gains
	 * operating system focus and becomes active.
	 * @eventType	flash.events.Event.ACTIVATE
	[Event(name="activate", type="flash.events.Event")]
 */

export class EventDispatcher extends EventDispatcherBase {

	public static eventsThatBubbleInAwayJS: string[] = [
		MouseEvent.MOUSE_WHEEL,
		MouseEvent.MOUSE_UP,
		MouseEvent.MOUSE_OVER,
		MouseEvent.MOUSE_OUT,
		MouseEvent.ROLL_OVER,
		MouseEvent.ROLL_OUT,
		MouseEvent.MOUSE_MOVE,
		MouseEvent.MOUSE_DOWN,
		MouseEvent.DOUBLE_CLICK,
		MouseEvent.CLICK,
		Event.ENTER_FRAME,
		Event.EXIT_FRAME,
		Event.FRAME_CONSTRUCTED,
		Event.ADDED_TO_STAGE,
		Event.RESIZE,
		Event.REMOVED_FROM_STAGE,
		//KeyboardEvent.KEY_DOWN,
		//KeyboardEvent.KEY_UP,
	]

	public readonly id: number;

	public toString(): string {
		return '';
	}

	public hasEventListener(type: string, listener?: (event: EventBase) => void): boolean {
		return super.hasEventListener(type, listener);

	}

	public willTrigger() {

	}

	public dispatchEvent(event: EventBase, comesFromAway: boolean = false): boolean {
		(<any>event).currentTarget = this;
		if (event.type == 'enterFrame') {//} || event.type=="scroll"){
			(<any>event).target = this;
		}
		const returnVal = super.dispatchEvent(event);

		// workaround for now.
		// mousevents already bubble up the scenegraph in MouseMangager
		// for all other events, we want to bubble them up here:
		if (!comesFromAway && EventDispatcher.eventsThatBubbleInAwayJS.indexOf(event.type) == -1) {
			if ((<any> this).adaptee && (<any> this).adaptee.parent) {
				(<any> this).adaptee.parent.adapter.dispatchEvent(event);
			}
		}
		return returnVal;
	}

	protected eventMapping: Object;
	protected eventMappingDummys: Object;
	protected eventMappingExtern: Object;

	protected eventMappingInvert: Object;

	// for AVM1:
	public _avm1Context: any;

	constructor(target: any = null) {
		super(target);

		this.id = UUID.Next();

		this.eventMapping || (this.eventMapping = {});
		this.eventMappingDummys || (this.eventMappingDummys = {});
		this.eventMappingExtern || (this.eventMappingExtern = {});
		this.eventMappingInvert || (this.eventMappingInvert = {});

		this._activateCallbackDelegate = (event: any) => this.activateCallback(event);
		this.eventMapping[Event.ACTIVATE] = (<IEventMapper>{
			adaptedType: '',
			addListener: this.initActivateListener,
			removeListener: this.removeActivateListener,
			callback: this._activateCallbackDelegate
		});

		this._deactivateCallbackDelegate = (event: any) => this.deactivateCallback(event);
		this.eventMapping[Event.DEACTIVATE] = (<IEventMapper>{
			adaptedType: '',
			addListener: this.initDeactivateListener,
			removeListener: this.removeDeactivateListener,
			callback: this._deactivateCallbackDelegate
		});
	}

	// ---------- event mapping functions Event.ACTIVATE

	private initActivateListener(type: string, callback: (event: any) => void): void {
		window.onfocus = callback;
	}

	private removeActivateListener(type: string, callback: (event: any) => void): void {
		window.onfocus = null;
	}

	private _activateCallbackDelegate: (event: any) => void;
	private activateCallback(event: any = null): void {
		this.dispatchEvent(new (<SecurityDomain> this.sec).flash.events.Event(Event.ACTIVATE));
	}

	// ---------- event mapping functions Event.DEACTIVATE

	private initDeactivateListener(type: string, callback: (event: any) => void): void {
		window.onblur = callback;
	}

	private removeDeactivateListener(type: string, callback: (event: any) => void): void {
		window.onblur = null;
	}

	private _deactivateCallbackDelegate: (event: any) => void;
	private deactivateCallback(event: any = null): void {
		this.dispatchEvent(new (<SecurityDomain> this.sec).flash.events.Event(Event.DEACTIVATE));
	}

	/*overwrite*/
	public addEventListener(type: string, listener: (event: EventBase) => void, useCapture: boolean = false,
		priority: number /*int*/ = 0, useWeakReference: boolean = false): void {

		if (!useCapture && Event.isBroadcastEventType(type)) {
			BroadcastEventDispatchQueue.getInstance().add(type, this);
		}

		this.eventMapping || (this.eventMapping = {});
		this.eventMappingDummys || (this.eventMappingDummys = {});
		this.eventMappingExtern || (this.eventMappingExtern = {});
		this.eventMappingInvert || (this.eventMappingInvert = {});

		if (this.eventMappingDummys.hasOwnProperty(type)) {

			// this is a dummy eventMapping
			// this means that this is a event-type, that is not yet supported
			// we do not need to register it on superclass
			// for now we output a warning
			//console.log("Warning - EventDispatcher:  trying to listen for unsupported event: :
			//"+this.eventMappingDummys[type]);
			return;
		} else if (this.eventMapping.hasOwnProperty(type)) {

			// a mapping exists for this event

			//making sure standart behaviour still works (listener is tracked in list)
			super.addEventListener(type, listener, useCapture, priority, useWeakReference);

			// call the provided "addListener" function
			this.eventMapping[type].addListener.call(
				this, this.eventMapping[type].adaptedType, this.eventMapping[type].callback, listener);
			return;
		} else {
			// this is a external eventMapping
			// this means that we do not need to create any mapping, and will manually dispatch the event
			// we still need to register it on superclass, so it will work if we dispatch it manually
			super.addEventListener(type, listener, useCapture, priority, useWeakReference);
			return;
		}
		// if we make it here, the event is not handled by this dispatcher
		// lets output a Warning for now.
		//console.log("EventDispatcher: trying to listen for unknown event: '"+type+"'")
	}

	/**
	 * Remove an event listener
	 * @method removeEventListener
	 * @param {String} type of event to remove a listener for
	 * @param {Function} listener function
	 */
	public removeEventListener(type: string, listener: (event: EventBase) => void): void {

		this.eventMapping || (this.eventMapping = {});
		this.eventMappingDummys || (this.eventMappingDummys = {});
		this.eventMappingExtern || (this.eventMappingExtern = {});
		this.eventMappingInvert || (this.eventMappingInvert = {});

		super.removeEventListener(type, listener);
		if (this.eventMapping.hasOwnProperty(type)) {
			// a mapping exists
			this.eventMapping[type].removeListener.call(
				this, this.eventMapping[type].adaptedType, this.eventMapping[type].callback, listener);
			if (!this.hasEventListener(type)) {

				if (Event.isBroadcastEventType(type)) {
					BroadcastEventDispatchQueue.getInstance().remove(type, this);
				}
			}
		}
	}
}

declare global {
	interface Window { WeakRef: typeof WeakRef}
}

const USE_WEAK = ('WeakRef' in self) && Settings.USE_WEAK_REF;

if (USE_WEAK) {
	console.debug('[BroadcastEventDispatchQueue] `WeakRef` used for Broadcast Events!');
}

export class BroadcastEventDispatchQueue {
	/**
	 * The queues start off compact but can have null values if event targets are removed.
	 * Periodically we compact them if too many null values exist.
	 */
	private _queues: Record<string,  Record<number, WeakRef<EventDispatcher>> | Record<number, EventDispatcher>> = {};
	private static _instance: BroadcastEventDispatchQueue;
	public static getInstance(): BroadcastEventDispatchQueue {
		return BroadcastEventDispatchQueue._instance
			|| (BroadcastEventDispatchQueue._instance = new BroadcastEventDispatchQueue());
	}

	add(type: string, target: EventDispatcher) {
		// release || assert(Event.isBroadcastEventType(type), "Can only register broadcast events.");
		const queue = this._queues[type] || (this._queues[type] = []);

		if (queue[target.id])
			return;

		queue[target.id] = (USE_WEAK ? new self.WeakRef(target) : target);
	}

	remove(type: string, target: EventDispatcher) {
		//release || assert (Event.isBroadcastEventType(type), "Can only unregister broadcast events.");
		const queue = this._queues[type];
		release || assert(queue, 'There should already be a queue for this.');
		delete queue[target.id];
	}

	dispatchEvent(event: Event) {
		//release || assert (event.isBroadcastEvent(), "Cannot dispatch non-broadcast events.");
		const queue = this._queues[event._type];

		//return if no listeners exist for event type
		if (!queue)
			return;

		for (const key in queue) {
			let target = queue[key];
			if (USE_WEAK)
				target = (<WeakRef<EventDispatcher>> target)?.deref();

			if (target) {
				(<EventDispatcher> target).dispatchEvent(event);
			} else {
				console.debug('[BroadcastEventDispatchQueue] Broadcast target was deleted by GC:', key);
				delete queue[key];
			}
		}
	}

	getQueueLength(type: string) {
		return this._queues[type] ? Object.getOwnPropertyNames(this._queues[type]).length : 0;
	}
}