
export class ActionGenerator extends ASObject {
	constructor () {
		super();
	}

	// Static   JS -> AS Bindings
	// Static   AS -> JS Bindings
	// Instance JS -> AS Bindings
	generateAction: (action: AutomationAction) => void;
	// Instance AS -> JS Bindings
	generateActions(a: any []): void {
		a = a;
		release || release || notImplemented('public flash.automation.ActionGenerator::generateActions'); return;
	}
}