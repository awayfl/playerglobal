import { MovieClip as AwayMovieClip,
	DisplayObject as AwayDisplayObject,
	IMovieClipAdapter,  FrameScriptManager } from '@awayjs/scene';
import { Sprite } from './Sprite';
import { AssetBase, Debug } from '@awayjs/core';
import { constructClassFromSymbol } from '@awayfl/avm2';
import { Event } from '../events/Event';
import { FrameLabel } from './FrameLabel';
import { SecurityDomain } from '../SecurityDomain';

const includeString: string = '';//TODO

declare let __framescript__;
/**
 * The MovieClip class inherits from the following classes: Sprite, DisplayObjectContainer,
 * InteractiveObject, DisplayObject, and EventDispatcher.
 *
 *   <p class="- topic/p ">Unlike the Sprite object, a MovieClip object has a timeline.</p><p class="- topic/p ">&gt;
 * In Flash Professional, the methods for the MovieClip class provide the same functionality
 * as actions that target movie clips. Some additional methods do not have equivalent
 * actions in the Actions toolbox in the Actions panel in the Flash authoring tool. </p>
 * <p class="- topic/p ">
 * Children instances placed on the Stage in Flash Professional
 * cannot be accessed by code from within the constructor of a parent instance
 * since they have not been created at that ponumber in code execution.
 * Before accessing the child, the parent must instead either create the child instance
 * by code or delay access to a callback that listens for the child to dispatch
 * its <codeph class="+ topic/ph pr-d/codeph ">Event.ADDED_TO_STAGE</codeph> event.
 * </p><p class="- topic/p ">
 * If you modify any of the following properties of a MovieClip object that contains a motion tween,
 * the playhead is stopped in that MovieClip object:
 * <codeph class="+ topic/ph pr-d/codeph ">alpha</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">blendMode</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">filters</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">height</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">opaqueBackground</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">rotation</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">scaleX</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">scaleY</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">scale9Grid</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">scrollRect</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">transform</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">visible</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">width</codeph>,
 * <codeph class="+ topic/ph pr-d/codeph ">x</codeph>,
 * or <codeph class="+ topic/ph pr-d/codeph ">y</codeph>.
 * However, it does not stop the playhead in any child MovieClip objects of that
 * MovieClip object.</p><p class="- topic/p ">
 * <b class="+ topic/ph hi-d/b ">Note:</b>Flash Lite 4 supports the MovieClip.opaqueBackground property only if
 * FEATURE_BITMAPCACHE is defined. The default configuration of Flash Lite 4 does not define
 * FEATURE_BITMAPCACHE. To enable the MovieClip.opaqueBackground property for a suitable device,
 * define FEATURE_BITMAPCACHE in your project.</p>*/
export class MovieClip extends Sprite implements IMovieClipAdapter {
	private static _movieClips: Array<MovieClip> = new Array<MovieClip>();
	private static current_script_scope: MovieClip=null;

	// 	executed directly after a MC has been constructed via Object.create,
	//	befre the actual constructors have been run
	public applySymbol() {}

	public static getNewMovieClip(adaptee: AwayMovieClip): MovieClip {
		if (MovieClip._movieClips.length) {
			const movieClip: MovieClip = MovieClip._movieClips.pop();
			movieClip.adaptee = adaptee;
			return movieClip;
		}

		return new MovieClip();
	}

	//forAVM1:
	public _getAbsFrameNumber(param1: any, param2: any): number {
		return 0;
	}

	public callFrame(param1: any) {
	}

	public _callFrame(param1: any) {
	}

	public addScript(param1: any) {
		return param1;
	}

	// call this after you call scripts
	public queuedNavigationAction: Function=null;
	public allowScript: boolean;

