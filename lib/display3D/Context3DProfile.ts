import { ASObject } from '@awayfl/avm2';

export class Context3DProfile extends ASObject {
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	public static BASELINE: string = 'baseline';
	public static BASELINE_CONSTRAINED: string = 'baselineConstrained';
	public static BASELINE_EXTENDED: string = 'baselineExtended';
	public static STANDARD: string = 'standard';
	public static STANDARD_CONSTRAINED: string = 'standardConstrained';
	public static STANDARD_EXTENDED: string = 'standardExtended';
}