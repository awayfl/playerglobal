import { axCoerceString } from '@awayfl/avm2';
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
		console.warn('[GraphicElement] not implemented');
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

	// _graphic: flash.display.DisplayObject;
	// _elementHeight: number;
	// _elementWidth: number;
	public get graphic(): DisplayObject {
		console.warn('[GraphicElement] - get graphic not implemented');
		return null;
	}

	public set graphic(value: DisplayObject) {
		console.warn('[GraphicElement] - set graphic not implemented');
	}

	public get elementHeight(): number {
		console.warn('[GraphicElement] - get elementHeight not implemented');
		return null;
	}

	public set elementHeight(value: number) {
		console.warn('[GraphicElement] - set elementHeight not implemented');
	}

	public get elementWidth(): number {
		console.warn('[GraphicElement] - get elementWidth not implemented');
		return null;
	}

	public set elementWidth(value: number) {
		value = +value;
		console.warn('[GraphicElement] - set elementWidth not implemented');
	}
}
