import { ASObject } from '@awayfl/avm2';

export class CFFHinting extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
	}

	public static NONE: string = 'none';
	public static HORIZONTAL_STEM: string = 'horizontalStem';

}
