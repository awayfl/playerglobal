import { Debug } from '@awayjs/core';
import { DisplayObject } from '../display/DisplayObject';

export class StaticText extends DisplayObject {

	public static classInitializer: any = null;
	public static classSymbols: string [] = null;
	public static instanceSymbols: string [] = null;

	private _textContent: any/*TextContent*/;

	//_symbol: TextSymbol;
	public applySymbol() {
		// @todo
		Debug.throwPIR('playerglobals/text/StaticText', 'applySymbol', '');
	}

	constructor () {
		super();
		// @todo
		Debug.throwPIR('playerglobals/text/StaticText', 'constructor', '');
	}

	public _canHaveTextContent(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/text/StaticText', '_canHaveTextContent', '');
		return true;
	}

	public _getTextContent(): any/*TextContent*/ {
		// @todo
		Debug.throwPIR('playerglobals/text/StaticText', '_getTextContent', '');
		return this._textContent;
	}

	public get text(): string {
		// @todo
		Debug.throwPIR('playerglobals/text/StaticText', 'text', '');
		return this._textContent.plainText;
	}
}