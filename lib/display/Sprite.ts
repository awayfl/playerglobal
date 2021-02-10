import { Sprite as AwaySprite, DisplayObjectContainer as AwayDisplayObjectContainer,
	DisplayObject as AwayDisplayObject, MovieClip as AwayMovieClip,
	FrameScriptManager, MovieClip, Timeline,
	IDisplayObjectAdapter,
	MouseEvent } from '@awayjs/scene';
import { DisplayObjectContainer } from './DisplayObjectContainer';
import { DisplayObject } from './DisplayObject';
import { Rectangle, Point, Debug } from '@awayjs/core';
import { Graphics } from './Graphics';
import { IVirtualSceneGraphItem } from './IVirtualSceneGraphItem';
import { constructClassFromSymbol } from '@awayfl/avm2';
import { SecurityDomain } from '../SecurityDomain';
import { release, AVMStage } from '@awayfl/swf-loader';
import { ContainerEvent, EntityNode, PickEntity } from '@awayjs/view';

export class Sprite extends DisplayObjectContainer {

	private static _sprites: Array<Sprite> = new Array<Sprite>();

	public static getNewSprite(adaptee: AwaySprite): Sprite {
		if (Sprite._sprites.length) {
			const sprite: Sprite = Sprite._sprites.pop();
			sprite.adaptee = adaptee;
			return sprite;
		}

		return new Sprite();
	}

	public initAdapter(): void {}
	private _graphics: Graphics;

	/**
	 * The Sprite class is a basic display list building block: a display list node that can display
	 * graphics and can also contain children.
	 *
	 *   <p class="- topic/p ">A Sprite object is similar to a movie clip, but does not have a timeline. Sprite is an
	 * appropriate base class for objects that do not require timelines. For example, Sprite would be a
	 * logical base class for user numbererface (UI) components that typically do not use the timeline.</p>
	 * <p class="- topic/p ">The Sprite class is new in ActionScript 3.0.
	 * It provides an alternative to the functionality of
	 * the MovieClip class, which retains all the functionality of previous ActionScript releases to
	 * provide backward compatibility.</p>
	 *
	 * Creates a new Sprite instance. After you create the Sprite instance, call the
	 * DisplayObjectContainer.addChild() or DisplayObjectContainer.addChildAt()
	 * method to add the Sprite to a parent DisplayObjectContainer.
	 */
	constructor() {
		super();
		this.dragListenerDelegate = (event) => this.dragListener(event);
		this.stopDragDelegate = (event) => this.stopDrag(event);
		this._graphics = new (<SecurityDomain> this.sec).flash.display.Graphics((<AwaySprite> this._adaptee).graphics);
	}

	protected createAdaptee(): AwayDisplayObject {
		const newAdaptee = AwaySprite.getNewSprite();

		//console.log("createAdaptee AwaySprite");
		newAdaptee.reset();
		//FrameScriptManager.execute_queue();
		return newAdaptee;
	}

	public addTimelineChildAtDepth(child: AwayDisplayObject, depth: number): AwayDisplayObject {

		child.reset();

		const children = (<AwayDisplayObjectContainer> this.adaptee)._children;
		const maxIndex = children.length - 1;
		let index = maxIndex + 1;
		let scriptChildsOffset = 0;
		for (let i = maxIndex; i >= 0; i--) {
			const current = children[i];
			if (current._avmDepthID == -1) {
				scriptChildsOffset++;
			}
			if (current._avmDepthID > -1) {
				if (current._avmDepthID < depth) {
					index = i + 1 + scriptChildsOffset;
					break;
				}
				scriptChildsOffset = 0;
				index = i;
			}
		}
		child._avmDepthID = depth;

		(<any>child).just_added_to_timeline = true;
		(<AwayMovieClip> this.adaptee)._sessionID_childs[child._sessionID] = child;
		return (<AwayMovieClip> this.adaptee).addChildAt(child, index);
	}

