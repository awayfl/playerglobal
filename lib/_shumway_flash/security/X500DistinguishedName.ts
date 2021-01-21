import { ASObject } from '@awayfl/avm2';
export class X500DistinguishedName extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// _commonName: string;
	// _organizationName: string;
	// _organizationalUnitName: string;
	// _localityName: string;
	// _stateOrProvinceName: string;
	// _countryName: string;
	get commonName(): string {
		return '';
		// return this._commonName;
	}

	get organizationName(): string {
		return '';
		// return this._organizationName;
	}

	get organizationalUnitName(): string {
		return '';
		// return this._organizationalUnitName;
	}

	get localityName(): string {
		return '';
		// return this._localityName;
	}

	get stateOrProvinceName(): string {
		return '';
		// return this._stateOrProvinceName;
	}

	get countryName(): string {
		return '';
		// return this._countryName;
	}

	toString(): string {
		return '';
	}
}