import { Debug } from '@awayjs/core';

export class Trace extends Object {
	public static FILE: any;
	public static LISTENER: any;
	public static METHODS: number;
	public static METHODS_AND_LINES: number;
	public static METHODS_AND_LINES_WITH_ARGS: number;
	public static METHODS_WITH_ARGS: number;
	public static OFF: number;

	public static getLevel (target: number = 2): number {
		// @todo
		Debug.throwPIR('playerglobals/utils/Trace', 'getLevel', '');
		return 0;
	}

	public static getListener (): Function {
		// @todo
		Debug.throwPIR('playerglobals/utils/Trace', 'getListener', '');
		return null;
	}

	public static setLevel (l: number, target: number = 2): any {
		// @todo
		Debug.throwPIR('playerglobals/utils/Trace', 'setLevel', '');
	}

	public static setListener (f: Function): any {
		// @todo
		Debug.throwPIR('playerglobals/utils/Trace', 'setListener', '');
	}
}