	public removeTimelineChildAt(value: number): void {
		// in as3 we remove by sessionID
		const child = (<AwayMovieClip> this.adaptee)._sessionID_childs[value];
		if (child) {
			delete (<AwayMovieClip> this.adaptee)._sessionID_childs[value];
			(<AwayMovieClip> this.adaptee).removeChild(child);
		}
	}

	public removeAllTimelineChilds(): void {
		const adaptee: AwayMovieClip = <AwayMovieClip> this.adaptee;
		for (const key in adaptee._sessionID_childs) {
			const child = adaptee._sessionID_childs[key];

			if (child) {
				delete adaptee._sessionID_childs[key];
				adaptee.removeChild(child);

			}
		}
	}

	/**
	 * queue the mc for executing framescripts
	 * this only queues the frame-index as a number,
	 * the actual framescripts will be retrieved in MovieClip.executeScripts
	 * @param timeline
	 * @param frame_idx
	 * @param scriptPass1
	 */
	public queueFrameScripts(timeline: Timeline, frame_idx: number, scriptPass1: boolean) {
		//console.log("add framescript", target_mc, target_mc.name, keyframe_idx, scriptPass1 );
		if (scriptPass1)
			FrameScriptManager.add_script_to_queue(<AwayMovieClip> this.adaptee, frame_idx);
		else
			FrameScriptManager.add_script_to_queue_pass2(<AwayMovieClip> this.adaptee, frame_idx);
	}