	public executeScript(scripts: any) {
		if (!this.allowScript && (<any> this.sec).swfVersion > 9) {
			return;
		}
		scripts = (<AwayMovieClip> this.adaptee).timeline.get_script_for_frame(
			<AwayMovieClip> this.adaptee, (<AwayMovieClip> this.adaptee).currentFrameIndex, false);
		if (!scripts) {
			return;
		}

		this.allowScript = false;
		const prev_script_scope = MovieClip.current_script_scope;
		MovieClip.current_script_scope = this;
		for (let k = 0; k < scripts.length; k++) {
			scripts[k].setReceiver(this);
			scripts[k].axCall(this);
		}
		MovieClip.current_script_scope = prev_script_scope;

		if (this.queuedNavigationAction) {
			// execute any pending FrameNavigation for this mc
			const queuedNavigationAction = this.queuedNavigationAction;
			this.queuedNavigationAction = null;
			queuedNavigationAction();
		}
	}

	public initAdapter(): void {}
	/**
	 * Creates a new MovieClip instance. After creating the MovieClip, call the
	 * addChild() or addChildAt() method of a
	 * display object container that is onstage.
	 */
	constructor() {
		super();
	}

	protected createAdaptee(): AwayDisplayObject {
		const adaptee = AwayMovieClip.getNewMovieClip();
		adaptee.reset();
		//console.log("createAdaptee AwayMovieClip");
		//FrameScriptManager.execute_queue();
		return adaptee;
	}
	// --------------------- stuff needed because of implementing the existing IMovieClipAdapter

	public clearPropsDic() {
		//	this is used by CompiledClips
		//	todo: check if "$Bg__setPropDict" can be used to identify compiledClips
		//this["$Bg__setPropDict"].map= new WeakMap();
	}

	public evalScript(str: string): Function {
		const tag: HTMLScriptElement = document.createElement('script');
		tag.text = 'var __framescript__ = function() {\n' + includeString + str + '\n}';

		//add and remove script tag to dom to trigger compilation
		const sibling = document.scripts[0];
		sibling.parentNode.insertBefore(tag, sibling).parentNode.removeChild(tag);

		const script = __framescript__;
		window['__framescript__'] = null;

		return script;
	}

	public freeFromScript(): void {
		//this.stopAllSounds();
		super.freeFromScript();

	}

	public clone(): MovieClip {
		const anyThis: AssetBase = <any> this;

		if (!anyThis._symbol) {
			throw ('_symbol not defined when cloning movieclip');
		}

		const newMC: MovieClip = constructClassFromSymbol(anyThis._symbol, anyThis._symbol.symbolClass);

		// console.log("Base", anyThis._symbol, anyThis._symbol.symbolClass);

		//console.log("clone", (<any>this)._symbol, (<any>this)._symbol.symbolClass);
		const adaptee = new AwayMovieClip((<AwayMovieClip> this.adaptee).timeline);

		//console.log("clone mc", newMC, adaptee, adaptee.id, (<any>this)._symbol, (<any>this)._symbol.symbolClass)
		this.adaptee.copyTo(adaptee);

		newMC.adaptee = adaptee;
		newMC._stage = this.activeStage;

		(<IMovieClipAdapter>newMC).executeConstructor = () => {
			//adaptee.timeline.resetScripts();
			(<any>newMC).axInitializer();
			(<any>newMC).constructorHasRun = true;

		};

		if (adaptee.timeline) {

			//console.log(adaptee.timeline);

			// for Sprite and UIComponent, we want the timeline to only use frame 1

			let foundUIComponent: boolean = false;
			let symbolClass: any = (<any> this)._symbol.symbolClass;
			while (symbolClass && !foundUIComponent) {
				if (symbolClass.name?.name == 'UIComponent') {
					foundUIComponent = true;
				} else if (symbolClass.name?.name == 'MovieClip') {
					symbolClass = null;
				} else if (symbolClass.name?.name == 'Sprite') {
					foundUIComponent = true;
				} else if (symbolClass.superClass) {
					symbolClass = symbolClass.superClass;
				} else {
					symbolClass = null;
				}
			}
			// 	hack to BadIceCreamFont compiledClip:
			//	the compiledClip "BadIcecreamFont" seem to behave different to other classes
			//	it seem to always stick to frame 0,
			//
			//	DANGER!!!
			//	MAY PRODUCE SIDE EFFECTS

			const cn = anyThis._symbol.className;
			const freezeOnFirstFrame = foundUIComponent || (cn && (
				//anyThis._symbol.className == "BadIcecreamFont" ||
				cn.includes('Font'))
			);

			if (freezeOnFirstFrame) {
				const timeline = (<AwayMovieClip>adaptee).timeline;
				const targetTimeline = timeline;

				targetTimeline.frame_command_indices = <any>[timeline.frame_command_indices[0]];
				targetTimeline.frame_recipe = <any>[timeline.frame_recipe[0]];
				targetTimeline.keyframe_constructframes = [timeline.keyframe_constructframes[0]];
				targetTimeline.keyframe_durations = <any>[timeline.keyframe_durations[0]];
				targetTimeline.keyframe_firstframes = [timeline.keyframe_firstframes[0]];
				targetTimeline.keyframe_indices = [timeline.keyframe_indices[0]];
			}
		}

		return newMC;
	}

