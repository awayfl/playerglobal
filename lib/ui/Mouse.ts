import { ASObject } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';

export class Mouse extends ASObject {

	static axClass: typeof Mouse;
	private static _cursor: string;
	/*
	 The name of the native cursor.
	 */
	public static get cursor(): string {
		return Mouse._cursor;
	}

	public static set cursor(value: string) {
		Mouse._cursor = value;
	}

	/*
	 [read-only] Indicates whether the computer or device displays a persistent cursor.
	 */
	public static get supportsCursor(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/ui/Mouse', 'static get supportsCursor', '');
		return true;
	}

	/*
	 [read-only] Indicates whether the current configuration supports native cursors.
	 */
	public static get supportsNativeCursor(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/ui/Mouse', 'static get supportsNativeCursor', '');
		return true;
	}

	/*
	 Hides the pointer.
	 */
	public static hide() {
		this.sec.player.mouseManager.showCursor = false;
		// @todo
		// Debug.throwPIR('playerglobals/ui/Mouse', 'static hide', '');
	}

	/*
	 Displays the pointer.
	 */
	public static show() {
		this.sec.player.mouseManager.showCursor = true;
		// @todo
		// Debug.throwPIR('playerglobals/ui/Mouse', 'static show', '');
	}

	/*
	 Registers a native cursor under the given name, with the given data.
	 */
	public static registerCursor(name: string, cursor: any)	{
		// @todo
		Debug.throwPIR('playerglobals/ui/Mouse', 'static registerCursor', '');
	}

	/*
	 Unregisters a native cursor under the given name, with the given data.
	 */
	public static unregisterCursor(name: string) {
		// @todo
		Debug.throwPIR('playerglobals/ui/Mouse', 'static unregisterCursor', '');
	}
}