import { ASObject, ByteArray } from '@awayfl/avm2';
import { X500DistinguishedName } from './X500DistinguishedName';

export class X509Certificate extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// _version: number /*uint*/;
	// _serialNumber: string;
	// _signatureAlgorithmOID: string;
	// _signatureAlgorithmParams: flash.utils.ByteArray;
	// _issuer: flash.security.X500DistinguishedName;
	// _validNotBefore: ASDate;
	// _validNotAfter: ASDate;
	// _subject: flash.security.X500DistinguishedName;
	// _subjectPublicKeyAlgorithmOID: string;
	// _subjectPublicKey: string;
	// _issuerUniqueID: string;
	// _subjectUniqueID: string;
	// _encoded: flash.utils.ByteArray;
	get version(): number /*uint*/ {
		return 0;
		// return this._version;
	}

	get serialNumber(): string {
		return '';
		// return this._serialNumber;
	}

	get signatureAlgorithmOID(): string {
		return '';
		// return this._signatureAlgorithmOID;
	}

	get signatureAlgorithmParams(): ByteArray {
		return null;
		// return this._signatureAlgorithmParams;
	}

	get issuer(): X500DistinguishedName {
		return null;
	}

	get validNotBefore(): ASDate {
		return null;
	}

	get validNotAfter(): ASDate {
		return null;
	}

	get subject(): X500DistinguishedName {
		return null;
	}

	get subjectPublicKeyAlgorithmOID(): string {
		return '';
	}

	get subjectPublicKey(): string {
		return '';
	}

	get issuerUniqueID(): string {
		return '';
	}

	get subjectUniqueID(): string {
		return '';
	}

	get encoded(): ByteArray {
		return null;
	}
}