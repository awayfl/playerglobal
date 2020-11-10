import { ASObject } from '@awayfl/avm2';

export class LineJustification extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[LineJustification] not implemented');
	}

	// JS -> AS Bindings
	public static UNJUSTIFIED: string = 'unjustified';
	public static ALL_BUT_LAST: string = 'allButLast';
	public static ALL_INCLUDING_LAST: string = 'allIncludingLast';
	public static ALL_BUT_MANDATORY_BREAK: string = 'allButMandatoryBreak';

	// AS -> JS Bindings

}