	/**
	 * @inheritDoc
	 */
	public dispose(): void {
		this.disposeValues();

		//MovieClip._movieClips.push(this);
	}

	//---------------------------original as3 properties / methods:

	/**
	 * Specifies the number of the frame in which the playhead is located in the timeline of
	 * the MovieClip instance. If the movie clip has multiple scenes, this value is the
	 * frame number in the current scene.
	 */
	public get currentFrame(): number {
		return (<AwayMovieClip> this._adaptee).currentFrameIndex + 1;
	}

	/**
	 * The label at the current frame in the timeline of the MovieClip instance.
	 * If the current frame has no label, currentLabel is null.
	 */
	public get currentFrameLabel(): string {
		return (<AwayMovieClip> this.adaptee).timeline.getCurrentFrameLabel(<AwayMovieClip> this.adaptee);
	}

	/**
	 * The current label in which the playhead is located in the timeline of the MovieClip instance.
	 * If the current frame has no label, currentLabel is set to the name of the previous frame
	 * that includes a label. If the current frame and previous frames do not include a label,
	 * currentLabel returns null.
	 */
	public get currentLabel(): string {
		return (<AwayMovieClip> this.adaptee).timeline.getCurrentLabel(<AwayMovieClip> this.adaptee);
	}

	/**
	 * Returns an array of FrameLabel objects from the current scene. If the MovieClip instance does
	 * not use scenes, the array includes all frame labels from the entire MovieClip instance.
	 */
	public get currentLabels(): FrameLabel[] {
		//	this is called quite frequently in some games
		//	we do not 100% support scenes, yet
		//	as long as we do not have ull scene-support, we can cache the result
		if (this._currentLabels)
			return this._currentLabels;
		const labels = (<AwayMovieClip> this.adaptee).timeline._labels;
		const keyframe_firstframes = (<AwayMovieClip> this.adaptee).timeline.keyframe_firstframes;
		this._currentLabels = [];
		for (const key in labels) {
			this._currentLabels.push(new (<SecurityDomain> this.sec).flash.display.FrameLabel(
				labels[key].name, keyframe_firstframes[labels[key].keyFrameIndex] + 1));
		}
		return this._currentLabels;
	}

	private _currentLabels: FrameLabel[];

	/**
	 * The current scene in which the playhead is located in the timeline of the MovieClip instance.
	 */
	public get currentScene(): any {
		//todo
		//console.log('currentScene not implemented yet in flash/MovieClip');
		const scene = (<AwayMovieClip> this.adaptee).currentScene;
		const newLabels = { value:[] };
		for (let i = 0; i < scene.labels.length; i++) {
			newLabels.value.push(new (<any> this.sec).flash.display.FrameLabel(
				scene.labels[i].name, scene.labels[i].frame
			));
		}
		const as3Scene = new (<any> this.sec).flash.display.Scene(
			scene.name, newLabels, scene.offset, scene.numFrames
		);
		return as3Scene;
	}

