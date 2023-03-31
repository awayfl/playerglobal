import { DisplayObject } from './DisplayObject';
import { SoundTransform } from '../media/SoundTransform';
import { MovieClip } from './MovieClip';
import { Timeline, DisplayObjectContainer as AwayDisplayObjectContainer,
	DisplayObject as AwayDisplayObject, IDisplayObjectAdapter, FrameScriptManager, IMovieClipAdapter } from '@awayjs/scene';
import { MovieClip as AwayMovieClip } from '@awayjs/scene';
import { IVirtualSceneGraphItem } from './IVirtualSceneGraphItem';
import { AssetBase, Debug } from '@awayjs/core';
import { InteractiveObject } from './InteractiveObject';
import { constructClassFromSymbol } from '@awayfl/avm2';

/**
 * The SimpleButton class lets you control all instances of button symbols in a SWF
 * file.
 *
 *   <p class="- topic/p ">In Flash Professional, you can give a button an instance name in the
 * Property inspector. SimpleButton instance names are displayed in the Movie
 * Explorer and in the Insert Target Path dialog box in the Actions
 * panel. After you create an instance of a button in Flash Professional, you can
 * use the methods and properties of the SimpleButton class to manipulate buttons
 * with ActionScript.</p><p class="- topic/p ">In ActionScript 3.0,
 * you use the <codeph class="+ topic/ph pr-d/codeph ">new SimpleButton()</codeph> constructor to create a
 * SimpleButton instance.</p><p class="- topic/p ">The SimpleButton class inherits from the InteractiveObject class.</p>
 *
 *   EXAMPLE:
 *
 *   The following example uses the SimpleButtonExample class, which in
 * turn uses the CustomSimpleButton class, and this class then instantiates four
 * ButtonDisplayState objects.  The result is a button that is created in the shape of
 * a square, whose background color changes based on the mouse state by overriding instance properties of
 * the SimpleButton class.  This is accomplished by performing the following steps:
 * <ol class="- topic/ol ">
 * <li class="- topic/li ">In the <codeph class="+ topic/ph pr-d/codeph ">SimpleButtonExample()</codeph>
 * constructor, a new CustomSimpleButton object of type
 * SimpleButton, called <codeph class="+ topic/ph pr-d/codeph ">button</codeph>,
 * is created, which calls the <codeph class="+ topic/ph pr-d/codeph ">CustomSimpleButton</codeph> constructor
 * method.  The <codeph class="+ topic/ph pr-d/codeph ">button</codeph> object is the added to the display list.
 * The button's color and size are
 * determined in the steps that follow.</li><li class="- topic/li ">
 * In the CustomSimpleButton class, instance properties are declared that are later used
 * to control the size and background color of <codeph class="+ topic/ph pr-d/codeph ">button</codeph>,
 * based on the state it is in (orange
 * in the normal state, dark yellow in the mouse over state, an light blue in the mouse down state).
 * In all of the <codeph class="+ topic/ph pr-d/codeph ">button</codeph>'s states,
 * the size of the square is set to 80 pixels by using the
 * <codeph class="+ topic/ph pr-d/codeph ">size</codeph> property.</li>
 * <li class="- topic/li ">The constructor function for the CustomSimpleButton class sets the
 * <codeph class="+ topic/ph pr-d/codeph ">downState</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">overState</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">upState</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">hitTestState</codeph>,
 * and <codeph class="+ topic/ph pr-d/codeph ">useHandCursor</codeph> properties with
 * four instances of the ButtonDisplayState class.</li>
 * <li class="- topic/li ">In the ButtonDisplayState class, the constructor sets the value of the
 * square's size and background color and calls the
 * <codeph class="+ topic/ph pr-d/codeph ">draw()</codeph> method.</li>
 * <li class="- topic/li ">The <codeph class="+ topic/ph pr-d/codeph ">draw()</codeph>
 * method redraws the square with the size and background color set in
 * the constructor based on the button's state.</li>
 * </ol><codeblock xml:space="preserve" class="+ topic/pre pr-d/codeblock ">

 */
