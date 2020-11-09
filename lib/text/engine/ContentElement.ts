import { ASObject, axCoerceString } from '@awayfl/avm2';
import { EventDispatcher } from '../../events/EventDispatcher';
import { ElementFormat } from './ElementFormat';
import { GroupElement } from './GroupElement';
import { TextBlock } from './TextBlock';

export class ContentElement extends ASObject {

	static forceNative: boolean = true;
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	public static initializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // ["userData"];

	constructor(elementFormat: ElementFormat = null,
		eventMirror: EventDispatcher = null,
		textRotation: string = 'rotate0') {
		textRotation = axCoerceString(textRotation);
		super();
		console.warn('[ContentElement] not implemented');
	}

	// JS -> AS Bindings
	public static GRAPHIC_ELEMENT: number /*uint*/ = 65007;

	userData: any;

	// AS -> JS Bindings

	// _textBlock: flash.text.engine.TextBlock;
	// _textBlockBeginIndex: number /*int*/;
	// _elementFormat: flash.text.engine.ElementFormat;
	// _eventMirror: flash.events.EventDispatcher;
	// _groupElement: flash.text.engine.GroupElement;
	// _rawText: string;
	// _text: string;
	// _textRotation: string;
	public get textBlock(): TextBlock {
		console.warn('[ContentElement] - get textBlock not implemented');
		return null;
	}

	public get textBlockBeginIndex(): number /*int*/ {
		console.warn('[ContentElement] - get textBlockBeginIndex not implemented');
		return null;
	}

	public get elementFormat(): ElementFormat {
		console.warn('[ContentElement] - get elementFormat not implemented');
		return null;
	}

	public set elementFormat(value: ElementFormat) {
		console.warn('[ContentElement] - set textRotation not implemented');
	}

	public get eventMirror(): EventDispatcher {
		console.warn('[ContentElement] - get eventMirror not implemented');
		return null;
	}

	public set eventMirror(value: EventDispatcher) {
		console.warn('[ContentElement] - set eventMirror not implemented');
	}

	public get groupElement(): GroupElement {
		console.warn('[ContentElement] - get groupElement not implemented');
		return null;
	}

	public get rawText(): string {
		console.warn('[ContentElement] - get rawText not implemented');
		return null;
	}

	public get text(): string {
		console.warn('[ContentElement] - get text not implemented');
		return null;
	}

	public get textRotation(): string {
		console.warn('[ContentElement] - get textRotation not implemented');
		return null;
	}

	public set textRotation(value: string) {
		value = axCoerceString(value);
		console.warn('[ContentElement] - set textRotation not implemented');
	}
}