import { ASObject } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';
import { EventDispatcher } from '../../events/EventDispatcher';
import { Rectangle } from '../../geom/Rectangle';
import { ContentElement } from './ContentElement';
import { TextLine } from './TextLine';

export class TextLineMirrorRegion extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

	// _textLine: flash.text.engine.TextLine;
	// _nextRegion: flash.text.engine.TextLineMirrorRegion;
	// _previousRegion: flash.text.engine.TextLineMirrorRegion;
	// _mirror: flash.events.EventDispatcher;
	// _element: flash.text.engine.ContentElement;
	// _bounds: flash.geom.Rectangle;
	public get textLine(): TextLine {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLineMirrorRegion', 'get textLine', '');
		return null;
	}

	public get nextRegion(): TextLineMirrorRegion {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLineMirrorRegion', 'get nextRegion', '');
		return null;
	}

	public get previousRegion(): TextLineMirrorRegion {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLineMirrorRegion', 'get previousRegion', '');
		return null;
	}

	public get mirror(): EventDispatcher {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLineMirrorRegion', 'get mirror', '');
		return null;
	}

	public get element(): ContentElement {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLineMirrorRegion', 'get element', '');
		return null;
	}

	public get bounds(): Rectangle {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TextLineMirrorRegion', 'get textLine', '');
		return null;
	}
}
