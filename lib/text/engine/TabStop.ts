import { ASObject, axCoerceString } from '@awayfl/avm2';
import { Debug } from '@awayjs/core';

export class TabStop extends ASObject {

	static forceNativeConstructor: boolean = true;
	static forceNativeMethods: boolean = true;

	constructor(
		alignment: string = 'start',
		position: number = 0,
		decimalAlignmentToken: string = '') {
		alignment = axCoerceString(alignment);
		position = +position;
		decimalAlignmentToken = axCoerceString(decimalAlignmentToken);
		super();
	}

	// JS -> AS Bindings

	// AS -> JS Bindings

	// _alignment: string;
	// _position: number;
	// _decimalAlignmentToken: string;
	public get alignment(): string {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TabStop', 'get alignment', '');
		return;
	}

	public set alignment(value: string) {
		value = axCoerceString(value);
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TabStop', 'set alignment', '');
	}

	public get position(): number {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TabStop', 'get position', '');
		return;
	}

	public set position(value: number) {
		value = +value;
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TabStop', 'set position', '');
	}

	public get decimalAlignmentToken(): string {
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TabStop', 'get decimalAlignmentToken', '');
		return;
	}

	public set decimalAlignmentToken(value: string) {
		value = axCoerceString(value);
		// @todo
		Debug.throwPIR('playerglobals/text/engine/TabStop', 'set decimalAlignmentToken', '');
	}
}