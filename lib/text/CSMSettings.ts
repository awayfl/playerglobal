
import { ASObject } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';

export class CSMSettings extends ASObject {

	public static classInitializer: any = null;
	public static classSymbols: string [] = null;
	public static instanceSymbols: string [] = null; // ["fontSize", "insideCutoff", "outsideCutoff"];

	// JS -> AS Bindings
	public fontSize: number;
	public insideCutoff: number;
	public outsideCutoff: number;

	constructor(fontSize: number, insideCutoff: number, outsideCutoff: number) {
		super();
		this.fontSize = +fontSize;
		this.insideCutoff = +insideCutoff;
		this.outsideCutoff = +outsideCutoff;
		// @todo
		Debug.throwPIR('playerglobals/text/CSMSettings', 'constructor', '');
	}

}