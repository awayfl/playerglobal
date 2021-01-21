import { AutomationAction } from './AutomationAction';
import { axCoerceString } from '@awayjs/graphics';

export class MouseAutomationAction extends AutomationAction {
	constructor (type: string, stageX: number = 0, stageY: number = 0, delta: number /*int*/ = 0) {
		type = axCoerceString(type); stageX = +stageX; stageY = +stageY; delta = delta | 0;
		super();
	}

	// Static   JS -> AS Bindings
	// Static   AS -> JS Bindings
	// Instance JS -> AS Bindings
	_stageX: number;
	stageX: number;
	_stageY: number;
	stageY: number;
	_delta: number /*int*/;
	delta: number /*int*/;
	// Instance AS -> JS Bindings
}