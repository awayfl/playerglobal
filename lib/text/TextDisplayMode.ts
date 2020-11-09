import { ASObject } from '@awayfl/avm2';

export class TextDisplayMode extends ASObject {

	public static classInitializer: any = null;
	public static classSymbols: string [] = null;
	public static instanceSymbols: string [] = null;

	public static LCD: string = 'lcd';
	public static CRT: string = 'crt';
	public static DEFAULT: string = 'default';

	constructor() {
		super();
		console.warn('[TextDisplayMode] not implemented');
	}
}