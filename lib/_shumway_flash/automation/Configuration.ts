import { ASObject, axCoerceString } from '@awayfl/avm2';

export class Configuration extends ASObject {
	constructor () {
		super();
	}

	// Static   JS -> AS Bindings
	// Static   AS -> JS Bindings
	public get testAutomationConfiguration(): string {
		return '';
	}

	public set deviceConfiguration(configData: string) {
		configData = axCoerceString(configData);
	}

	public get deviceConfiguration(): string {
		return '';
	}
	// Instance JS -> AS Bindings
	// Instance AS -> JS Bindings
}