	/**
	 * A boolean value that indicates whether a movie clip is enabled. The default value of enabled
	 * is true. If enabled is set to false, the movie clip's
	 * Over, Down, and Up frames are disabled. The movie clip
	 * continues to receive events (for example, mouseDown,
	 * mouseUp, keyDown, and keyUp).
	 *
	 *   The enabled property governs only the button-like properties of a movie clip. You
	 * can change the enabled property at any time; the modified movie clip is immediately
	 * enabled or disabled. If enabled is set to false, the object is not
	 * included in automatic tab ordering.
	 */
	public get enabled(): boolean {
		return (<AwayMovieClip> this.adaptee).buttonEnabled;
	}

	public set enabled(value: boolean) {
		(<AwayMovieClip> this.adaptee).buttonEnabled = value;
	}

	/**
	 * The number of frames that are loaded from a streaming SWF file. You can use the framesLoaded
	 * property to determine whether the contents of a specific frame and all the frames before it
	 * loaded and are available locally in the browser. You can also use it to monitor the downloading
	 * of large SWF files. For example, you might want to display a message to users indicating that
	 * the SWF file is loading until a specified frame in the SWF file finishes loading.
	 *
	 *   If the movie clip contains multiple scenes, the framesLoaded property returns the number
	 * of frames loaded for all scenes in the movie clip.
	 */
	public get framesLoaded(): number {
		return this.totalFrames;
	}

	public get isPlaying(): boolean {
		return (<AwayMovieClip> this.adaptee).isPlaying;
	}

	/**
	 * An array of Scene objects, each listing the name, the number of frames,
	 * and the frame labels for a scene in the MovieClip instance.
	 */
	public get scenes(): any[] {
		// @todo
		Debug.throwPIR('playerglobals/display/MovieClip', 'get scenes', '');
		return [];
	}

	/**
	 * The total number of frames in the MovieClip instance.
	 *
	 *   If the movie clip contains multiple frames, the totalFrames property returns
	 * the total number of frames in all scenes in the movie clip.
	 */
	public get totalFrames(): number {
		return (<AwayMovieClip> this._adaptee).numFrames;
	}

	/**
	 * Indicates whether other display objects that are SimpleButton or MovieClip objects can receive
	 * mouse release events or other user input release events. The trackAsMenu property lets you create menus. You
	 * can set the trackAsMenu property on any SimpleButton or MovieClip object.
	 * The default value of the trackAsMenu property is false.
	 *
	 *   You can change the trackAsMenu property at any time; the modified movie
	 * clip immediately uses the new behavior.
	 */
	public get trackAsMenu(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/display/MovieClip', 'get trackAsMenu', '');
		return false;
	}

	public set trackAsMenu(value: boolean) {
		// @todo
		Debug.throwPIR('playerglobals/display/MovieClip', 'set trackAsMenu', '');
	}

	public addFrameScript(...args) {
		// arguments are pairs of frameIndex and script/function
		// frameIndex is in range 0..totalFrames-1
		const numArgs = arguments.length;
		if (numArgs & 1) {
			this.sec.throwError('ArgumentError TooFewArgumentsError', numArgs,
				numArgs + 1);
		}
		for (let i = 0; i < numArgs; i += 2) {
			const frameNum = (args[i] | 0);
			const fn = args[i + 1];
			(<AwayMovieClip> this.adaptee).timeline.add_framescript(fn, frameNum, <any> this.adaptee);

			// newly registered scripts get queued in FrameScriptManager.execute-as3constructor
			//console.log("add framescript", frameNum, this.adaptee, this.adaptee.parent);
			// 	if the mc was already added to scene before the construcor was run,
			//	no framescript was defined, and therefore we might need to add scripts for the current frame manually
			//	todo: make sure that this is correctly behaving in case constructor navigates the mc to another frame
			//if((<AwayMovieClip>this.adaptee).currentFrameIndex==frameNum){
			//	FrameScriptManager.add_script_to_queue_pass2(<AwayMovieClip>this.adaptee, [fn]);
			//}

		}
		(<any> this).constructorHasRun = true;
	}

