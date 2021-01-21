
import { ASArray, ASObject, axCoerceString } from '@awayfl/avm2';
import { notImplemented, release, somewhatImplemented, FileLoadingService } from '@awayfl/swf-loader';
export class Security extends ASObject {

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
	static REMOTE: string = 'remote';
	static LOCAL_WITH_FILE: string = 'localWithFile';
	static LOCAL_WITH_NETWORK: string = 'localWithNetwork';
	static LOCAL_TRUSTED: string = 'localTrusted';
	static APPLICATION: string = 'application';

	// AS -> JS Bindings
	private static _exactSettings: boolean = false;
	// static _disableAVM1Loading: boolean;
	private static _sandboxType: string = 'remote';
	// static _pageDomain: string;
	static get exactSettings(): boolean {
		return Security._exactSettings;
	}

	static set exactSettings(value: boolean) {
		value = !!value;
		Security._exactSettings = value;
	}

	static get disableAVM1Loading(): boolean {
		release || notImplemented('public flash.system.Security::get disableAVM1Loading'); return;
		// return Security._disableAVM1Loading;
	}

	static set disableAVM1Loading(value: boolean) {
		value = !!value;
		release || notImplemented('public flash.system.Security::set disableAVM1Loading'); return;
		// Security._disableAVM1Loading = value;
	}

	static get sandboxType(): string {
		release || somewhatImplemented('public flash.system.Security::get sandboxType');
		return Security._sandboxType;
	}

	static get pageDomain(): string {
		release || somewhatImplemented('public flash.system.Security::get pageDomain');
		// TODO: convert this to proper URI parsing.
		const pageHost: string = FileLoadingService.resolveUrl('/');
		const parts = pageHost.split('/'); parts.pop();
		return parts.pop();
	}

	static allowDomain(): void {
		release || somewhatImplemented('public flash.system.Security::static allowDomain ["' +
      Array.prototype.join.call(arguments, '", "') + '"]');
		/*var whitelist: ICrossDomainSWFLoadingWhitelist = this.sec.player;
    for (var i = 0; i < arguments.length; i++) {
      whitelist.addToSWFLoadingWhitelist(axCoerceString(arguments[i]) || '', false, false);
    }*/
	}

	static allowInsecureDomain(): void {
		release || somewhatImplemented('public flash.system.Security::static allowInsecureDomain');
		/*var whitelist: ICrossDomainSWFLoadingWhitelist = this.sec.player;
    for (var i = 0; i < arguments.length; i++) {
      whitelist.addToSWFLoadingWhitelist(axCoerceString(arguments[i]) || '', true, false);
    }*/
	}

	static loadPolicyFile(url: string): void {
		url = axCoerceString(url);
		release || somewhatImplemented('public flash.system.Security::static loadPolicyFile');
	}

	static showSettings(panel: string = 'default'): void {
		panel = axCoerceString(panel);
		release || notImplemented('public flash.system.Security::static showSettings'); return;
	}

	static duplicateSandboxBridgeInputArguments(toplevel: ASObject, args: ASArray): ASArray {
		release || notImplemented('public flash.system.Security::static duplicateSandboxBridgeInputArguments'); return;
	}

	static duplicateSandboxBridgeOutputArgument(toplevel: ASObject, arg: any): any {
		release || notImplemented('public flash.system.Security::static duplicateSandboxBridgeOutputArgument'); return;
	}

}

export const enum CrossDomainSWFLoadingWhitelistResult {
	/**
   * The requested domain belongs to the same domain as SWF's.
   */
	OwnDomain = 0,
	/**
   * The requested domain belongs to the other domain than SWF's.
   */
	Remote = 1,
	/**
   * The requested domain is not whitelisted.
   */
	Failed = 2
}

export interface ICrossDomainSWFLoadingWhitelist {
	addToSWFLoadingWhitelist(domain: string, insecure: boolean, ownDomain: boolean);
	checkDomainForSWFLoading(domain: string): CrossDomainSWFLoadingWhitelistResult;
}
