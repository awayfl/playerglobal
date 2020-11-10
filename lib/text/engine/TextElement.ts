import { EventDispatcher } from '../../events/EventDispatcher';
import { ContentElement } from './ContentElement';
import { ElementFormat } from './ElementFormat';

export class TextElement extends ContentElement {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor(
		text: string = null,
		elementFormat: ElementFormat = null,
		eventMirror: EventDispatcher = null,
		textRotation: string = 'rotate0') {
		super(elementFormat, eventMirror, textRotation);
		this._text = text;
		//console.warn('[TextElement] not implemented');
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

	// _text: string;
	public set text(value: string) {
		//console.warn('[TextElement] - set text not implemented');
		this._text = value;
	}

	public replaceText(beginIndex: number /*int*/, endIndex: number /*int*/, newText: string): void {
		console.warn('[TextElement] - replaceText not implemented');
	}
}
