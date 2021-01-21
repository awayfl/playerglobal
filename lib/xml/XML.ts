import { XMLNode } from './XMLNode';
import { XMLNodeType } from './XMLNodeType';
import { XMLList } from './XMLList';
import { Debug } from '@awayjs/core';
export class XML extends XMLNode {
	public contentType: string;
	public docTypeDecl: string;
	public ignoreWhite: boolean;
	public loaded: boolean;
	public status: number;
	public xmlDecl: string;
	public static ignoreWhitespace: boolean;
	public col: XMLList;
	public attribute: any;

	constructor(text: string) {
		super(XMLNodeType.XML_DECLARATION, 'null');
	}

	public addRequestHeader(header: any, headerValue: string) {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'addRequestHeader', '');
	}

	public createElement(name: string): XMLNode {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'createElement', '');
		return null;
	}

	public createTextNode(value: string): XMLNode {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'createTextNode', '');
		return null;
	}

	public getBytesLoaded(): number {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'getBytesLoaded', '');
		return 0;
	}

	public getBytesTotal(): number {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'getBytesTotal', '');
		return 0;
	}

	// Central API
	public getRequestHeaders(): any {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'getRequestHeaders', '');
		return null;
	}

	// Central API
	public getRequestHeader(key: string): any {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'getRequestHeader', '');
		return null;
	}

	// Central API
	public getResponseHeaders(): any {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'getResponseHeaders', '');
		return null;
	}

	// Central API
	public getResponseHeader(key: string): any {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'getResponseHeader', '');
		return null;
	}

	// Central API
	public getResponseBody(): any {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'getResponseBody', '');
		return null;
	}

	public load(url: string): boolean {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'load', '');
		return false;
	}

	public parseXML(value: string) {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'parseXML', '');
	}

	public send(url: string,target: string,method: string): boolean {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'send', '');
		return false;
	}

	public sendAndLoad(url: string, resultXML: XML) {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'sendAndLoad', '');
	}

	public onLoad(success: boolean) {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'onLoad', '');
	}

	public onData(src: string) {
		// @todo
		Debug.throwPIR('playerglobals/xml/XML', 'onData', '');
	}
}