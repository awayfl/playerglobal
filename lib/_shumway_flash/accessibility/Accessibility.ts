import { ASObject } from '@awayfl/avm2';
import { DisplayObject } from '../display/DisplayObject';

export class Accessibility extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// JS -> AS Bindings

	// AS -> JS Bindings
	private static _active: boolean = false;

	public static get active(): boolean {
		return Accessibility._active;
	}

	public static sendEvent(
		source: DisplayObject,
		childID: number /*uint*/,
		eventType: number /*uint*/,
		nonHTML: boolean = false): void {
		console.warn('[Accessibility] - sendEvent not implemented');
	}

	public static updateProperties(): void {
		console.warn('[Accessibility] - updateProperties not implemented');
	}

}