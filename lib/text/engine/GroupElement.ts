import { Debug } from '@awayjs/core';
import { EventDispatcher } from '../../events/EventDispatcher';
import { ContentElement } from './ContentElement';
import { ElementFormat } from './ElementFormat';
import { TextBlock } from './TextBlock';
import { TextElement } from './TextElement';

const noLogs = true;
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
		noLogs || console.log('[GroupElement] ' + this._id + ' constructor', 'elements', elements);
	}

	public setTextBlock(value: TextBlock) {
		noLogs || console.log('[GroupElement]  ' + this._id + ' - set textBlock', value);
		super.setTextBlock(value);
		for (let i = 0; i < this._elements.length; i++) {
			this._elements[i].setTextBlock(value);
			this._elements[i].setGroupElement(this);
		}
	}
	// JS -> AS Bindings

	public getElementIndex: (element: ContentElement) => number /*int*/;

	// AS -> JS Bindings

	// _elementCount: number /*int*/;
	public get elementCount(): number /*int*/ {
		noLogs || console.log('[GroupElement]  ' + this._id + ' - elementCount', this._elements.length);
		return this._elements.length;
	}

	public getElementAt(index: number /*int*/): ContentElement {
		noLogs || console.log('[GroupElement]  ' + this._id + ' - getElementAt', index, this._elements[index]);
		return this._elements[index];
	}

	public setElements(value: any/*ASVector<any>*/): void {
		//value = value;
		noLogs || console.log('[GroupElement]  ' + this._id + ' - setElements', value);
		this._elements = value._buffer;
		for (let i = 0; i < this._elements.length; i++) {
			this._elements[i].setTextBlock(this._textBlock);
			this._elements[i].setGroupElement(this);
		}
		if (this._textBlock)
			this._textBlock.setTextDataDirty();
	}

	public groupElements(beginIndex: number /*int*/, endIndex: number /*int*/): GroupElement {
		//beginIndex = beginIndex | 0;
		//endIndex = endIndex | 0;
		// @todo
		Debug.throwPIR('playerglobals/text/engine/GroupElement', 'groupElements', '');
		return null;
	}

	public ungroupElements(groupIndex: number /*int*/): void {
		//groupIndex = groupIndex | 0;
		// @todo
		Debug.throwPIR('playerglobals/text/engine/GroupElement', 'ungroupElements', '');
	}

	public mergeTextElements(beginIndex: number /*int*/, endIndex: number /*int*/): TextElement {
		//beginIndex = beginIndex | 0;
		//endIndex = endIndex | 0;
		// @todo
		Debug.throwPIR('playerglobals/text/engine/GroupElement', 'mergeTextElements', '');
		return null;
	}

	public splitTextElement(elementIndex: number /*int*/, splitIndex: number /*int*/): TextElement {
		//elementIndex = elementIndex | 0;
		//splitIndex = splitIndex | 0;
		// @todo
		Debug.throwPIR('playerglobals/text/engine/GroupElement', 'groupElements', '');
		return null;
	}

	public replaceElements(
		beginIndex: number /*int*/,
		endIndex: number /*int*/,
		newElements: any/*ASVector<any>*/): any/*ASVector<any>*/ {
		noLogs || console.log('[GroupElement]  ' + this._id + ' - replaceElements',
			'beginIndex', beginIndex, 'endIndex', endIndex, 'newElements', newElements);
		let cnt = 0;
		if (endIndex - beginIndex > newElements._buffer.length) {
			console.warn('[GroupElement] - replaceElements error with range and vector size');

		}
		for (let i = beginIndex; i <= endIndex; i++) {
			this._elements[i] = newElements._buffer[cnt++];
		}
		for (let i = 0; i < this._elements.length; i++) {
			this._elements[i].setTextBlock(this._textBlock);
			this._elements[i].setGroupElement(this);
		}
		if (this._textBlock)
			this._textBlock.setTextDataDirty();

		return newElements;
	}

	public getElementAtCharIndex(charIndex: number /*int*/): ContentElement {
		//charIndex = charIndex | 0;
		noLogs || console.log('[GroupElement]  ' + this._id + ' - getElementAtCharIndex', charIndex);
		return null;
	}
}
