import { axCoerceString } from '@awayfl/avm2';
import { EventDispatcher } from '../../events/EventDispatcher';
import { ContentElement } from './ContentElement';
import { ElementFormat } from './ElementFormat';
import { TextElement } from './TextElement';

export class GroupElement extends ContentElement {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	public static initializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // ["getElementIndex"];

	constructor(
		elements: any/*ASVector<any>*/ = null,
		elementFormat: ElementFormat = null,
		eventMirror: EventDispatcher = null,
		textRotation: string = 'rotate0') {
		super(undefined, undefined, undefined);
		textRotation = axCoerceString(textRotation);
		console.warn('[GroupElement] not implemented');
	}

	// JS -> AS Bindings

	public getElementIndex: (element: ContentElement) => number /*int*/;

	// AS -> JS Bindings

	// _elementCount: number /*int*/;
	public get elementCount(): number /*int*/ {
		console.warn('[GroupElement] - elementCount not implemented');
		return 0;
	}

	public getElementAt(index: number /*int*/): ContentElement {
		//index = index | 0;
		console.warn('[GroupElement] - getElementAt not implemented');
		return null;
	}

	public setElements(value: any/*ASVector<any>*/): void {
		//value = value;
		console.warn('[GroupElement] - setElements not implemented');
	}

	public groupElements(beginIndex: number /*int*/, endIndex: number /*int*/): GroupElement {
		//beginIndex = beginIndex | 0;
		//endIndex = endIndex | 0;
		console.warn('[GroupElement] - groupElements not implemented');
		return null;
	}

	public ungroupElements(groupIndex: number /*int*/): void {
		//groupIndex = groupIndex | 0;
		console.warn('[GroupElement] - ungroupElements not implemented');
	}

	public mergeTextElements(beginIndex: number /*int*/, endIndex: number /*int*/): TextElement {
		//beginIndex = beginIndex | 0;
		//endIndex = endIndex | 0;
		console.warn('[GroupElement] - mergeTextElements not implemented');
		return null;
	}

	public splitTextElement(elementIndex: number /*int*/, splitIndex: number /*int*/): TextElement {
		//elementIndex = elementIndex | 0;
		//splitIndex = splitIndex | 0;
		console.warn('[GroupElement] - splitTextElement not implemented');
		return null;
	}

	public replaceElements(
		beginIndex: number /*int*/,
		endIndex: number /*int*/,
		newElements: any/*ASVector<any>*/): any/*ASVector<any>*/ {
		//beginIndex = beginIndex | 0;
		//endIndex = endIndex | 0;
		//newElements = newElements;
		console.warn('[GroupElement] - replaceElements not implemented');
		return null;
	}

	public getElementAtCharIndex(charIndex: number /*int*/): ContentElement {
		//charIndex = charIndex | 0;
		console.warn('[GroupElement] - getElementAtCharIndex not implemented');
		return null;
	}
}
