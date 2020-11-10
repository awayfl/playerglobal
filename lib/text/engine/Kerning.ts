import { ASObject } from '@awayfl/avm2';

export class Kerning extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor() {
		super();
		console.warn('[Kerning] not implemented');
	}

	// JS -> AS Bindings
	static ON: string = 'on';
	static OFF: string = 'off';
	static AUTO: string = 'auto';

	// AS -> JS Bindings

}