	public constructFrame(timeline: Timeline, start_construct_idx: number,
		target_keyframe_idx: number, jump_forward: boolean,
		frame_idx: number, queue_pass2: boolean, queue_script: boolean) {

		const adaptee: AwayMovieClip = <AwayMovieClip> this.adaptee;
		let len = adaptee._children.length;

		let virtualSceneGraph = [];
		const existingSessionIDs = {};

		for (let i = 0; i < len; i++) {
			// collect the existing children into a virtual-scenegraph
			const child = adaptee._children[i];
			// if jumping forward, we continue from current frame, so we collect all objects
			// if jumping back, we want to only collect script-children. timeline childs are ignored
			if (jump_forward || child._sessionID == -1) {
				virtualSceneGraph[virtualSceneGraph.length] = {
					sessionID:child._sessionID,
					as3DepthID:child._avmDepthID,
					addedOnTargetFrame:false,
					child:child
				};
			}
			if (child._sessionID != -1)
				existingSessionIDs[child._sessionID] = child;
		}

		let i: number;
		let k: number;

		if (this['$Bg__setPropDict']) {
			this.clearPropsDic();
		}

		// step1: apply remove / add commands to virtual scenegraph. collect update commands aswell

		timeline._update_indices.length = 0;
		timeline._update_frames.length = 0;
		let update_cnt = 0;
		let start_index: number;
		let end_index: number;
		for (k = start_construct_idx; k <= target_keyframe_idx; k++) {
			let frame_command_idx: number = timeline.frame_command_indices[k];
			const frame_recipe: number = timeline.frame_recipe[k];

			if (frame_recipe & 2) {
				start_index = timeline.command_index_stream[frame_command_idx];
				end_index = start_index + timeline.command_length_stream[frame_command_idx++];
				const removeSessionIDs = {};
				for (i = start_index; i < end_index; i++) {
					removeSessionIDs[timeline.remove_child_stream[i]] = true;
				}
				const newVirtualSceneGraph = [];
				len = virtualSceneGraph.length;
				for (let i = 0; i < len; i++) {
					if (!removeSessionIDs[virtualSceneGraph[i].sessionID])
						newVirtualSceneGraph[newVirtualSceneGraph.length] = virtualSceneGraph[i];
				}
				virtualSceneGraph = newVirtualSceneGraph;
			}
			if (frame_recipe & 4) {
				start_index = timeline.command_index_stream[frame_command_idx];
				end_index = start_index + timeline.command_length_stream[frame_command_idx++];
				for (i = start_index; i < end_index; i++) {
					const maxIndex = virtualSceneGraph.length - 1;
					const depth = timeline.add_child_stream[i * 3 + 1];
					let index = maxIndex + 1;
					let scriptChildsOffset = 0;
					for (let i = maxIndex; i >= 0; i--) {
						const current = virtualSceneGraph[i];
						if (current.as3DepthID == -1) {
							scriptChildsOffset++;
						}
						if (current.as3DepthID > -1) {
							if (current.as3DepthID ==  depth &&
								current.sessionID == timeline.add_child_stream[i * 3]) {
								index = -1;
								break;
							}
							if (current.as3DepthID < depth) {
								index = i + 1 + scriptChildsOffset;
								break;
							}
							scriptChildsOffset = 0;
							index = i;
						}
					}
					if (index >= virtualSceneGraph.length) {
						virtualSceneGraph[virtualSceneGraph.length] = {
							sessionID:timeline.add_child_stream[i * 3],
							addedOnTargetFrame:k == target_keyframe_idx,
							symbolID:timeline.add_child_stream[i * 3 + 2],
							as3DepthID:timeline.add_child_stream[i * 3 + 1],
						};
					} else if (index > -1) {
						virtualSceneGraph.splice(index, 0, {
							sessionID:timeline.add_child_stream[i * 3],
							addedOnTargetFrame:k == target_keyframe_idx,
							symbolID:timeline.add_child_stream[i * 3 + 2],
							as3DepthID:timeline.add_child_stream[i * 3 + 1],
						});
					}
				}
			}
			if (frame_recipe & 8) {
				timeline._update_frames[update_cnt] = timeline.keyframe_firstframes[k];
				timeline._update_indices[update_cnt++] = frame_command_idx++;// execute update command later
			}

			if (frame_recipe & 16 && k == target_keyframe_idx) {
				timeline.start_sounds(adaptee, frame_command_idx);
			}
		}

		const newChildren: AwayDisplayObject[] = [];
		let vsItem: IVirtualSceneGraphItem;
		const newChilds: AwayDisplayObject[] = [];
		const newChildsOnTargetFrame: AwayDisplayObject[] = [];

		// step2: build new list of children from virtual-scenegraph

		adaptee._sessionID_childs = {};
		len = newChildren.length = virtualSceneGraph.length;
		for (let i = 0; i < len; i++) {
			vsItem = virtualSceneGraph[i];
			if (vsItem.sessionID == -1 && vsItem.child) {
				// this must be a script child
				newChildren[i] = vsItem.child.adaptee;
			} else if (existingSessionIDs[vsItem.sessionID]) {
				//	the same sessionID already is child of the mc
				const existingChild = existingSessionIDs[vsItem.sessionID];
				adaptee._sessionID_childs[vsItem.sessionID] = existingChild;
				newChildren[i] = existingChild;
				//console.log("vsItem.exists", vsItem);
				if (!jump_forward) {
					if (newChildren[i]._adapter) {
						if (!(<IDisplayObjectAdapter> newChildren[i].adapter).isColorTransformByScript()) {
							newChildren[i].transform.clearColorTransform();
						}
						if (!(<IDisplayObjectAdapter> newChildren[i].adapter).isBlockedByScript()
							&& !(<any>newChildren[i]).noTimelineUpdate) {
							newChildren[i].transform.clearMatrix3D();
							newChildren[i].masks = null;
							newChildren[i].maskMode = false;
						}
						if (!(<IDisplayObjectAdapter> newChildren[i].adapter).isVisibilityByScript()) {
							newChildren[i].visible = true;
						}
					} else {
						newChildren[i].transform.clearColorTransform();
						newChildren[i].transform.clearMatrix3D();
						newChildren[i].visible = true;
						newChildren[i].masks = null;
						newChildren[i].maskMode = false;
					}
				}
			} else {
				const newChild = <AwayDisplayObject>timeline.getChildInstance(vsItem.symbolID, vsItem.sessionID);
				if (this.adaptee.isSlice9ScaledMC && newChild.assetType == '[asset Sprite]') {
					newChild.isSlice9ScaledSprite = true;
				}
				newChild._sessionID = vsItem.sessionID;
				newChild._avmDepthID = vsItem.as3DepthID;
				adaptee._sessionID_childs[vsItem.sessionID] = newChild;
				newChildren[i] = newChild;
				if (vsItem.addedOnTargetFrame) {
					newChildsOnTargetFrame[newChildsOnTargetFrame.length] = newChild;
				} else {
					newChilds[newChilds.length] = newChild;
				}
			}
		}

		// step3: remove children that no longer exists

		for (let i = adaptee._children.length - 1; i >= 0; i--) {
			if (newChildren.indexOf(adaptee._children[i]) < 0) {
				adaptee.removeChildAt(i);
			}
		}

		// step4: setup new children that have not been added on new frame (prevent frame-scripts)

		for (let i = 0; i < newChildren.length; i++) {
			if (adaptee._children.indexOf(newChildren[i]) < 0) {
				adaptee.addChildAt(newChildren[i], i);
			}
		}
		adaptee.preventScript = true;
		this.finalizeChildren(newChilds);

		// step5: queue frame-script for new frame
		if (queue_script)
			this.queueFrameScripts(timeline, frame_idx, !queue_pass2);

		// step6: setup children that have been added on new frame (allow frame-scripts)
		adaptee.preventScript = true;
		this.finalizeChildren(newChildsOnTargetFrame);
	}

