import { ASObject } from '../../avm2/nat/ASObject';
import { axCoerceString } from '../../avm2/run/axCoerceString';
export class URLRequestHeader extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = ['name!', 'value!'];

	constructor (name: string = '', value: string = '') {
		super();
		this.name = axCoerceString(name);
		this.value = axCoerceString(value);
	}

	name: string;
	value: string;
}