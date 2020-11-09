import { ASObject } from '@awayfl/avm2';

export class TextColorType extends ASObject {

	public static classInitializer: any = null;
	public static classSymbols: string [] = null;
	public static instanceSymbols: string [] = null;

	public static DARK_COLOR: string = 'dark';
	public static LIGHT_COLOR: string = 'light';

	constructor () {
		super();
		console.warn('[TextColorType] not implemented');
	}
}