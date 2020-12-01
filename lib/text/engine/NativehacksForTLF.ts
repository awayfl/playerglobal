
import { ASObject } from '@awayfl/avm2';

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