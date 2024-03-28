import { ASObject } from '@awayfl/avm2';

export class BitmapDataChannel extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// JS -> AS Bindings
	public static ALPHA: number /*uint*/ = 8;
	public static BLUE: number /*uint*/ = 4;
	public static GREEN: number /*uint*/ = 2;
	public static RED: number /*uint*/ = 1;

}