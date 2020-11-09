import { EventDispatcher } from '../../events/EventDispatcher';
import { ContentElement } from './ContentElement';
import { ElementFormat } from './ElementFormat';

export class TextElement extends ContentElement {

	static forceNative: boolean = true;
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	public static initializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // [];

	constructor(
		text: string = null,
		elementFormat: ElementFormat = null,
		eventMirror: EventDispatcher = null,
		textRotation: string = 'rotate0') {
		super(undefined, undefined, undefined);
		console.warn('[TextElement] not implemented');
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

	// _text: string;
	public set text(value: string) {
		console.warn('[TextElement] - set text not implemented');
	}

	public replaceText(beginIndex: number /*int*/, endIndex: number /*int*/, newText: string): void {
		console.warn('[TextElement] - replaceText not implemented');
	}
}
