import {EventBase}					from "@awayjs/core";
import { ASObject, AXClass } from '@awayfl/avm2';

/**
 * Base export class for dispatching events
*
* @export class away.events.EventDispatcher
*
*/
export class EventDispatcherBase extends ASObject
{
	static axClass: typeof EventDispatcherBase & AXClass;

	private _listenerObjects:Array<ListenerObject> = new Array<ListenerObject>();
	private _t:any;
	protected _queuedEvents:EventBase[]=[];
	protected _queuedAttachEventListeners:StringMap<((event: EventBase) => void)[]> = {};


	public toString():string
	{
        return "";
    }
	constructor(target:any = null)
	{
        super();
		this._t = target || this;
	}

	/**
	 * Add an event listener
	 * @method addEventListener
	 * @param {String} Name of event to add a listener for
	 * @param {Function} Callback function
	 */
	public addEventListener(type:string, listener:(event:EventBase) => void):void
	{
		if(!this._listenerObjects)
			return;
		var l:ListenerObject = this._listenerObjects[type];

		if (l === undefined)
			l = this._listenerObjects[type] = new ListenerObject();

		l.addEventListener(listener);
	}

	/**
	 * Remove an event listener
	 * @method removeEventListener
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	public removeEventListener(type:string, listener:(event:EventBase) => void):void
	{
		if(!this._listenerObjects)
			return;

		var l:ListenerObject = this._listenerObjects[type];

		if (l) {
			l.removeEventListener(listener);

			if (l.numListeners == 0)
				delete this._listenerObjects[type];
		}
	}
	
	public getQueuedAttachEventListeners()
	{
		return this._queuedAttachEventListeners;
	}
	public getQueuedEvents()
	{
		if(!this._queuedEvents)
			return null;
		var returnEvents=this._queuedEvents.concat();
		this._queuedEvents.length=0;
		return returnEvents;
	}
	/**
	 * Dispatch an event
	 * @method dispatchEvent
	 * @param {Event} Event to dispatch
	 */
	public dispatchEvent(event:EventBase):void
	{
		if(!this._listenerObjects){
			if(!this._queuedEvents)
				this._queuedEvents=[];
			this._queuedEvents.push(event);
			return;
		}
		var l:ListenerObject = this._listenerObjects[event.type];

		if (l) {
			if(!event.target)
				event.target = this._t;
			l.dispatchEvent(event);
		}
	}

	/**
	 * check if an object has an event listener assigned to it
	 * @method hasListener
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	public hasEventListener(type:string, listener?:(event:EventBase) => void):boolean
	{
		if(!this._listenerObjects)
			return;
		if (this._listenerObjects[type] === undefined)
			return false;

		if (listener != null)
			return this._listenerObjects[type].getEventListenerIndex(listener) !== -1;

		return this._listenerObjects[type].numListeners > 0;
	}
}

export class ListenerObject
{
	private _index:number = 0;

	private _listeners:Array<(event:EventBase) => void> = new Array<(event:EventBase) => void>();

	public numListeners:number = 0;

	public addEventListener(listener:(event:EventBase) => void):void
	{
		//check if listener already added
		if (this._listeners.indexOf(listener) !== -1)
			return;

		this._listeners.push(listener);
		
		this.numListeners++;
	}

	public removeEventListener(listener:(event:EventBase) => void):void
	{
		//check if listener exists
		var index:number = this._listeners.indexOf(listener);

		if (index === -1)
			return;

		this._listeners.splice(index, 1);

		//deals with removing a listener mid-way through dispatching listeners
		if (index <= this._index)
			this._index--;

		this.numListeners--;
	}

	public dispatchEvent(event:EventBase):void
	{
		var len:number = this.numListeners;
		for (this._index = 0; this._index < len && this._index < this.numListeners; this._index++)
			(<any>this._listeners[this._index]).call(this._listeners[this._index], event);
	}

	/**
	 * get Event Listener Index in array. Returns -1 if no listener is added
	 * @method getEventListenerIndex
	 * @param {String} Name of event to remove a listener for
	 * @param {Function} Callback function
	 */
	public getEventListenerIndex(listener:(event:EventBase) => void):number
	{
		return this._listeners.indexOf(listener);
	}
}
export default EventDispatcherBase;