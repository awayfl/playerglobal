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
		//this._rawText = text;
		//console.warn('[TextElement]', elementFormat);
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

	// _text: string;
	public set text(value: string) {
		//console.warn('[TextElement] - set text not implemented');
		this._text = value;
	}

	public get text(): string {
		//console.warn('[ContentElement] - get text not implemented');
		return this._text;
	}

	public replaceText(beginIndex: number /*int*/, endIndex: number /*int*/, newText: string): void {
		this._rawText = this._text.slice(0, beginIndex) + newText + this._text.slice(endIndex, this._text.length - 1);
		this._text = this._rawText;
	}
}
