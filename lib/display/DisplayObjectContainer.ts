import { Box, Debug, Vector3D } from '@awayjs/core';
import {
	Billboard,
	TextField as AwayTextField,
	DisplayObjectContainer as AwayDisplayObjectContainer,
	Sprite as AwaySprite,
	MovieClip as AwayMovieClip,
	DisplayObject as AwayDisplayObject,
	IDisplayObjectAdapter,
	TextSprite,
} from '@awayjs/scene';
import { DisplayObject } from './DisplayObject';
import { InteractiveObject } from './InteractiveObject';
import { Event } from '../events/Event';
import { IPartitionEntity, PickGroup } from '@awayjs/view';
import { constructClassFromSymbol, Errors, OrphanManager } from '@awayfl/avm2';
import { Point } from '../geom/Point';
import { SecurityDomain } from '../SecurityDomain';
import { StaticEvents } from '../events/StaticEvents';
import { AVMStage } from '@awayfl/swf-loader';

export class DisplayObjectContainer extends InteractiveObject {

	// for AVM1:
	public _children: any[];
	public addTimelineObjectAtDepth(child: any, depth: number) {

	}

	public getTimelineObjectAtDepth(depth: number): any {
		return null;
	}

	/**
	 * The DisplayObjectContainer class is the base class for all objects that can serve as display object containers on
	 * the display list. The display list manages all objects displayed in the Flash runtimes.
	 * Use the DisplayObjectContainer class to arrange the display objects in the display list.
	 * Each DisplayObjectContainer object has its own child list for organizing the z-order of the objects.
	 * The z-order is the front-to-back order that determines which object is drawn in front, which is behind,
	 * and so on.
	 *
	 *   <p class="- topic/p ">DisplayObject is an abstract base class; therefore,
	 * you cannot call DisplayObject directly. Invoking
	 * <codeph class="+ topic/ph pr-d/codeph ">new DisplayObject()</codeph> throws an
	 * <codeph class="+ topic/ph pr-d/codeph ">ArgumentError</codeph> exception.</p>
	 *
	 *   The DisplayObjectContainer class is an abstract base class for all objects that can contain child objects.
	 * It cannot be instantiated directly; calling the <codeph class="+ topic/ph pr-d/codeph ">
	 * new DisplayObjectContainer()</codeph> constructor
	 * throws an <codeph class="+ topic/ph pr-d/codeph ">ArgumentError</codeph> exception.
	 *
	 *   <p class="- topic/p ">For more information, see the "Display Programming" chapter of the
	 * <i class="+ topic/ph hi-d/i ">ActionScript 3.0 Developer's Guide</i>.</p>

	 /**
	 * Calling the new DisplayObjectContainer() constructor throws an
	 * ArgumentError exception. You can, however, call constructors for
	 * the following subclasses of DisplayObjectContainer:
	 *
	 *   new Loader()new Sprite()new MovieClip()
	 */
	constructor() {
		super();
		if (this.adaptee) {
			for (let i: number = 0; i < (<AwayDisplayObjectContainer> this.adaptee).numChildren; i++) {

				const mc = (<AwayDisplayObjectContainer> this.adaptee).getChildAt(i);
				const mcadapter = mc.adapter;
				const constructorFunc = (<IDisplayObjectAdapter>mcadapter).executeConstructor;
				if (constructorFunc) {
					(<IDisplayObjectAdapter>mcadapter).executeConstructor = null;
					//console.log(randomVal, "call constructor for ", mc.parent.name, mc.name);
					constructorFunc();
					//(<any>mcadapter).constructorHasRun=true;
				}
				if ((<any>mc).just_added_to_timeline && mc._sessionID != -1
					&& mcadapter && (<any>mcadapter).dispatchStaticEvent) {

					(<any>mcadapter).dispatchStaticEvent('added', mcadapter);
					(<any>mc).just_added_to_timeline = false;
					mc.hasDispatchedAddedToStage = mc.isOnDisplayList();
					if (mc.hasDispatchedAddedToStage)
						(<any>mcadapter).dispatchStaticEvent('addedToStage', mcadapter);
				}
			}
		}
	}

	protected createAdaptee(): AwayDisplayObject {
		return new AwayDisplayObjectContainer();
	}
	//---------------------------stuff added to make it work:

	public clone(): DisplayObjectContainer {
		if (!(<any> this)._symbol) {
			throw ('_symbol not defined when cloning movieclip');
		}
		const clone = constructClassFromSymbol((<any> this)._symbol, (<any> this)._symbol.symbolClass);
		clone.axInitializer();
		this.adaptee.copyTo(clone.adaptee);
		return clone;
	}

