import { Sprite } from '../../display/Sprite';
import { EventDispatcher } from '../../events/EventDispatcher';
import { Rectangle } from '../../geom/Rectangle';
import { PrintJobOptions } from './PrintJobOptions';

export class PrintJob extends EventDispatcher {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string[] = null; // ["isSupported"];

	// List of instance symbols to link.
	static instanceSymbols: string[] = null;

	constructor() {
		super();
	}

	// JS -> AS Bindings
	static isSupported: boolean;

	paperHeight: number /*int*/;
	paperWidth: number /*int*/;
	pageHeight: number /*int*/;
	pageWidth: number /*int*/;
	orientation: string;
	start: () => boolean;
	send: () => void;
	addPage: (sprite: Sprite,
		printArea: Rectangle, options: PrintJobOptions, frameNum: number /*int*/) => void;

	// AS -> JS Bindings
	// static _isSupported: boolean;

	// _paperHeight: number /*int*/;
	// _paperWidth: number /*int*/;
	// _pageHeight: number /*int*/;
	// _pageWidth: number /*int*/;
	// _orientation: string;
}
