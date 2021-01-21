import { axCoerceString, ASArray, ASObject } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';

export class TextSnapshot extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	constructor () {
		super();
	}

	// _charCount: number /*int*/;
	get charCount(): number /*int*/ {
		// @todo
		Debug.throwPIR('playerglobals/text/TextSnapshot', 'get charCount', '');
		return 0;
	}

	findText(beginIndex: number /*int*/, textToFind: string, caseSensitive: boolean): number /*int*/ {
		beginIndex = beginIndex | 0; textToFind = axCoerceString(textToFind); caseSensitive = !!caseSensitive;
		// @todo
		Debug.throwPIR('playerglobals/text/TextSnapshot', 'findText', '');
		return 0;
	}

	getSelected(beginIndex: number /*int*/, endIndex: number /*int*/): boolean {
		beginIndex = beginIndex | 0; endIndex = endIndex | 0;
		// @todo
		Debug.throwPIR('playerglobals/text/TextSnapshot', 'getSelected', '');
		return false;
	}

	getSelectedText(includeLineEndings: boolean = false): string {
		includeLineEndings = !!includeLineEndings;
		// @todo
		Debug.throwPIR('playerglobals/text/TextSnapshot', 'getSelectedText', '');
		return '';
	}

	getText(beginIndex: number /*int*/, endIndex: number /*int*/, includeLineEndings: boolean = false): string {
		beginIndex = beginIndex | 0; endIndex = endIndex | 0; includeLineEndings = !!includeLineEndings;
		// @todo
		Debug.throwPIR('playerglobals/text/TextSnapshot', 'getText', '');
		return '';
	}

	getTextRunInfo(beginIndex: number /*int*/, endIndex: number /*int*/): ASArray {
		beginIndex = beginIndex | 0; endIndex = endIndex | 0;
		// @todo
		Debug.throwPIR('playerglobals/text/TextSnapshot', 'getTextRunInfo', '');
		return null;
	}

	hitTestTextNearPos(x: number, y: number, maxDistance: number = 0): number {
		x = +x; y = +y; maxDistance = +maxDistance;
		// @todo
		Debug.throwPIR('playerglobals/text/TextSnapshot', 'hitTestTextNearPos', '');
		return 0;
	}

	setSelectColor(hexColor: number /*uint*/ = 16776960): void {
		hexColor = hexColor >>> 0;
		// @todo
		Debug.throwPIR('playerglobals/text/TextSnapshot', 'setSelectColor', '');
	}

	setSelected(beginIndex: number /*int*/, endIndex: number /*int*/, select: boolean): void {
		beginIndex = beginIndex | 0; endIndex = endIndex | 0; select = !!select;
		// @todo
		Debug.throwPIR('playerglobals/text/TextSnapshot', 'setSelected', '');
	}
}