	public debugDisplayGraph(obj: any) {
		obj.object = this;
		obj.rectangle = 'x:' + this.x + ', y:' + this.y + ', width:' + this.width + ', height:' + this.height;
		obj.children = {};
		let i: number = 0;
		for (i = 0;i < (<AwayDisplayObjectContainer> this._adaptee).numChildren;i++) {
			const oneChild: AwayDisplayObject = (<AwayDisplayObjectContainer> this._adaptee).getChildAt(i);
			const childname = 'child_' + i + ' ' + (<any>oneChild.adapter).constructor.name;
			if (oneChild.isAsset(AwaySprite) || oneChild.isAsset(AwayDisplayObjectContainer)) {
				if (oneChild.adapter) {
					obj.children[childname] = {};
					(<DisplayObjectContainer>oneChild.adapter).debugDisplayGraph(obj.children[childname]);
				}
			} else if (oneChild.isAsset(Billboard)) {
				obj.children[childname] = {};
				obj.children[childname].object = oneChild.adapter;
				obj.children[childname].name = oneChild.name;
				obj.children[childname].rectangle = 'x:' + oneChild.x + ', y:' + oneChild.y;
			} else if (oneChild.isAsset(AwayMovieClip)) {
				obj.children[childname] = {};
				obj.children[childname].object = oneChild.adapter;
				obj.children[childname].name = oneChild.name;
				obj.children[childname].rectangle = 'x:' + oneChild.x + ', y:' + oneChild.y;
			} else if (oneChild.isAsset(AwayTextField)) {
				obj.children[childname] = {};
				obj.children[childname].object = oneChild.adapter;
				obj.children[childname].text = (<AwayTextField>oneChild).text;
				obj.children[childname].rectangle = 'x:' + oneChild.x + ', y:' + oneChild.y;
				const box: Box = PickGroup.getInstance(this._stage.view)
					.getBoundsPicker(AVMStage.instance().pool.getNode(oneChild).partition).getBoxBounds(AVMStage.instance().pool.getNode(oneChild));
				obj.children[childname].width = (box == null) ? 0 : box.width;
				obj.children[childname].height = (box == null) ? 0 : box.height;
			}
		}

	}

	//	overwrite
	public dispatch_ADDED_TO_STAGE(dispatchForThisChild: boolean = false) {

		if (dispatchForThisChild) {
			if (!StaticEvents.events[Event.ADDED_TO_STAGE])
				StaticEvents.events[Event.ADDED_TO_STAGE] =
					new (<SecurityDomain> this.sec).flash.events.Event(Event.ADDED_TO_STAGE);
			StaticEvents.events[Event.ADDED_TO_STAGE].target = this;
			this.dispatchEvent(StaticEvents.events[Event.ADDED_TO_STAGE]);
		}
		if (this._adaptee) {
			for (let i = 0;i < (<AwayDisplayObjectContainer> this._adaptee).numChildren; i++) {
				const oneChild: AwayDisplayObject = (<AwayDisplayObjectContainer> this._adaptee).getChildAt(i);
				if (oneChild.adapter && (<any>oneChild.adapter).dispatchEventRecursive
					&& !oneChild.hasDispatchedAddedToStage) {
					oneChild.hasDispatchedAddedToStage = true;
					(<DisplayObject>oneChild.adapter).dispatch_ADDED_TO_STAGE(true);
				}
			}
		}
	}

	public dispatch_REMOVED_FROM_STAGE(dispatchForThisChild: boolean = false) {

		if (dispatchForThisChild) {
			if (!StaticEvents.events[Event.REMOVED_FROM_STAGE])
				StaticEvents.events[Event.REMOVED_FROM_STAGE] =
					new (<SecurityDomain> this.sec).flash.events.Event(Event.REMOVED_FROM_STAGE);
			StaticEvents.events[Event.REMOVED_FROM_STAGE].target = this;
			this.dispatchEvent(StaticEvents.events[Event.REMOVED_FROM_STAGE]);
		}
		if (this._adaptee) {
			for (let i = 0;i < (<AwayDisplayObjectContainer> this._adaptee).numChildren; i++) {
				const oneChild: AwayDisplayObject =  (<AwayDisplayObjectContainer> this._adaptee).getChildAt(i);
				if (oneChild.adapter && (<any>oneChild.adapter).dispatchEventRecursive
					&& oneChild.hasDispatchedAddedToStage) {
					oneChild.hasDispatchedAddedToStage = false;
					(<DisplayObject>oneChild.adapter).dispatch_REMOVED_FROM_STAGE(true);
				}
			}
		}
	}

