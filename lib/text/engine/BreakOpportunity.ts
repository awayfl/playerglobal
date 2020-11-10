import { ASObject } from '@awayfl/avm2';

export class BreakOpportunity extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[BreakOpportunity] not implemented');
	}

	public static AUTO: string = 'auto';
	public static ANY: string = 'any';
	public static NONE: string = 'none';
	public static ALL: string = 'all';

}