	public finalizeChildren(children: AwayDisplayObject[]) {
		const len = children.length;
		for (let i = 0; i < len; i++) {
			const newChild = children[i];
			(<any>newChild).just_added_to_timeline = true;
			newChild.reset();
		}
	}

	//---------------------------stuff added to make it work:

	public registerScriptObject(child: AwayDisplayObject): void {
		if (child.adapter == child) {
			release || console.log('warning: child registered for script that has no avms-adapter');
			return;
		}
		if (child.name) {
			this[child.name] = child._adapter ? child.adapter : child;

			this.axSetPublicProperty(child.name, child.adapter);
		}
	}

	public unregisterScriptObject(child: AwayDisplayObject): void {
		delete this[child.name];

		if (child.isAsset(AwayMovieClip))
			(<AwayMovieClip>child).removeButtonListeners();
	}

	public clearPropsDic() {
		//this["$Bg__setPropDict"].map = new WeakMap();
	}

	public clone(): Sprite {

		if (!(<any> this)._symbol) {
			throw ('_symbol not defined when cloning movieclip');
		}
		const clone = constructClassFromSymbol((<any> this)._symbol, (<any> this)._symbol.symbolClass);
		const adaptee = new AwaySprite();
		this.adaptee.copyTo(adaptee);
		clone.adaptee = adaptee;
		clone._stage = this.activeStage;
		(<any>clone).executeConstructor = () => {
			(<any>clone).axInitializer();
			(<any> this).constructorHasRun = true;
			/*if(clone["$Bg__setPropDict"]){
				console.log("Bg__setPropDict found");
			}*/
		};
		clone.adaptee.graphics = this.graphics;

		// in FP, a Sprite seem to always have only 1 frame:
		const timeline = (<AwayMovieClip>adaptee).timeline;
		const targetTimeline = timeline;

		targetTimeline.frame_command_indices = <any>[timeline.frame_command_indices[0]];
		targetTimeline.frame_recipe = <any>[timeline.frame_recipe[0]];
		targetTimeline.keyframe_constructframes = [timeline.keyframe_constructframes[0]];
		targetTimeline.keyframe_durations = <any>[timeline.keyframe_durations[0]];
		targetTimeline.keyframe_firstframes = [timeline.keyframe_firstframes[0]];
		targetTimeline.keyframe_indices = [timeline.keyframe_indices[0]];

		return clone;
	}

