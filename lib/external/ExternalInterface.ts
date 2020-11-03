import { MapObject, ExternalInterfaceService } from '@awayfl/swf-loader';
import { ASObject, ASXML, Errors, AXFunction, axCoerceString, AXXMLClass, AXObject, NamespaceType, Multiname } from '@awayfl/avm2';

/**
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Class: ExternalInterface

export class ExternalInterface extends ASObject {

	static classInitializer: any = null;

	constructor () {
		super();
	}

	static $BgmarshallExceptions: boolean;

	private static initialized: boolean = false;
	private static registeredCallbacks: MapObject<Function> = Object.create(null);

	static ensureInitialized(): void {
		if (!this.available) {
			this.sec.throwError('Error', Errors.ExternalInterfaceNotAvailableError);
		}
		if (this.initialized) {
			return;
		}
		this.initialized = true;
		ExternalInterfaceService.initJS(this._callIn);
	}

	static call(functionName: string) {
		this.ensureInitialized();
		let argsExpr: String = '';
		if (arguments.length > 1) {
			const args = [];
			for (let i = 1; i < arguments.length; i++) {
				args.push(this.convertToJSString(arguments[i]));
			}
			argsExpr = args.join(',');
		}
		const catchExpr = this.$BgmarshallExceptions ?
			'"<exception>" + e + "</exception>";' :
			'"<undefined/>";';
		const evalExpr = 'try {'
					+ ExternalInterfaceService.interfaceID
					+ '.__flash__toXML(' + functionName + '(' + argsExpr + '));'
					+ '} catch (e) {' + catchExpr + '}';
		const result = this._evalJS(evalExpr);
		if (result == null) {
			return null;
		}
		return this.convertFromXML(this.convertToXML(result));
	}

	static addCallback(functionName: string, closure: AXFunction): void {
		this.ensureInitialized();
		if (!closure) {
			this._removeCallback(functionName);
			return;
		}

		const self = this;

		this._addCallback(functionName, (request: string, args: any[]) => {
			let returnAsJS: Boolean = true;
			if (typeof args !== 'undefined') {
				if (Array.isArray(args)) {
					const wrappedArgs = [];
					for (var i = 0; i < args.length; i++) {
						const arg = args[i];
						// Objects have to be converted into proper AS objects in the current security domain.
						if (typeof arg === 'object' && arg) {
							if (Array.isArray(arg))
								wrappedArgs.push(self.sec.createArray(arg));
							else
								wrappedArgs.push(self.sec.createObjectFromJS(arg, true));
						} else {
							wrappedArgs.push(arg);
						}
					}
					args = wrappedArgs;
				} else {
					args = [args];
				}
			} else {
				const xml = this.convertToXML(request);
				const returnTypeAttr = xml.attribute('returntype');
				returnAsJS = returnTypeAttr && (<any>returnTypeAttr)._value == 'javascript';
				args = [];
				if (xml._children) {
					for (var i = 0; i < xml._children.length; i++) {
						const x = xml._children[i];
						args.push(this.convertFromXML(x));
					}

				}
			}

			let result;
			try {
				result = closure.axApply(null, args);
			} catch (e) {
				if (this.$BgmarshallExceptions) {
					result = e;
				} else {
					throw e;
				}
			}
			return returnAsJS ? self.convertToJSString(result) : self.convertToXMLString(result);
		});
	}

	static get available(): boolean {
		return ExternalInterfaceService.enabled;
	}

	static get objectID(): string {
		return ExternalInterfaceService.getId();
	}

	static _addCallback(functionName: string, closure: Function): void {
		ExternalInterfaceService.registerCallback(functionName);
		ExternalInterface.registeredCallbacks[functionName] = closure;
	}

	static _removeCallback(functionName: string): void {
		ExternalInterfaceService.unregisterCallback(functionName);
		delete ExternalInterface.registeredCallbacks[functionName];
	}

	static _evalJS(expression: string): string {
		expression = axCoerceString(expression);
		return ExternalInterfaceService.eval(expression);
	}

	private static _callIn(functionName: string, args: any[]) {
		const callback = ExternalInterface.registeredCallbacks[functionName];
		if (!callback) {
			return;
		}
		return callback(functionName, args);
	}

	static _callOut(request: string): string {
		request = axCoerceString(request);
		return ExternalInterfaceService.call(request);
	}

	static convertToXML(s: String): ASXML {
		const xmlClass = <AXXMLClass> this.sec.system.getClass(Multiname.FromSimpleName('XML'));
		const savedIgnoreWhitespace = xmlClass.ignoreWhitespace;
		xmlClass.ignoreWhitespace = false;
		const xml: ASXML = xmlClass.Create(s);
		xmlClass.ignoreWhitespace = savedIgnoreWhitespace;
		return xml;
	}

	static convertToXMLString(obj: any): String {
		switch (typeof obj) {
			case 'boolean':
				return obj ? '<true/>' : '<false/>';
			case 'number':
				return '<number>' + obj + '</number>';
			case 'string':
				return '<string>' + obj.split('&').join('&amp;').split('<').join('&lt;').
					split('>').join('&gt;') + '</string>';
			case 'object':
				if (obj === null) {
					return '<null/>';
				}
				if (this.sec.AXDate.axIsInstanceOf(obj)) {
					return '<date>' + obj.time + '</date>';
				}
				if (this.sec.AXError.axIsInstanceOf(obj)) {
					if (this.$BgmarshallExceptions) {
						return '<exception>' + obj + '</exception>';
					} else {
						return '<null/>'; // not sure?
					}
				}
				var result: string[] = [];
				// Looks like length is used to detect array. (obj is Array) is better?
				if (obj.hasOwnProperty('$Bglength')) {
					const len = obj.$Bglength;
					for (var i = 0; i < len; i++) {
						var entry = this.convertToXMLString(obj.axGetNumericProperty(i));
						result.push('<property id="' + i + '">' + entry + '</property>');
					}
					return '<array>' + result.join('') + '</array>';
				}
				var keys = obj.axGetEnumerableKeys();
				for (var i = 0; i < keys.length; i++) {
					const key = keys[i];
					var entry = this.convertToXMLString(obj.axGetPublicProperty(key));
					result.push('<property id="' + key + '">' + entry + '</property>');
				}
				return '<object>' + result.join('') + '</object>';
			default:
				return '<undefined/>';
		}
	}

	static convertFromXML(xml: any /* ASXML | ASXMLList */): any {
		switch (xml._name.name) {
			case 'true':
				return true;
			case 'false':
				return false;
			case 'number':
				return Number(String(xml.children()));
			case 'string':
				return String(xml.children());
			case 'null':
				return null;
			case 'date':
				return this.sec.AXDate.axConstruct([Number(String(xml.children()))]);
			case 'exception':
				if (this.$BgmarshallExceptions) {
					throw this.sec.AXError.axConstruct([String(xml.children())]);
				}
				return undefined;
			case 'array':
			case 'object':
				var obj: AXObject = xml._name.name === 'object' ?
					this.sec.createObject() :
					this.sec.createArrayUnsafe([]);
				for (let i = 0; i < xml._children.length; i++) {
					const x = xml._children[i];
					obj.axSetPublicProperty(extractId(x), this.convertFromXML(x._children[0]));
				}
				return obj;
			case 'class':
				var className = Multiname.FromFQNString(String(xml.children()), NamespaceType.Public);
				return this.sec.application.getClass(className);
			default:
				return undefined;
		}
	}

	static convertToJSString(obj): string {
		if (typeof obj == 'string') {
			return '"' + obj.split('\r').join('\\r').split('\n').join('\\n').split('"').join('\\"') + '"';
		}
		if (this.sec.AXArray.axIsInstanceOf(obj)) {
			var parts: string[] = [];
			const arr = obj.value;
			for (var i = 0; i < arr.length; i++) {
				parts.push(this.convertToJSString(arr[i]));
			}
			return '[' + parts.join(',') + ']';
		}
		if (this.sec.AXDate.axIsInstanceOf(obj)) {
			return 'new Date(' + obj.value + ')';
		}
		if (this.$BgmarshallExceptions && (this.sec.AXError.axIsInstanceOf(obj))) {
			return 'throw "' + obj + '"';
		}
		if (typeof obj === 'object' && obj !== null) {
			var parts: string[] = [];
			const keys = obj.axGetEnumerableKeys();
			for (var i = 0; i < keys.length; i++) {
				const key = keys[i];
				parts.push(key + ':' + this.convertToJSString(obj.axGetPublicProperty(key)));
			}
			return '({' + parts.join(',') + '})';
		}
		return String(obj);
	}
}

function extractId(node: ASXML) {
	for (let i = 0; i < node._attributes.length; i++) {
		const attribute = node._attributes[i];
		if (attribute._name.name === 'id') {
			return attribute._value;
		}
	}
	// TODO: throw if no `id` attribute was found.
}