export class SimpleButton extends InteractiveObject {
	/**
	 * Creates a new SimpleButton instance. Any or all of the display objects that represent
	 * the various button states can be set as parameters in the constructor.
	 * @param	upState	The initial value for the SimpleButton up state.
	 * @param	overState	The initial value for the SimpleButton over state.
	 * @param	downState	The initial value for the SimpleButton down state.
	 * @param	hitTestState	The initial value for the SimpleButton hitTest state.
	 */
	constructor (upState: DisplayObject = null,
		overState: DisplayObject = null,
		downState: DisplayObject = null,
		hitTestState: DisplayObject = null) {
		super();
		(<AwayMovieClip> this._adaptee).addButtonListeners();
	}

	// todo: this methods are also defined on Sprite
	// in avm2 SimpleButton extends from InteractiveObject, not from MovieClip/Sprite

	public addTimelineChildAtDepth(child: AwayDisplayObject, depth: number): AwayDisplayObject {

		child.reset();

		const maxIndex = (<AwayDisplayObjectContainer> this.adaptee).numChildren - 1;
		let index = maxIndex + 1;
		let scriptChildsOffset = 0;
		for (let i = maxIndex; i >= 0; i--) {
			const current = (<AwayDisplayObjectContainer> this.adaptee).getChildAt(i);
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

	public constructFrame(timeline: Timeline, start_construct_idx: number,
		target_keyframe_idx: number, jump_forward: boolean,
		frame_idx: number, queue_pass2: boolean, queue_script: boolean) {

		const adaptee: AwayMovieClip = <AwayMovieClip> this.adaptee;
		let len = adaptee.numChildren;

		let virtualSceneGraph = [];
		const existingSessionIDs = {};

		for (let i = 0; i < len; i++) {
			// collect the existing children into a virtual-scenegraph
			const child = adaptee.getChildAt(i);
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
							newChildren[i].updateTimelineMask(null);
						}
						if (!(<IDisplayObjectAdapter> newChildren[i].adapter).isVisibilityByScript()) {
							newChildren[i].visible = true;
						}
					} else {
						newChildren[i].transform.clearColorTransform();
						newChildren[i].transform.clearMatrix3D();
						newChildren[i].visible = true;
						newChildren[i].updateTimelineMask(null);
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

		for (let i = adaptee.numChildren - 1; i >= 0; i--) {
			if (newChildren.indexOf(adaptee.getChildAt(i)) < 0) {
				adaptee.removeChildAt(i);
			}
		}

		// step4: setup new children that have not been added on new frame (prevent frame-scripts)

		for (let i = 0; i < newChildren.length; i++)
			if (!adaptee.contains(newChildren[i]))
				adaptee.addChildAt(newChildren[i], i);

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
			newChild.reset();
		}
	}

	public initAdapter(): void {}
	public registerScriptObject(child: any): void {
	}

	public unregisterScriptObject(child: any): void {
	}

	public clearPropsDic() {
		//this["$Bg__setPropDict"].map = new WeakMap();
	}

	/**
	 * Specifies a display object that is used as the visual
	 * object for the button "Down" state —the state that the button is in when the user
	 * selects the hitTestState object.
	 */
	public get downState (): DisplayObject {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'get downState', '');
		return null;

	}

