import { ASObject } from '@awayfl/avm2';

/**
 * flash.ui.MouseCursorData — data holder for Mouse.registerCursor().
 *
 * Custom native mouse cursors are not rendered by AwayFL (Mouse.registerCursor is a
 * no-op), but content that constructs this class must not hit
 * "Class native is not defined: flash.ui.MouseCursorData", so a working data holder
 * is linked. (A fresh implementation: the _shumway_flash version has stale imports.)
 */
export class MouseCursorData extends ASObject {

	static classInitializer: any = null;
	static classSymbols: string[] = null;
	static instanceSymbols: string[] = null;

	private _data: any = null;
	private _hotSpot: any = null;
	private _frameRate: number = 0;

	get data(): any {
		return this._data;
	}

	set data(value: any) {
		this._data = value;
	}

	get hotSpot(): any {
		return this._hotSpot;
	}

	set hotSpot(value: any) {
		this._hotSpot = value;
	}

	get frameRate(): number {
		return this._frameRate;
	}

	set frameRate(value: number) {
		this._frameRate = +value;
	}
}