	/**
	 * @inheritDoc
	 */
	public dispose(): void {
		this.disposeValues();

		//Sprite._sprites.push(this);
	}

	//---------------------------original as3 properties / methods:

	/**
	 * Specifies the button mode of this sprite. If true, this
	 * sprite behaves as a button, which means that it triggers the display
	 * of the hand cursor when the ponumberer passes over the sprite and can
	 * receive a click event if the enter or space keys are pressed
	 * when the sprite has focus. You can suppress the display of the hand cursor
	 * by setting the useHandCursor property to false,
	 * in which case the ponumberer is displayed.
	 *
	 *   Although it is better to use the SimpleButton class to create buttons,
	 * you can use the buttonMode property to give a sprite
	 * some button-like functionality. To include a sprite in the tab order,
	 * set the tabEnabled property (inherited from the
	 * numbereractiveObject class and false by default) to
	 * true. Additionally, consider whether you want
	 * the children of your sprite to be user input enabled. Most buttons
	 * do not enable user input numbereractivity for their child objects because
	 * it confuses the event flow. To disable user input numbereractivity for all child
	 * objects, you must set the mouseChildren property (inherited
	 * from the DisplayObjectContainer class) to false.
	 * If you use the buttonMode property with the MovieClip class (which is a
	 * subclass of the Sprite class), your button might have some added
	 * functionality. If you include frames labeled _up, _over, and _down,
	 * Flash Player provides automatic state changes (functionality
	 * similar to that provided in previous versions of ActionScript for movie
	 * clips used as buttons). These automatic state changes are
	 * not available for sprites, which have no timeline, and thus no frames
	 * to label.
	 */
	public get buttonMode(): boolean {
		return (<MovieClip> this.adaptee).buttonMode;
	}

	public set buttonMode(value: boolean) {
		(<MovieClip> this.adaptee).buttonMode = value;
	}

	private _dropTarget: DisplayObject;
	public setDropTarget(dropTarget: AwayDisplayObject) {
		if (dropTarget) {
			this._dropTarget = <DisplayObject>dropTarget.adapter;
			return;

		}
		this._dropTarget = null;
	}

	/**
	 * Specifies the display object over which the sprite is being dragged, or on
	 * which the sprite was dropped.
	 */
	public get dropTarget(): DisplayObject {
		return this._dropTarget;

	}

	/**
	 * Specifies the Graphics object that belongs to this sprite where vector
	 * drawing commands can occur.
	 */
	public get graphics(): Graphics {
		return this._graphics;
	}

	/**
	 * Designates another sprite to serve as the hit area for a sprite. If the hitArea
	 * property does not exist or the value is null or undefined, the
	 * sprite itself is used as the hit area. The value of the hitArea property can
	 * be a reference to a Sprite object.
	 *
	 *   You can change the hitArea property at any time; the modified sprite immediately
	 * uses the new hit area behavior. The sprite designated as the hit area does not need to be
	 * visible; its graphical shape, although not visible,
	 * is still detected as the hit area.Note: You must set to false the mouseEnabled
	 * property of the sprite designated as the hit area. Otherwise, your sprite button might
	 * not work because the sprite designated as the hit area receives the user input events instead
	 * of your sprite button.
	 */
	public get hitArea(): Sprite {
		return <Sprite> this.adaptee.pickObject.adapter;
	}

	public set hitArea(value: Sprite) {
		this.adaptee.pickObject = <AwayDisplayObjectContainer>value.adaptee;
	}

	/**
	 * Controls sound within this sprite.
	 *
	 *   Note: This property does not affect HTML content in an HTMLControl object (in Adobe AIR).
	 */
	public get soundTransform(): any {
		// @todo
		Debug.throwPIR('playerglobals/display/Sprite', 'get soundTransform', '');
		return null;
	}

