import { ASObject } from '@awayfl/avm2';

export class SWFVersion extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// JS -> AS Bindings
	static FLASH1: number /*uint*/ = 1;
	static FLASH2: number /*uint*/ = 2;
	static FLASH3: number /*uint*/ = 3;
	static FLASH4: number /*uint*/ = 4;
	static FLASH5: number /*uint*/ = 5;
	static FLASH6: number /*uint*/ = 6;
	static FLASH7: number /*uint*/ = 7;
	static FLASH8: number /*uint*/ = 8;
	static FLASH9: number /*uint*/ = 9;
	static FLASH10: number /*uint*/ = 10;
	static FLASH11: number /*uint*/ = 11;
	static FLASH12: number /*uint*/ = 12;

	// AS -> JS Bindings

}