	public set downState (value: DisplayObject) {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'set downState', '');

	}

	/**
	 * A Boolean value that specifies whether a button is enabled. When a
	 * button is disabled (the enabled property is set to false),
	 * the button is visible but cannot be clicked. The default value is
	 * true. This property is useful if you want to
	 * disable part of your navigation; for example, you might want to disable a
	 * button in the currently displayed page so that it can't be clicked and
	 * the page cannot be reloaded.
	 *
	 *   Note: To prevent mouseClicks on a button, set both the enabled
	 * and mouseEnabled properties to false.
	 */
	public get enabled (): boolean {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'get enabled', '');
		return false;

	}

	public set enabled (value: boolean) {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'set enabled', '');
	}

	/**
	 * Specifies a display object that is used as the hit testing object for the button. For a basic button, set the
	 * hitTestState property to the same display object as the overState
	 * property. If you do not set the hitTestState property, the SimpleButton
	 * is inactive — it does not respond to user input events.
	 */
	public get hitTestState (): DisplayObject {
		return <DisplayObject> this.adaptee.pickObject.adapter;

	}

	public set hitTestState (value: DisplayObject) {
		this.adaptee.pickObject = <AwayDisplayObjectContainer> value.adaptee;

	}

	/**
	 * Specifies a display object that is used as the visual
	 * object for the button over state — the state that the button is in when
	 * the pointer is positioned over the button.
	 */
	public get overState (): DisplayObject {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'get overState', '');
		return null;

	}

	public set overState (value: DisplayObject) {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'set overState', '');
	}

	/**
	 * The SoundTransform object assigned to this button. A SoundTransform object
	 * includes properties for setting volume, panning, left speaker assignment, and right
	 * speaker assignment. This SoundTransform object applies to all states of the button.
	 * This SoundTransform object affects only embedded sounds.
	 * @internal	Should information from AS2 setTransform be here? e.g. percentage values indicating
	 *   how much of the left input to play in the left speaker or right speaker; it is generally
	 *   best to use 22-KHZ 6-bit mono sounds?
	 */
	public get soundTransform (): SoundTransform {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'get soundTransform', '');
		return null;
	}

	public set soundTransform (sndTransform: SoundTransform) {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'set soundTransform', '');
	}

	/**
	 * Indicates whether other display objects that are SimpleButton or MovieClip objects can receive
	 * user input release events. The trackAsMenu property lets you create menus. You
	 * can set the trackAsMenu property on any SimpleButton or MovieClip object.
	 * If the trackAsMenu property does not exist, the default behavior is
	 * false.
	 *
	 *   You can change the trackAsMenu property at any time; the
	 * modified button immediately takes on the new behavior.
	 */
	public get trackAsMenu (): boolean {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'get trackAsMenu', '');
		return false;
	}

	public set trackAsMenu (value: boolean) {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'set trackAsMenu', '');
	}

	/**
	 * Specifies a display object that is used as the visual
	 * object for the button up state — the state that the button is in when
	 * the pointer is not positioned over the button.
	 */
	public get upState (): DisplayObject {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'get upState', '');
		return null;
	}

	public set upState (value: DisplayObject) {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'set upState', '');
	}

	/**
	 * A Boolean value that, when set to true, indicates whether
	 * the hand cursor is shown when the pointer rolls over a button.
	 * If this property is set to false, the arrow pointer cursor is displayed
	 * instead. The default is true.
	 *
	 *   You can change the useHandCursor property at any time;
	 * the modified button immediately uses the new cursor behavior.
	 * @maelexample	Create two buttons on the Stage with the instance names
	 * <code>myBtn1_btn</code> and <code>myBtn2_btn</code>. Enter the following ActionScript in Frame 1 of the Timeline:
	 *   <listing>
	 *   myBtn1_btn.useHandCursor = false;
	 *   myBtn1_btn.onRelease = buttonClick;
	 *   myBtn2_btn.onRelease = buttonClick;
	 *   function buttonClick() {
		 *   trace(this._name);
		 *   }
	 *   </listing><p class="- topic/p ">When the mouse is over and clicks <code>myBtn1_btn</code>,
	 * there is no pointing hand. However, you see the pointing hand when the button is over and clicks
	 * <code>myBtn2_btn</code>.</p>
	 */
	public get useHandCursor (): boolean {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'get useHandCursor', '');
		return false;
	}

	public set useHandCursor (value: boolean) {
		// @todo
		Debug.throwPIR('playerglobals/display/SimpleButton', 'set useHandCursor', '');
	}

	public clone(): SimpleButton {
		const anyThis: AssetBase = <any> this;

		if (!anyThis._symbol) {
			throw ('_symbol not defined when cloning movieclip');
		}

		const clone: SimpleButton = constructClassFromSymbol(anyThis._symbol, anyThis._symbol.symbolClass);

		const adaptee = new AwayMovieClip((<AwayMovieClip> this.adaptee).timeline);
		this.adaptee.copyTo(adaptee);

		clone.adaptee = adaptee;
		clone._stage = this.activeStage;

		(<any>clone).executeConstructor = () => {
			//adaptee.timeline.resetScripts();
			(<any>clone).axInitializer();
			(<any>clone).constructorHasRun = true;

		};

		return clone;
	}
}