	/**
	 * Starts playing the SWF file at the specified frame.  This happens after all
	 * remaining actions in the frame have finished executing.  To specify a scene
	 * as well as a frame, specify a value for the scene parameter.
	 * @param	frame	A number representing the frame number, or a string representing the label of the
	 *   frame, to which the playhead is sent. If you specify a number, it is relative to the
	 *   scene you specify. If you do not specify a scene,
	 *   the current scene determines the global frame number to play. If you do specify a scene, the playhead
	 *   jumps to the frame number in the specified scene.
	 * @param	scene	The name of the scene to play. This parameter is optional.
	 */
	public gotoAndPlay(frame: any, scene: string = null, force: boolean = false) {

		//console.log("MovieClip.current_script_scope", this, MovieClip.current_script_scope);
		if (!force && MovieClip.current_script_scope == this) {
			this.queuedNavigationAction = ()=>this.gotoAndPlay(frame, scene, true);
			return;
		}
		if (frame == null)
			return;

		if (typeof frame === 'string') {
			if ((<AwayMovieClip> this.adaptee).timeline._labels[frame] == null) {
				frame = parseInt(frame);
				if (!isNaN(frame)) {
					(<AwayMovieClip> this.adaptee).currentFrameIndex = (<number>frame) - 1;
					(<AwayMovieClip> this.adaptee).play();
				}
				return;
			}
		}
		if (typeof frame === 'number' && frame <= 0) {
			if (MovieClip.current_script_scope == this) {
				return;
			}
			frame = 1;
		}
		this.play();
		this._gotoFrame(frame);

	}

	/**
	 * Brings the playhead to the specified frame of the movie clip and stops it there.  This happens after all
	 * remaining actions in the frame have finished executing.  If you want to specify a scene in addition to a frame,
	 * specify a scene parameter.
	 * @param	frame	A number representing the frame number, or a string representing the label of the
	 *   frame, to which the playhead is sent. If you specify a number, it is relative to the
	 *   scene you specify. If you do not specify a scene, the current scene determines
	 *   the global frame number at which to go to and stop. If you do specify a scene,
	 *   the playhead goes to the frame number in the specified scene and stops.
	 * @param	scene	The name of the scene. This parameter is optional.
	 * @throws	ArgumentError If the scene or frame specified are
	 *   not found in this movie clip.
	 */
	public gotoAndStop(frame: any, scene: string = null, force: boolean = false) {

		//console.log("MovieClip.current_script_scope", this, MovieClip.current_script_scope);
		if (!force && MovieClip.current_script_scope == this) {
			this.queuedNavigationAction = ()=>this.gotoAndStop(frame, scene, true);
			return;
		}
		// in FP for frame==null, we need to stop the mc
		if (frame == null) {
			this.stop();
			return;
		}

		if (typeof frame === 'string') {
			if ((<AwayMovieClip> this.adaptee).timeline._labels[frame] == null) {
				frame = parseInt(frame);
				if (!isNaN(frame)) {
					(<AwayMovieClip> this.adaptee).currentFrameIndex = (<number>frame) - 1;
					(<AwayMovieClip> this.adaptee).stop();
				}
				//	for FP>10 we should throw a error and stop the timeline
				if ((<any> this.sec).swfVersion > 10) {
					(<AwayMovieClip> this.adaptee).currentFrameIndex = 0;
				}
				this.stop();
				return;
			}
		}
		if (typeof frame === 'number' && frame <= 0) {
			if (MovieClip.current_script_scope == this) {
				return;
			}
			frame = 1;
		}
		this.stop();
		this._gotoFrame(frame);
	}

