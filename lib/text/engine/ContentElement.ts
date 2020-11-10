import { ASObject, axCoerceString } from '@awayfl/avm2';
import { EventDispatcher } from '../../events/EventDispatcher';
import { ElementFormat } from './ElementFormat';
import { GroupElement } from './GroupElement';
import { TextBlock } from './TextBlock';

export class ContentElement extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor(elementFormat: ElementFormat = null,
		eventMirror: EventDispatcher = null,
		textRotation: string = 'rotate0') {
		super();
		this._elementFormat = elementFormat;
		this._eventMirror = eventMirror;
		this._textRotation = axCoerceString(textRotation);
		//console.warn('[ContentElement] not implemented');
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

	public get textBlock(): TextBlock {
		//console.warn('[ContentElement] - get textBlock not implemented');
		return this._textBlock;
	}

	public get textBlockBeginIndex(): number /*int*/ {
		console.warn('[ContentElement] - get textBlockBeginIndex not implemented');
		return this._textBlockBeginIndex;
	}

	public get elementFormat(): ElementFormat {
		//console.warn('[ContentElement] - get elementFormat not implemented');
		return this._elementFormat;
	}

	public set elementFormat(value: ElementFormat) {
		//console.warn('[ContentElement] - set textRotation not implemented');
		this._elementFormat = value;
	}

	public get eventMirror(): EventDispatcher {
		//console.warn('[ContentElement] - get eventMirror not implemented');
		return this._eventMirror;
	}

	public set eventMirror(value: EventDispatcher) {
		//console.warn('[ContentElement] - set eventMirror not implemented');
		this._eventMirror = value;
	}

	public get groupElement(): GroupElement {
		//console.warn('[ContentElement] - get groupElement not implemented');
		return this._groupElement;
	}

	public get rawText(): string {
		//console.warn('[ContentElement] - get rawText not implemented');
		return this._rawText;
	}

	public get text(): string {
		//console.warn('[ContentElement] - get text not implemented');
		return this._text;
	}

	public get textRotation(): string {
		//console.warn('[ContentElement] - get textRotation not implemented');
		return this._textRotation;
	}

	public set textRotation(value: string) {
		//console.warn('[ContentElement] - set textRotation not implemented');
		this._textRotation = axCoerceString(value);
	}
}