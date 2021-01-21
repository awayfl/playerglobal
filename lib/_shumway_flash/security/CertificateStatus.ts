import { ASObject } from '@awayfl/avm2';

export class CertificateStatus extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// JS -> AS Bindings
	static TRUSTED: string = 'trusted';
	static UNKNOWN: string = 'unknown';
	static INVALID: string = 'invalid';
	static EXPIRED: string = 'expired';
	static NOT_YET_VALID: string = 'notYetValid';
	static PRINCIPAL_MISMATCH: string = 'principalMismatch';
	static UNTRUSTED_SIGNERS: string = 'untrustedSigners';
	static REVOKED: string = 'revoked';
	static INVALID_CHAIN: string = 'invalidChain';
}