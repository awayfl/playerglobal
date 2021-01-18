import { EventDispatcher } from '../../events/EventDispatcher';
import { ContentElement } from './ContentElement';
import { ElementFormat } from './ElementFormat';

const noLogs = true;
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
		this._rawText = text;
		noLogs || console.log('[TextElement] ' + this._id + ' constructor', 'text', text);
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

	// _text: string;
	public set text(value: string) {
		noLogs || console.log('[TextElement] ' + this._id + ' set text', value);
		this._text = value;
		if (this._textBlock)
			this._textBlock.setTextDataDirty();
	}

	public get text(): string {
		noLogs || console.log('[TextElement] ' + this._id + ' get text', this._text);
		return this._text;
	}

	public replaceText(beginIndex: number /*int*/, endIndex: number /*int*/, newText: string): void {
		noLogs || console.log('[TextElement] ' + this._id + ' replaceText',
			'beginIndex', beginIndex,
			'endIndex', endIndex,
			'newText', newText);
		this._rawText = this._text.slice(0, beginIndex) + newText + this._text.slice(endIndex, this._text.length - 1);
		this._text = this._rawText;
		if (this._textBlock)
			this._textBlock.setTextDataDirty();
	}
}
