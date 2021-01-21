import { axCoerceString } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';
import { DisplayObject } from '../../display/DisplayObject';
import { EventDispatcher } from '../../events/EventDispatcher';
import { ContentElement } from './ContentElement';
import { ElementFormat } from './ElementFormat';

export class GraphicElement extends ContentElement {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor(
		graphic: DisplayObject = null,
		elementWidth: number = 15,
		elementHeight: number = 15,
		elementFormat: ElementFormat = null,
		eventMirror: EventDispatcher = null,
		textRotation: string = 'rotate0') {
		super(undefined, undefined, undefined);
		this.graphic = graphic;
		this.elementWidth = +elementWidth;
		this.elementHeight = +elementHeight;
		this.elementFormat = elementFormat;
		this.eventMirror = eventMirror;
		this.textRotation = axCoerceString(textRotation);
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

	// _graphic: flash.display.DisplayObject;
	// _elementHeight: number;
	// _elementWidth: number;
	public get graphic(): DisplayObject {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/GraphicElement', 'get graphic', '');
		return null;
	}

	public set graphic(value: DisplayObject) {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/GraphicElement', 'set graphic', '');
	}

	public get elementHeight(): number {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/GraphicElement', 'get elementHeight', '');
		return null;
	}

	public set elementHeight(value: number) {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/GraphicElement', 'set elementHeight', '');
	}

	public get elementWidth(): number {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/GraphicElement', 'get elementWidth', '');
		return null;
	}

	public set elementWidth(value: number) {
		value = +value;
		// @todo
		Debug.throwPIR('playerglobals/text/engine/GraphicElement', 'set elementWidth', '');
	}
}
