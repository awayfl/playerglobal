import { ASObject } from '@awayfl/avm2';
import { Rectangle } from '../geom/Rectangle';

export class AccessibilityImplementation extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null;

	constructor () {
		super();
	}

	// JS -> AS Bindings

	public stub: boolean;
	public errno: number /*uint*/;
	public get_accRole: (childID: number /*uint*/) => number /*uint*/;
	public get_accName: (childID: number /*uint*/) => string;
	public get_accValue: (childID: number /*uint*/) => string;
	public get_accState: (childID: number /*uint*/) => number /*uint*/;
	public get_accDefaultAction: (childID: number /*uint*/) => string;
	public accDoDefaultAction: (childID: number /*uint*/) => void;
	public isLabeledBy: (labelBounds: Rectangle) => boolean;
	public getChildIDArray: () => any [];
	public accLocation: (childID: number /*uint*/) => any;
	public get_accSelection: () => any [];
	public get_accFocus: () => number /*uint*/;
	public accSelect: (operation: number /*uint*/, childID: number /*uint*/) => void;
	public get_selectionAnchorIndex: () => any;
	public get_selectionActiveIndex: () => any;

	// AS -> JS Bindings

}