import { ASArray } from '@awayfl/avm2';
//import { ASFunction } from '@awayfl/avm2/dist/lib/nat/ASFunction';
import { Timer } from './Timer';
export class SetIntervalTimer extends Timer {

	static classInitializer: any = null;

	constructor (closure: ASFunction, delay: number, repeats: boolean, rest: ASArray) {
		super(+delay, repeats ? 0 : 1);
	}

	// JS -> AS Bindings
	static intervalArray: ASArray;
	static _clearInterval: (id: number /*uint*/) => void;

	reference: number /*uint*/;
	closure: ASFunction;
	rest: ASArray;
	onTimer: (event: Event) => void;
}