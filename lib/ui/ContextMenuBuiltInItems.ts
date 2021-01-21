import { ASObject } from '@awayfl/avm2';

export class ContextMenuBuiltInItems extends ASObject {
	static classInitializer: any = null;

	constructor() {
		super();

		this._save = true;
		this._zoom = true;
		this._quality = true;
		this._play = true;
		this._loop = true;
		this._rewind = true;
		this._forwardAndBack = true;
		this._print = true;
	}

	private _save: boolean;
	private _zoom: boolean;
	private _quality: boolean;
	private _play: boolean;
	private _loop: boolean;
	private _rewind: boolean;
	private _forwardAndBack: boolean;
	private _print: boolean;

	get save(): boolean {
		return this._save;
	}

	set save(val: boolean) {
		this._save = !!val;
	}

	get zoom(): boolean {
		return this._zoom;
	}

	set zoom(val: boolean) {
		this._zoom = !!val;
	}

	get quality(): boolean {
		return this._quality;
	}

	set quality(val: boolean) {
		this._quality = !!val;
	}

	get play(): boolean {
		return this._play;
	}

	set play(val: boolean) {
		this._play = !!val;
	}

	get loop(): boolean {
		return this._loop;
	}

	set loop(val: boolean) {
		this._loop = !!val;
	}

	get rewind(): boolean {
		return this._rewind;
	}

	set rewind(val: boolean) {
		this._rewind = !!val;
	}

	get forwardAndBack(): boolean {
		return this._forwardAndBack;
	}

	set forwardAndBack(val: boolean) {
		this._forwardAndBack = !!val;
	}

	get print(): boolean {
		return this._print;
	}

	set print(val: boolean) {
		this._print = !!val;
	}

	clone(): ContextMenuBuiltInItems {
		const items = new ContextMenuBuiltInItems();
		items._save = this._save;
		items._zoom = this._zoom;
		items._quality = this._quality;
		items._play = this._play;
		items._loop = this._loop;
		items._rewind = this._rewind;
		items._forwardAndBack = this._forwardAndBack;
		items._print = this._print;
		return items;
	}
}
