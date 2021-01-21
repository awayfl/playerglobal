import { AutomationAction } from './AutomationAction';
import { axCoerceString } from '@awayjs/graphics';

export class KeyboardAutomationAction extends AutomationAction {
	constructor (type: string, keyCode: number /*uint*/ = 0) {
		type = axCoerceString(type); keyCode = keyCode >>> 0;
		super();
	}

	// Static   JS -> AS Bindings
	// Static   AS -> JS Bindings
	// Instance JS -> AS Bindings
	_keyCode: number /*uint*/;
	keyCode: number /*uint*/;
	// Instance AS -> JS Bindings
}