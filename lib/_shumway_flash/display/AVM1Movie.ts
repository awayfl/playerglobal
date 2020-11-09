import { Bounds } from '@awayjs/graphics';
import { Sprite } from './Sprite';
import { DisplayObject } from './DisplayObject';

/**
 * AVM1Movie is the reflection of AVM1 SWFs loaded into AVM2 content. Since AVM1 content is
 * completely opaque to AVM2 content, it's not a DisplayObjectContainer, even though it contains
 * nested children. This is because the two worlds are completely separated from each other[1], and
 * each AVM1 SWF is entirely isolated from everything else.
 *
 * This causes a few headaches because we implement the AVM1 display list in terms of the AVM2
 * display list: each AVM1 MovieClip is a wrapper around an AVM2 MovieClip instance, which is
 * what's actually on stage. Theoretically, the top-most AVM2 MovieClip for an AVM1 SWF isn't
 * supposed to have a parent. However, we need it to be part of the stage's display tree in order
 * to take part in rendering.
 *
 * Therefore, the AVM2 MovieClip wrapped by an AVM1Movie gets the latter set as its parent, even
 * though AVM1Movie isn't a DisplayObjectContainer. We borrow methods from that and generally
 * pretend that AVM1Movie is a container in some places to pull that off.
 *
 * [1]: If you ignore the undocumented `call` and `addCallback` methods for a moment.
 */

export class AVM1Movie extends DisplayObject {

	static classInitializer: any = null;
	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor(level0: DisplayObject) {
		super();
		console.warn('[AVM1Movie] - not implemented');
		/*
		this._content = Sprite.axClass.axConstruct();
		this._children = [];
		this._children[0] = this._content;
		// Pretend we're a DisplayObjectContainer and can have children. See comment at the top.
		this._content._setParent(<any> this, 0);
		this._setDirtyFlags(DisplayObjectDirtyFlags.DirtyChildren);
		this._invalidateFillAndLineBounds(true, true);
		this.sec.flash.display.DisplayObject.axClass._advancableInstances.push(this);
		this._constructed = false;

		// Setting _level0 root.
		this._content.addTimelineObjectAtDepth(level0, 0);
		*/
	}

	private _content: Sprite;
	private _constructed: boolean;

	call(functionName: string): any {
		console.warn('[AVM1Movie] - call not implemented');
	}

	addCallback(functionName: string, closure: any/*ASFunction*/): void {
		console.warn('[AVM1Movie] - addCallback not implemented');
	}

	_addFrame(frame: any/*SWFFrame*/) {
		//(<MovieClip> this._content._children[0])._addFrame(frame);
		console.warn('[AVM1Movie] - _addFrame not implemented');
	}

	_initFrame(advance: boolean): void {
		// Empty implementation: AVM1Movie doesn't have frames, and the contained MovieClip
		// adds itself to the IAdvancables list.
		console.warn('[AVM1Movie] - _initFrame not implemented');
	}

	_constructFrame(): void {
		// On custructFrame we need to fully construct the roots container.
		// Once constructed, its children (which are IAdvancable type) will be
		// receiving their own _constructFrame events.
		/*if (!this._constructed) {
			this._constructed = true;
			this._content._constructChildren();
		}*/
		console.warn('[AVM1Movie] - _constructFrame not implemented');
	}

	_enqueueFrameScripts() {
		//this._removeFlags(DisplayObjectFlags.ContainsFrameScriptPendingChildren);
		//this._content._enqueueFrameScripts();
		console.warn('[AVM1Movie] - _enqueueFrameScripts not implemented');
	}

	_propagateFlagsDown(flags: any/*DisplayObjectFlags*/) {
		/*if (this._hasFlags(flags)) {
			return;
		}
		this._setFlags(flags);
		this._content._propagateFlagsDown(flags);*/
		console.warn('[AVM1Movie] - _propagateFlagsDown not implemented');
	}

	/**
   * AVM1Movie only takes the AVM1 content into consideration when testing points against
   * bounding boxes, not otherwise.
   */
	_containsPoint(globalX: number, globalY: number, localX: number, localY: number,
		testingType: any/*HitTestingType*/, objects: DisplayObject[]): any/*HitTestingResult*/ {
		/*
		if (testingType === HitTestingType.Mouse) {
			return this._content._containsPoint(globalX, globalY, localX, localY, testingType, objects);
		}
		if (testingType !== HitTestingType.HitTestBounds ||
        !this._getContentBounds().contains(localX, localY)) {
			return HitTestingResult.None;
		}
		return HitTestingResult.Bounds;*/
		console.warn('[AVM1Movie] - _containsPoint not implemented');
		return null;
	}

	/**
   * Override of DisplayObject#_getChildBounds that retrieves the AVM1 content's bounds.
   */
	_getChildBounds(bounds: Bounds, includeStrokes: boolean) {
		/*const childBounds = this._content._getContentBounds(includeStrokes).clone();
		// Always apply the SimpleButton's matrix.
		this._getConcatenatedMatrix().transformBounds(childBounds);
		bounds.unionInPlace(childBounds);*/
		console.warn('[AVM1Movie] - _getChildBounds not implemented');
	}

	_getLevelForRoot(root: DisplayObject): number {
		/*release || assert(root.parent === this._content);
		return root._depth;*/
		console.warn('[AVM1Movie] - _getLevelForRoot not implemented');
		return null;
	}

	_getRootForLevel(level: number): DisplayObject  {
		//return this._content.getTimelineObjectAtDepth(level);
		console.warn('[AVM1Movie] - _getRootForLevel not implemented');
		return null;
	}

	_addRoot(level: number, root: DisplayObject): void {
		/*release || assert(MovieClip.axClass.axIsType(root));
		this._removeRoot(level);
		release || assert(!this._content.getTimelineObjectAtDepth(level));
		this._content.addTimelineObjectAtDepth(root, level);*/
		console.warn('[AVM1Movie] - _addRoot not implemented');
	}

	_removeRoot(level: number): boolean {
		/*const root = this._content.getTimelineObjectAtDepth(level);
		if (!root) {
			return false;
		}
		this._content.removeChild(root);*/
		console.warn('[AVM1Movie] - _addRoot not implemented');
		return true;
	}
}