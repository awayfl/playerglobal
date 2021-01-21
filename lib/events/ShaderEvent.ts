import { Event } from './Event';
import { BitmapData } from '../display/BitmapData';
import { ByteArray } from '@awayfl/avm2';
export class ShaderEvent extends Event {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		bitmap: BitmapData = null, array: ByteArray = null,
		vector: any /*Vector>*/ = null) {
		super(type, bubbles, cancelable);
	}

	// JS -> AS Bindings
	static COMPLETE: string = 'complete';
}