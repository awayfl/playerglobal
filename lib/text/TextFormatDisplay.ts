import { ASObject } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';

export class TextFormatDisplay extends ASObject {

	public static classInitializer: any = null;
	public static classSymbols: string [] = null;
	public static instanceSymbols: string [] = null;

	public static INLINE: string = 'inline';
	public static BLOCK: string = 'block';

	constructor() {
		super();
		// @todo
		Debug.throwPIR('playerglobals/text/TextFormatDisplay', 'constructor', '');
	}

}