	private _gotoFrame(frame: any): void {
		const oldFrame = this.currentFrame;

		if (typeof frame === 'string') {
			(<AwayMovieClip> this._adaptee).jumpToLabel(<string>frame);
		} else if (typeof frame === 'number' && frame <= 0) {
			console.warn('[playerglobal/MovieClip] - gotoFrame called with invalid frame-index');
		} else {
			(<AwayMovieClip> this._adaptee).currentFrameIndex = (<number>frame) - 1;
		}
		if (this.currentFrame == oldFrame) {
			return;
		}
		//console.log("_gotoFrame", this.name);
		FrameScriptManager.execute_as3_constructors_recursiv(<any> this.adaptee);
		FrameScriptManager.execute_as3_constructors_finish_scene(<any> this.root.adaptee);
		// only in FP10 and above we want to execute scripts immediatly here
		if ((<any> this.sec).swfVersion > 9) {
			this.dispatchStaticBroadCastEvent(Event.FRAME_CONSTRUCTED);
			FrameScriptManager.execute_queue();
			this.dispatchStaticBroadCastEvent(Event.EXIT_FRAME);
		}
	}

	/**
	 * Sends the playhead to the next frame and stops it.  This happens after all
	 * remaining actions in the frame have finished executing.
	 */
	public nextFrame(force: boolean = false) {
		if (!force && MovieClip.current_script_scope == this) {
			this.queuedNavigationAction = ()=>this.nextFrame(true);
			return;
		}
		(<AwayMovieClip> this._adaptee).stop();
		++(<AwayMovieClip> this._adaptee).currentFrameIndex;
		FrameScriptManager.execute_as3_constructors_recursiv(<any> this.adaptee);
		FrameScriptManager.execute_as3_constructors_finish_scene(<any> this.root.adaptee);
		// only in FP10 and above we want to execute scripts immediatly here
		if ((<any> this.sec).swfVersion > 9) {
			this.dispatchStaticBroadCastEvent(Event.FRAME_CONSTRUCTED);
			FrameScriptManager.execute_queue();
			this.dispatchStaticBroadCastEvent(Event.EXIT_FRAME);
		}
	}

	/**
	 * Moves the playhead to the next scene of the MovieClip instance.  This happens after all
	 * remaining actions in the frame have finished executing.
	 */
	public nextScene(force: boolean = false) {
		if (!force && MovieClip.current_script_scope == this) {
			this.queuedNavigationAction = ()=>this.nextScene(true);
			return;
		}
		// @todo
		Debug.throwPIR('playerglobals/display/MovieClip', 'nextScene', '');
	}

	/**
	 * Moves the playhead in the timeline of the movie clip.
	 */
	public play() {
		return (<AwayMovieClip> this._adaptee).play();
	}

	/**
	 * Sends the playhead to the previous frame and stops it.  This happens after all
	 * remaining actions in the frame have finished executing.
	 */
	public prevFrame(force: boolean = false) {
		if (!force && MovieClip.current_script_scope == this) {
			this.queuedNavigationAction = ()=>this.prevFrame(true);
			return;
		}
		if ((<AwayMovieClip> this._adaptee).currentFrameIndex > 0) {
			(<AwayMovieClip> this._adaptee).currentFrameIndex = (<AwayMovieClip> this._adaptee).currentFrameIndex - 1;
		}
		FrameScriptManager.execute_as3_constructors_recursiv(<any> this.adaptee);
		FrameScriptManager.execute_as3_constructors_finish_scene(<any> this.root.adaptee);
		// only in FP10 and above we want to execute scripts immediatly here
		if ((<any> this.sec).swfVersion > 9) {
			this.dispatchStaticBroadCastEvent(Event.FRAME_CONSTRUCTED);
			FrameScriptManager.execute_queue();
			this.dispatchStaticBroadCastEvent(Event.EXIT_FRAME);
		}
	}

	/**
	 * Moves the playhead to the previous scene of the MovieClip instance.  This happens after all
	 * remaining actions in the frame have finished executing.
	 */
	public prevScene(force: boolean = false) {
		if (!force && MovieClip.current_script_scope == this) {
			this.queuedNavigationAction = ()=>this.prevScene(true);
			return;
		}
		// @todo
		Debug.throwPIR('playerglobals/display/MovieClip', 'prevScene', '');
	}

	/**
	 * Stops the playhead in the movie clip.
	 */
	public stop() {
		return (<AwayMovieClip> this._adaptee).stop();
	}

}
