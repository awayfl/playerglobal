import { ASObject } from '@awayfl/avm2';

export class SpaceJustifier extends ASObject {
	get letterSpacing() { return null;}
	set letterSpacing(e) {}

	get minimumSpacing() { return null;}
	set minimumSpacing(e) {}

	get optimumSpacing() { return null;}
	set optimumSpacing(e) {}

	private _maximumSpacing;
	public get maximumSpacing() {
		return this._maximumSpacing;
	}

	public set maximumSpacing(value) {
		this._maximumSpacing = value;
	}
}