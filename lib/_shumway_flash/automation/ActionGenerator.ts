import { ASObject } from '@awayfl/avm2';
import { AutomationAction } from './AutomationAction';
export class ActionGenerator extends ASObject {
	constructor () {
		super();
	}

	// Static   JS -> AS Bindings
	// Static   AS -> JS Bindings
	// Instance JS -> AS Bindings
	generateAction: (action: AutomationAction) => void;
	// Instance AS -> JS Bindings
	generateActions(a: any []): void {}
}