	public set soundTransform(sndTransform: any) {
		// @todo
		Debug.throwPIR('playerglobals/display/Sprite', 'set soundTransform', '');
	}

	/**
	 * A boolean value that indicates whether the ponumbering hand (hand cursor) appears when the ponumberer rolls
	 * over a sprite in which the buttonMode property is set to true.
	 * The default value of the useHandCursor property is true.
	 * If useHandCursor is set to true, the ponumbering hand used for buttons
	 * appears when the ponumberer rolls over a button sprite. If useHandCursor is
	 * false, the arrow ponumberer is used instead.
	 *
	 *   You can change the useHandCursor property at any time; the modified sprite
	 * immediately takes on the new cursor appearance. Note: In Flex or Flash Builder,
	 * if your sprite has child sprites, you might want to
	 * set the mouseChildren property to false. For example, if you want a hand
	 * cursor to appear over a Flex <mx:Label> control, set the useHandCursor and
	 * buttonMode properties to true, and the mouseChildren property
	 * to false.
	 */
	public get useHandCursor(): boolean {
		return (<AwayMovieClip> this.adaptee)._useHandCursor;
	}

	public set useHandCursor(value: boolean) {
		(<AwayMovieClip> this.adaptee)._useHandCursor = value;
	}

	/**
	 * Lets the user drag the specified sprite. The sprite remains draggable until explicitly
	 * stopped through a call to the Sprite.stopDrag() method, or until
	 * another sprite is made draggable. Only one sprite is draggable at a time.
	 * Three-dimensional display objects follow the ponumberer and
	 * Sprite.startDrag() moves the object within
	 * the three-dimensional plane defined by the display object. Or, if the display object is a two-dimensional object
	 * and the child of a three-dimensional object, the two-dimensional object
	 * moves within the three dimensional plane defined by the three-dimensional parent object.
	 * @param	lockCenter	Specifies whether the draggable sprite is locked to the center of
	 *   the ponumberer position (true), or locked to the ponumber where the user first clicked the
	 *   sprite (false).
	 * @param	bounds	Value relative to the coordinates of the Sprite's parent that specify a constranumber
	 *   rectangle for the Sprite.
	 */
	public startDrag(lockCenter: boolean = false, bounds: Rectangle = null) {
		if (Sprite.currentDraggedMC && Sprite.currentDraggedMC != this) {
			Sprite.currentDraggedMC.stopDrag();
		}
		Sprite.currentDraggedMC = this;
		this._dragBounds = bounds;
		if (!this.isDragging) {
			this.isDragging = true;
			this.startDragPoint =
			AVMStage.instance().pool.getNode(this._adaptee.parent).globalToLocal(new Point(this.stage.mouseX, this.stage.mouseY));
			if (lockCenter) {
				this.adaptee.x = this.startDragPoint.x;
				this.adaptee.y = this.startDragPoint.y;
			}
			if (this._dragBounds)
				this.checkBounds();
			this.startDragMCPosition.x = this.adaptee.x;
			this.startDragMCPosition.y = this.adaptee.y;
			//window.addEventListener("mouseup", this.stopDragDelegate);
			//window.addEventListener("touchend", this.stopDragDelegate);
			const avmStage = AVMStage.instance();
			const dragNode = avmStage.pool.getNode(this.adaptee);
			avmStage.mousePicker.dragNode = dragNode;
			avmStage.mouseManager.startDragObject(
				this.adaptee
					.getAbstraction<EntityNode>(dragNode.partition)
					.getAbstraction<PickEntity>(avmStage.mousePicker.pickGroup).pickingCollision);
			avmStage.view.stage.addEventListener(MouseEvent.MOUSE_MOVE, this.dragListenerDelegate);
		}
	}

