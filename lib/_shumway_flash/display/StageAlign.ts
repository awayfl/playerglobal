import { ASObject } from '@awayfl/avm2';

export class StageAlign extends ASObject {

	public static classInitializer: any = null;
	public static classSymbols: string[] = null; // [];
	public static instanceSymbols: string[] = null; // [];

	constructor() {
		super();
	}

	// JS -> AS Bindings
	public static TOP: string = 'T';
	public static LEFT: string = 'L';
	public static BOTTOM: string = 'B';
	public static RIGHT: string = 'R';
	public static TOP_LEFT: string = 'TL';
	public static TOP_RIGHT: string = 'TR';
	public static BOTTOM_LEFT: string = 'BL';
	public static BOTTOM_RIGHT: string = 'BR';

	public static fromNumber(n: number): string {
		/*if (n === 0) {
			return '';
		}
		let s = '';
		if (n & StageAlignFlags.Top) {
			s += 'T';
		}
		if (n & StageAlignFlags.Bottom) {
			s += 'B';
		}
		if (n & StageAlignFlags.Left) {
			s += 'L';
		}
		if (n & StageAlignFlags.Right) {
			s += 'R';
		}
		return s;*/
		console.warn('[playerglobal/display/StageAlign] - fromNumber not implemented');
		return null;
	}

	/**
	* Looks like the Flash player just searches for the "T", "B", "L", "R" characters and
	* maintains an internal bit field for alignment, for instance it's possible to set the
	* alignment value "TBLR" even though there is no enum for it.
	*/
	public static toNumber(value: string): number {
		/*let n = 0;
		value = value.toUpperCase();
		if (value.indexOf('T') >= 0) {
			n |= StageAlignFlags.Top;
		}
		if (value.indexOf('B') >= 0) {
			n |= StageAlignFlags.Bottom;
		}
		if (value.indexOf('L') >= 0) {
			n |= StageAlignFlags.Left;
		}
		if (value.indexOf('R') >= 0) {
			n |= StageAlignFlags.Right;
		}
		return n;*/
		console.warn('[playerglobal/display/StageAlign] - toNumber not implemented');
		return null;
	}
}