	//---------------------------original as3 properties / methods:

	/**
	 * Determines whether or not the children of the object are mouse, or user input device, enabled.
	 * If an object is enabled, a user can interact with it by using a mouse or user input device. The default is true.
	 *
	 *   This property is useful when you create a button with an instance of the Sprite class
	 * (instead of using the SimpleButton class). When you use a Sprite instance to create a button,
	 * you can choose to decorate the button by using the addChild() method to add additional
	 * Sprite instances. This process can cause unexpected behavior with mouse events because
	 * the Sprite instances you add as children can become the target object of a mouse event
	 * when you expect the parent instance to be the target object. To ensure that the parent
	 * instance serves as the target objects for mouse events, you can set the
	 * mouseChildren property of the parent instance to false.
	 * No event is dispatched by setting this property. You must use the
	 * addEventListener() method to create interactive functionality.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 */
	public get mouseChildren (): boolean {
		return (<AwayDisplayObjectContainer> this._adaptee).mouseChildren;
	}

	public set mouseChildren (enable: boolean)  {
		(<AwayDisplayObjectContainer> this._adaptee).mouseChildren = enable;
	}

	/**
	 * Returns the number of children of this object.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 */
	public get numChildren (): number {
		return (<AwayDisplayObjectContainer>(<AwayDisplayObjectContainer> this._adaptee)).numChildren;
	}

	/**
	 * Determines whether the children of the object are tab enabled. Enables or disables tabbing for the
	 * children of the object. The default is true.
	 * Note: Do not use the tabChildren property with Flex.
	 * Instead, use the mx.core.UIComponent.hasFocusableChildren property.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @throws	IllegalOperationError Calling this property of the Stage object
	 *   throws an exception. The Stage object does not implement this property.
	 */
	public get tabChildren (): boolean {
		// @todo
		Debug.throwPIR('playerglobals/display/DisplayObjectContainer', 'get tabChildren', '');
		return false;
	}

	public set tabChildren (enable: boolean)  {
		// @todo
		Debug.throwPIR('playerglobals/display/DisplayObjectContainer', 'set tabChildren', '');
	}

	/**
	 * Returns a TextSnapshot object for this DisplayObjectContainer instance.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 */
	public get textSnapshot (): any {
		// @todo
		Debug.throwPIR('playerglobals/display/DisplayObjectContainer', 'get textSnapshot', '');
		return null;
	}

	/**
	 * Adds a child DisplayObject instance to this DisplayObjectContainer instance. The child is added
	 * to the front (top) of all other children in this DisplayObjectContainer instance. (To add a child to a
	 * specific index position, use the addChildAt() method.)
	 *
	 *   If you add a child object that already has a different display object container as
	 * a parent, the object is removed from the child list of the other display object container.
	 * Note: The command stage.addChild() can cause problems with a published SWF file,
	 * including security problems and conflicts with other loaded SWF files.
	 * There is only one Stage within a Flash runtime instance,
	 * no matter how many SWF files you load into the runtime. So, generally, objects
	 * should not be added to the Stage, directly, at all. The only object the Stage should
	 * contain is the root object. Create a DisplayObjectContainer to contain all of the items on the
	 * display list. Then, if necessary, add that DisplayObjectContainer instance to the Stage.
	 * @param	child	The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
	 * @return	The DisplayObject instance that you pass in the
	 *   child parameter.
	 * @throws	ArgumentError Throws if the child is the same as the parent.  Also throws if
	 *   the caller is a child (or grandchild etc.) of the child being added.
	 */
	public addChild (child: DisplayObject): DisplayObject {

		const dispatchAdded = !(child.adaptee.parent == this.adaptee);

		(<AwayDisplayObjectContainer> this._adaptee).addChild((<DisplayObject>child).adaptee);

		if (dispatchAdded) {
			child.dispatchStaticEvent(Event.ADDED, child);
			if (this.adaptee.isOnDisplayList()) {
				child.dispatch_ADDED_TO_STAGE(true);
			}
		}

		OrphanManager.removeOrphan(child.adaptee);
		return child;
	}

