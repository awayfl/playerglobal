import { ASObject, axCoerceString } from '@awayfl/avm2';
import { EventDispatcher } from '../../events/EventDispatcher';
import { ElementFormat } from './ElementFormat';
import { GroupElement } from './GroupElement';
import { TextBlock } from './TextBlock';

const noLogs = true;
let contentElementIDs = 0;
export class ContentElement extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor(elementFormat: ElementFormat = null,
		eventMirror: EventDispatcher = null,
		textRotation: string = 'rotate0') {
		super();
		this._id = contentElementIDs++;
		this._elementFormat = elementFormat;
		this._eventMirror = eventMirror;
		this._textRotation = axCoerceString(textRotation);
		noLogs || console.log('[ContentElement] constructor ' + this._id
			+ ' elementFormat', elementFormat
			+ ' eventMirror', eventMirror
			+ ' textRotation', textRotation);
	}

	// JS -> AS Bindings
	public static GRAPHIC_ELEMENT: number /*uint*/ = 65007;

	userData: any;

	// AS -> JS Bindings

	public _textBlock: TextBlock;
	public _textBlockBeginIndex: number /*int*/;
	public _elementFormat: ElementFormat;
	public _eventMirror: EventDispatcher;
	public _groupElement: GroupElement;
	public _rawText: string;
	public _text: string;
	public _textRotation: string;
	public _id: number;

	public setTextBlock(value: TextBlock) {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - setTextBlock', this._textBlock);
		this._textBlock = value;
	}

	public setGroupElement(value: GroupElement) {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - setGroupElement', value);
		this._groupElement = value;
	}

	public get textBlock(): TextBlock {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - get textBlock', this._textBlock);
		return this._textBlock;
	}

	public set textBlockBeginIndex(value: number) {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - set textBlock', this._textBlock);
		this._textBlockBeginIndex = value;
	}

	public get textBlockBeginIndex(): number /*int*/ {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - get textBlockBeginIndex',
			this._textBlockBeginIndex);
		return this._textBlockBeginIndex;
	}

	public get elementFormat(): ElementFormat {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - get elementFormat', this._elementFormat);
		return this._elementFormat;
	}

	public set elementFormat(value: ElementFormat) {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - set elementFormat', value);
		this._elementFormat = value;
		if (this._textBlock)
			this._textBlock.setTextDataDirty();
	}

	public get eventMirror(): EventDispatcher {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - get eventMirror', this._eventMirror);
		return this._eventMirror;
	}

	public set eventMirror(value: EventDispatcher) {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - set eventMirror', value);
		this._eventMirror = value;
	}

	public get groupElement(): GroupElement {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - get groupElement', this._groupElement);
		return this._groupElement;
	}

	public get rawText(): string {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - get rawText', this._rawText);
		return this._rawText;
	}

	public set rawText(value: string) {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - set rawText', value);
		this._rawText = value;
		this._text = value;
	}

	public get text(): string {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - get text', this._text);
		return this._text;
	}

	public get textRotation(): string {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - get textRotation', this._textRotation);
		return this._textRotation;
	}

	public set textRotation(value: string) {
		noLogs || console.log('[ContentElement]  ' + this._id + ' - set textRotation', value);
		this._textRotation = axCoerceString(value);
	}
}