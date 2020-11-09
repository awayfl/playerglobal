import { Rectangle } from '../../geom/Rectangle';

export interface IIMEClient {

	// JS -> AS Bindings

	compositionStartIndex: number /*int*/;
	compositionEndIndex: number /*int*/;
	verticalTextLayout: boolean;
	selectionAnchorIndex: number /*int*/;
	selectionActiveIndex: number /*int*/;
	updateComposition: (
		text: string,
		attributes: any,//ASVector<any>,
		compositionStartIndex: number /*int*/,
		compositionEndIndex: number /*int*/) => void;
	confirmComposition: (
		text: string,
		preserveSelection: boolean) => void;
	getTextBounds: (startIndex: number /*int*/, endIndex: number /*int*/) => Rectangle;
	selectRange: (anchorIndex: number /*int*/, activeIndex: number /*int*/) => void;
	getTextInRange: (startIndex: number /*int*/, endIndex: number /*int*/) => string;

	// AS -> JS Bindings

	// _compositionStartIndex: number /*int*/;
	// _compositionEndIndex: number /*int*/;
	// _verticalTextLayout: boolean;
	// _selectionAnchorIndex: number /*int*/;
	// _selectionActiveIndex: number /*int*/;
}