	/**
	 * Adds a child DisplayObject instance to this DisplayObjectContainer
	 * instance.  The child is added
	 * at the index position specified. An index of 0 represents the back (bottom)
	 * of the display list for this DisplayObjectContainer object.
	 *
	 *   For example, the following example shows three display objects, labeled a, b, and c, at
	 * index positions 0, 2, and 1, respectively
	 * If you add a child object that already has a different display object container as
	 * a parent, the object is removed from the child list of the other display object container.
	 * @param	child	The DisplayObject instance to add as a child of this
	 *   DisplayObjectContainer instance.
	 * @param	index	The index position to which the child is added. If you specify a
	 *   currently occupied index position, the child object that exists at that position and all
	 *   higher positions are moved up one position in the child list.
	 * @return	The DisplayObject instance that you pass in the
	 *   child parameter.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @throws	RangeError Throws if the index position does not exist in the child list.
	 * @throws	ArgumentError Throws if the child is the same as the parent.  Also throws if
	 *   the caller is a child (or grandchild etc.) of the child being added.
	 */
	public addChildAt (child: DisplayObject, index: number): DisplayObject {
		const dispatchAdded = !(child.adaptee.parent == this.adaptee);
		// todo: this should be done much more efficient (in awayjs)
		(<AwayDisplayObjectContainer> this.adaptee).addChildAt(child.adaptee, index);
		if (dispatchAdded) {
			child.dispatchStaticEvent(Event.ADDED);
			if (this.adaptee.isOnDisplayList()) {
				child.dispatch_ADDED_TO_STAGE(true);
			}
		}
		return child;
	}

	/**
	 * Indicates whether the security restrictions
	 * would cause any display objects to be omitted from the list returned by calling
	 * the DisplayObjectContainer.getObjectsUnderPoint() method
	 * with the specified point point. By default, content from one domain cannot
	 * access objects from another domain unless they are permitted to do so with a call to the
	 * Security.allowDomain() method. For more information, related to security,
	 * see the Flash Player Developer Center Topic:
	 * Security.
	 *
	 *   The point parameter is in the coordinate space of the Stage,
	 * which may differ from the coordinate space of the display object container (unless the
	 * display object container is the Stage). You can use the globalToLocal() and
	 * the localToGlobal() methods to convert points between these coordinate
	 * spaces.
	 * @param	point	The point under which to look.
	 * @return	true if the point contains child display objects with security restrictions.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 */
	public areInaccessibleObjectsUnderPoint (point: Point): boolean {
		// @todo
		Debug.throwPIR('playerglobals/display/DisplayObjectContainer', 'areInaccessibleObjectsUnderPoint', '');
		return false;
	}

	/**
	 * Determines whether the specified display object is a child of the DisplayObjectContainer instance or
	 * the instance itself.
	 * The search includes the entire display list including this DisplayObjectContainer instance. Grandchildren,
	 * great-grandchildren, and so on each return true.
	 * @param	child	The child object to test.
	 * @return	true if the child object is a child of the DisplayObjectContainer
	 *   or the container itself; otherwise false.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 */
	public contains(child: DisplayObject): boolean {
		return (<AwayDisplayObjectContainer> this._adaptee).contains(child.adaptee);
	}

	/**
	 * Returns the child display object instance that exists at the specified index.
	 * @param	index	The index position of the child object.
	 * @return	The child display object at the specified index position.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @throws	RangeError Throws if the index does not exist in the child list.
	 * @throws	SecurityError This child display object belongs to a sandbox
	 *   to which you do not have access. You can avoid this situation by having
	 *   the child movie call Security.allowDomain().
	 */
	public getChildAt (index: number): DisplayObject {

		const child = (<AwayDisplayObjectContainer> this._adaptee).getChildAt(index);
		if (!child.adapter || child.adapter == child) {
			// todo: this looks like it might cause trouble:
			// it adds a Sprite-adapter to the child, regardsless what type the child really is
			const sprite = child.adapter = new (<SecurityDomain> this.sec).flash.display.Sprite();
			sprite.adaptee = child;
		}

		return <DisplayObject>child.adapter;
	}

	/**
	 * Returns the child display object that exists with the specified name.
	 * If more that one child display object has the specified name,
	 * the method returns the first object in the child list.
	 *
	 *   The getChildAt() method is faster than the
	 * getChildByName() method. The getChildAt() method accesses
	 * a child from a cached array, whereas the getChildByName() method
	 * has to traverse a linked list to access a child.
	 * @param	name	The name of the child to return.
	 * @return	The child display object with the specified name.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @throws	SecurityError This child display object belongs to a sandbox
	 *   to which you do not have access. You can avoid this situation by having
	 *   the child movie call the Security.allowDomain() method.
	 */
	public getChildByName (name: string): DisplayObject {
		return (<AwayDisplayObjectContainer> this._adaptee).getChildByName(name) ?
			(<DisplayObject>(<AwayDisplayObjectContainer> this._adaptee).getChildByName(name).adapter) : null;
	}