	public checkBounds() {

		if (this.adaptee.x < (this._dragBounds.left)) {
			this.adaptee.x = this._dragBounds.left;
		}
		if (this.adaptee.x > (this._dragBounds.right)) {
			this.adaptee.x = (this._dragBounds.right);
		}
		if (this.adaptee.y < this._dragBounds.top) {
			this.adaptee.y = this._dragBounds.top;
		}
		if (this.adaptee.y > (this._dragBounds.bottom)) {
			this.adaptee.y = this._dragBounds.bottom;
		}
	}

	private isDragging: boolean = false;
	private static currentDraggedMC: Sprite = null;
	private startDragPoint: Point = new Point();
	private startDragMCPosition: Point = new Point();
	private _dragBounds: any;
	public dragListenerDelegate: (e) => void;

	public dragListener(e) {
		//console.log("drag", e);

		if (this.adaptee.parent) {
			const tmpPoint = AVMStage.instance().pool.getNode(this._adaptee.parent).globalToLocal(
				new Point(this.stage.mouseX, this.stage.mouseY));

			this.adaptee.x = this.startDragMCPosition.x + (tmpPoint.x - this.startDragPoint.x);
			this.adaptee.y = this.startDragMCPosition.y + (tmpPoint.y - this.startDragPoint.y);

			if (this._dragBounds)
				this.checkBounds();

		}
	}

	/**
	 * Lets the user drag the specified sprite on a touch-enabled device. The sprite remains draggable until explicitly
	 * stopped through a call to the Sprite.stopTouchDrag() method, or until
	 * another sprite is made draggable. Only one sprite is draggable at a time.
	 * Three-dimensional display objects follow the ponumberer and
	 * Sprite.startTouchDrag() moves the object within
	 * the three-dimensional plane defined by the display object. Or, if the display object is a two-dimensional object
	 * and the child of a three-dimensional object, the two-dimensional object
	 * moves within the three dimensional plane defined by the three-dimensional parent object.
	 * @param	touchPonumberID	An numbereger to assign to the touch ponumber.
	 * @param	lockCenter	Specifies whether the draggable sprite is locked to the center of
	 *   the ponumberer position (true), or locked to the ponumber where the user first clicked the
	 *   sprite (false).
	 * @param	bounds	Value relative to the coordinates of the Sprite's parent that specify a constranumber
	 *   rectangle for the Sprite.
	 */
	public startTouchDrag(touchPonumberID: number, lockCenter: boolean = false, bounds: Rectangle = null) {
		// @todo
		Debug.throwPIR('playerglobals/display/Sprite', 'startTouchDrag', '');
	}

	/**
	 * Ends the startDrag() method. A sprite that was made draggable with the
	 * startDrag() method remains draggable until a
	 * stopDrag() method is added, or until another
	 * sprite becomes draggable. Only one sprite is draggable at a time.
	 */

	public stopDragDelegate: (e) => void;
	public stopDrag(e = null) {
		if (Sprite.currentDraggedMC && Sprite.currentDraggedMC != this) {
			Sprite.currentDraggedMC.stopDrag();
		}
		this.isDragging = false;
		Sprite.currentDraggedMC = null;
		const avmStage = AVMStage.instance();
		avmStage.mousePicker.dragNode = null;
		avmStage.mouseManager.stopDragObject();
		avmStage.view.stage.removeEventListener(MouseEvent.MOUSE_MOVE, this.dragListenerDelegate);
		//window.removeEventListener("mouseup", this.stopDragDelegate);
		//window.removeEventListener("touchend", this.stopDragDelegate);
	}

	/**
	 * Ends the startTouchDrag() method, for use with touch-enabled devices. A sprite that was made draggable with the
	 * startTouchDrag() method remains draggable until a
	 * stopTouchDrag() method is added, or until another
	 * sprite becomes draggable. Only one sprite is draggable at a time.
	 * @param	touchPonumberID	The numbereger assigned to the touch ponumber in the startTouchDrag method.
	 */
	public stopTouchDrag(touchPonumberID: number) {
		// @todo
		Debug.throwPIR('playerglobals/display/Sprite', 'stopTouchDrag', '');
	}

}