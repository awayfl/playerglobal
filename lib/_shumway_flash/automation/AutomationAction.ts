import { ASObject } from '@awayfl/avm2';

export class AutomationAction extends ASObject {
	constructor () {
		super();
	}

	// Static   JS -> AS Bindings
	// Static   AS -> JS Bindings
	// Instance JS -> AS Bindings
	_type: string;
	type: string;
	// Instance AS -> JS Bindings
}