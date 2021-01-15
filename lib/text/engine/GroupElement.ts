import { axCoerceString } from '@awayfl/avm2';
import { EventDispatcher } from '../../events/EventDispatcher';
import { ContentElement } from './ContentElement';
import { ElementFormat } from './ElementFormat';
import { TextElement } from './TextElement';

export class GroupElement extends ContentElement {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	private _elements: any;

	constructor(
		elements: any/*ASVector<any>*/ = null,
		elementFormat: ElementFormat = null,
		eventMirror: EventDispatcher = null,
		textRotation: string = 'rotate0') {

		super(elementFormat, eventMirror, textRotation);
		this._elements = elements ? elements._buffer : [];
		console.log('[GroupElement]', elements, elementFormat, eventMirror, textRotation);
	}

	// JS -> AS Bindings

	public getElementIndex: (element: ContentElement) => number /*int*/;

	// AS -> JS Bindings

	// _elementCount: number /*int*/;
	public get elementCount(): number /*int*/ {
		return this._elements.length;
	}

	public getElementAt(index: number /*int*/): ContentElement {
		return this._elements[index];
	}

	public setElements(value: any/*ASVector<any>*/): void {
		//value = value;
		console.warn('[GroupElement] - setElements not implemented');
		this._elements = value.value;
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
		let cnt = 0;
		if (endIndex - beginIndex > newElements._buffer.length) {
			console.warn('[GroupElement] - replaceElements error with range and vector size');

		}
		for (let i = beginIndex; i <= endIndex; i++) {
			this._elements[i] = newElements._buffer[cnt++];
		}

		return newElements;
	}

	public getElementAtCharIndex(charIndex: number /*int*/): ContentElement {
		//charIndex = charIndex | 0;
		console.warn('[GroupElement] - getElementAtCharIndex not implemented');
		return null;
	}
}