	/**
	 * Returns the index position of a child DisplayObject instance.
	 * @param	child	The DisplayObject instance to identify.
	 * @return	The index position of the child display object to identify.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @throws	ArgumentError Throws if the child parameter is not a child of this object.
	 */
	public getChildIndex (child: DisplayObject): number {
		return (<AwayDisplayObjectContainer> this._adaptee).getChildIndex(child.adaptee);
	}

	/**
	 * Returns an array of objects that lie under the specified point and are children
	 * (or grandchildren, and so on) of this DisplayObjectContainer instance. Any child objects that
	 * are inaccessible for security reasons are omitted from the returned array. To determine whether
	 * this security restriction affects the returned array, call the
	 * areInaccessibleObjectsUnderPoint() method.
	 *
	 *   The point parameter is in the coordinate space of the Stage,
	 * which may differ from the coordinate space of the display object container (unless the
	 * display object container is the Stage). You can use the globalToLocal() and
	 * the localToGlobal() methods to convert points between these coordinate
	 * spaces.
	 * @param	point	The point under which to look.
	 * @return	An array of objects that lie under the specified point and are children
	 *   (or grandchildren, and so on) of this DisplayObjectContainer instance.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 */
	public getObjectsUnderPoint(point: Point): DisplayObject[] {

		const raycastPicker = PickGroup.getInstance(this._stage.view).getRaycastPicker(AVMStage.instance().pool.getNode(this.adaptee).partition);

		const awayChildren: IPartitionEntity[] =
			raycastPicker.getObjectsUnderPoint(
				new Vector3D(0, 0, -1000),
				new Vector3D(point.x, point.y, 1000));
		const avm2Children: DisplayObject[] = [];
		let i = awayChildren.length;
		while (i > 0) {
			i--;
			let child = awayChildren[i];
			if (child instanceof TextSprite) {
				child = child.parent;
			} else if (child.isAsset(AwaySprite) && (<any>child.adapter) == child) {
				child.adapter = new (<any> this.sec).flash.display.Sprite();
				child.adapter.adaptee = child;
			}
			avm2Children.push(<DisplayObject>child.adapter);
		}
		return avm2Children;
	}

	protected _getObjectsUnderPointInternal(point: Point, children: DisplayObject[]) {
		let child: AwayDisplayObject;
		for (let i: number = 0; i < (<AwayDisplayObjectContainer> this._adaptee).numChildren; i++) {
			child = (<AwayDisplayObjectContainer> this._adaptee).getChildAt(i);
			if (child.visible) {

				if (PickGroup.getInstance(this._stage.view)
					.getBoundsPicker(AVMStage.instance().pool.getNode(<AwayDisplayObject>child.adaptee).partition).hitTestPoint(point.x, point.y, true))
					children.push(<DisplayObject> child.adapter);

				const adapt = (<DisplayObjectContainer> child.adapter);
				if (typeof adapt._getObjectsUnderPointInternal !== 'function') {
					//debugger;
				} else {
					adapt._getObjectsUnderPointInternal(point, children);
				}
			}
		}
	}

	/**
	 * Removes the specified child DisplayObject instance from the child list of the DisplayObjectContainer instance.
	 * The parent property of the removed child is set to null
	 * , and the object is garbage collected if no other
	 * references to the child exist. The index positions of any display objects above the child in the
	 * DisplayObjectContainer are decreased by 1.
	 *
	 *   The garbage collector reallocates unused memory space. When a variable
	 * or object is no longer actively referenced or stored somewhere, the garbage collector sweeps
	 * through and wipes out the memory space it used to occupy if no other references to it exist.
	 * @param	child	The DisplayObject instance to remove.
	 * @return	The DisplayObject instance that you pass in the
	 *   child parameter.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @throws	ArgumentError Throws if the child parameter is not a child of this object.
	 */
	public removeChild (child: DisplayObject): DisplayObject {
		try {
			(<AwayDisplayObjectContainer> this._adaptee).removeChild(child.adaptee);
		} catch (e) {
			throw (<SecurityDomain> this.sec).createError('ArgumentError', Errors.NotAChildError);
		}

		return child;
	}

