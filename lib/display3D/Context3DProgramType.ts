import { ASObject } from '@awayfl/avm2';

export class Context3DProgramType extends ASObject {
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	public static FRAGMENT: string = 'fragment';
	public static VERTEX = 'vertex';
}