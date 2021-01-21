import { ASObject } from '@awayfl/avm2';
export class GesturePhase extends ASObject {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	constructor() {
		super();
	}

	// JS -> AS Bindings
	static BEGIN: string = 'begin';
	static UPDATE: string = 'update';
	static END: string = 'end';
	static ALL: string = 'all';
}