	/**
	 * Removes a child DisplayObject from the specified index position in the child list of
	 * the DisplayObjectContainer. The parent property of the removed child is set to
	 * null, and the object is garbage collected if no other references to the child exist. The index
	 * positions of any display objects above the child in the DisplayObjectContainer are decreased by 1.
	 *
	 *   The garbage collector reallocates unused memory space. When a variable or
	 * object is no longer actively referenced or stored somewhere, the garbage collector sweeps
	 * through and wipes out the memory space it used to occupy if no other references to it exist.
	 * @param	index	The child index of the DisplayObject to remove.
	 * @return	The DisplayObject instance that was removed.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @throws	SecurityError This child display object belongs to a sandbox
	 *   to which the calling object does not have access. You can avoid this situation by having
	 *   the child movie call the Security.allowDomain() method.
	 * @throws	RangeError Throws if the index does not exist in the child list.
	 */
	public removeChildAt (index: number): DisplayObject {
		return (<DisplayObject>(<AwayDisplayObjectContainer> this._adaptee).removeChildAt(index).adapter);
	}

	public removeChildren (beginIndex: number = 0, endIndex: number = 2147483647)  {

		if (endIndex >= (<AwayDisplayObjectContainer> this._adaptee).numChildren) {
			endIndex = (<AwayDisplayObjectContainer> this._adaptee).numChildren - 1;
		}
		(<AwayDisplayObjectContainer> this._adaptee).removeChildren(beginIndex, endIndex + 1);

	}

	/**
	 * Changes the  position of an existing child in the display object container.
	 * This affects the layering of child objects. For example, the following example shows three
	 * display objects, labeled a, b, and c, at index positions 0, 1, and 2, respectively:
	 *
	 *   When you use the setChildIndex() method and specify an index position
	 * that is already occupied, the only positions that change are those in between the display object's
	 * former and new position.
	 * All others will stay the same.
	 * If a child is moved to an index LOWER than its current index,
	 * all children in between will INCREASE by 1 for their index reference.
	 * If a child is moved to an index HIGHER than its current index,
	 * all children in between will DECREASE by 1 for their index reference.
	 * For example, if the display object container
	 * in the previous example is named container, you can swap the position
	 * of the display objects labeled a and b by calling the following code:
	 * <codeblock>
	 * container.setChildIndex(container.getChildAt(1), 0);
	 * </codeblock>
	 * This code results in the following arrangement of objects:
	 * @param	child	The child DisplayObject instance for which you want to change
	 *   the index number.
	 * @param	index	The resulting index number for the child display object.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @throws	RangeError Throws if the index does not exist in the child list.
	 * @throws	ArgumentError Throws if the child parameter is not a child of this object.
	 */
	public setChildIndex (child: DisplayObject, index: number)  {
		const idx = (<AwayDisplayObjectContainer> this.adaptee).getChildIndex(child.adaptee);
		if (idx < 0)
			throw ('[DisplayObjectContainer.setChildindex] \
				- todo: throw as3 error when child is not child of this obj');
		if (idx == index)
			return;
		if (index > (<AwayDisplayObjectContainer> this._adaptee).numChildren)
			throw ('[DisplayObjectContainer.setChildindex] - todo: throw as3 error when index is out of bounds');

		(<AwayDisplayObjectContainer> this.adaptee).setChildIndex(child.adaptee, index);
	}

	public stopAllMovieClips ()  {
		// @todo
		Debug.throwPIR('playerglobals/display/DisplayObjectContainer', 'stopAllMovieClips', '');
	}

	/**
	 * Swaps the z-order (front-to-back order) of the two specified child objects.  All other child
	 * objects in the display object container remain in the same index positions.
	 * @param	child1	The first child object.
	 * @param	child2	The second child object.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @throws	ArgumentError Throws if either child parameter is not a child of this object.
	 */
	public swapChildren (child1: DisplayObject, child2: DisplayObject) {
		(<AwayDisplayObjectContainer> this._adaptee).swapChildren(child1.adaptee, child2.adaptee);
	}

	/**
	 * Swaps the z-order (front-to-back order) of the child objects at the two specified index positions in the
	 * child list. All other child objects in the display object container remain in the same index positions.
	 * @param	index1	The index position of the first child object.
	 * @param	index2	The index position of the second child object.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @throws	RangeError If either index does not exist in the child list.
	 */
	public swapChildrenAt (index1: number, index2: number)  {
		(<AwayDisplayObjectContainer> this._adaptee).swapChildrenAt(index1, index2);
	}
}
