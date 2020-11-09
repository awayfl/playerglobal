import { EventDispatcher } from '../events/EventDispatcher';
export class NativeMenu extends EventDispatcher {

	public static classInitializer: any = null;
	public static classSymbols: string [] = null; // [];
	public static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}
}