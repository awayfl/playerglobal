import { ASObject } from '@awayfl/avm2';

export class CompositionAttributeRange extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // ["relativeStart", "relativeEnd", "selected", "converted"];

	public relativeStart: number /*int*/;

	public relativeEnd: number /*int*/;

	public selected: boolean;

	public converted: boolean;

	constructor(relativeStart: number /*int*/, relativeEnd: number /*int*/, selected: boolean, converted: boolean) {
		relativeStart = relativeStart | 0;
		relativeEnd = relativeEnd | 0;
		selected = !!selected;
		converted = !!converted;
		super();
	}
}