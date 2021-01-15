
import { ASObject } from '@awayfl/avm2';

/**
 * these classes are used to overrite some methods in the TLF classes,
 * because the abc-classes make problems i could not fix otherwise
 */

// flashx/textlayout/property/Property
export class Property extends ASObject {

	static forceNativeConstructor: boolean = false;
	static forceNativeMethods: boolean = true;
	public static createObjectWithPrototype(obj: any): any {
		const newObj = obj.sec.AXObject.axConstruct([]);

		for (const attr in obj) {
			if (obj.hasOwnProperty(attr)) {
				newObj[attr] = obj[attr];
			}
		}
		return newObj;
	}
}

//flashx.textLayout.conversion.BaseTextLayoutImporter
export class BaseTextLayoutImporter extends ASObject {

	static forceNativeConstructor: boolean = false;
	static forceNativeMethods: boolean = true;
	private _textFlowNamespace;
	protected checkNamespace(param1: any): boolean {
		const _loc2 = param1.$Bgnamespace();
		//console.log('namespace of xml', _loc2.prefix, _loc2.uri, param1);
		//console.log('namespace of this', (<any> this).$Bgns.prefix, (<any> this).$Bgns.uri);
		if (!this._textFlowNamespace) {
			if (_loc2.uri != (<any> this).$Bgns.uri) {
				return false;
			}
			this._textFlowNamespace = _loc2;
		} else if (_loc2.uri != this._textFlowNamespace.uri) {

			return false;
		}
		//console.log('_textFlowNamespace', (<any> this)._textFlowNamespace.uri);

		return true;
	}
}
export class TLFTextField extends ASObject {

	static forceNativeConstructor: boolean = false;
	static forceNativeMethods: boolean = true;

	public set text(param1: string) {
		console.log('set text native', param1);
	}
}