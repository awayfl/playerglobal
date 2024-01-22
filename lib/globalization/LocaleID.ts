import { ASObject, GenericVector, AXClass } from '@awayfl/avm2';

export abstract class LastOperationStatus {
	static readonly BUFFER_OVERFLOW_ERROR: string = 'bufferOverflowError';
	static readonly ERROR_CODE_UNKNOWN: string = 'errorCodeUnknown';
	static readonly ILLEGAL_ARGUMENT_ERROR: string = 'illegalArgumentError';
	static readonly INDEX_OUT_OF_BOUNDS_ERROR: string = 'indexOutOfBoundsError';
	static readonly INVALID_ATTR_VALUE: string = 'invalidAttrValue';
	static readonly INVALID_CHAR_FOUND: string = 'invalidCharFound';
	static readonly MEMORY_ALLOCATION_ERROR: string = 'memoryAllocationError';
	static readonly NO_ERROR: string = 'noError';
	static readonly NUMBER_OVERFLOW_ERROR: string = 'numberOverflowError';
	static readonly PARSE_ERROR: string = 'parseError';
	static readonly PATTERN_SYNTAX_ERROR: string = 'patternSyntaxError';
	static readonly PLATFORM_API_FAILED: string = 'platformAPIFailed';
	static readonly TRUNCATED_CHAR_FOUND: string = 'truncatedCharFound';
	static readonly UNEXPECTED_TOKEN: string = 'unexpectedToken';
	static readonly UNSUPPORTED_ERROR: string = 'unsupportedError';
	static readonly USING_DEFAULT_WARNING: string = 'usingDefaultWarning';
	static readonly USING_FALLBACK_WARNING: string = 'usingFallbackWarning';
}

export class LocaleID extends ASObject {
	static axClass: typeof LocaleID;

	public readonly DEFAULT: string = 'i-default';

	private _lastOperationStatus: string = LastOperationStatus.USING_DEFAULT_WARNING;

	public get lastOperationStatus(): string {
		return this._lastOperationStatus;
	}

	public get name(): string {
		return this._name;
	}

	get ctor() {
		return LocaleID;
	}

	constructor(private _name: string) {
		super();
	}

	public static determinePreferredLocales(
		want: GenericVector,
		have: GenericVector,
		keyword: string = 'userinterface'
	): GenericVector {
		console.warn('[LocaleID] `determinePreferredLocales` not implemented');

		return new GenericVector();
	}

	getLanguage(): string {
		console.warn('[LocaleID] `getLanguage` not implemented, use default: en');

		this._lastOperationStatus = LastOperationStatus.NO_ERROR;
		return 'en';
	}

	getRegion(): string {
		console.warn('[LocaleID] `getRegion` not implemented, use default: UK');

		this._lastOperationStatus = LastOperationStatus.NO_ERROR;
		return 'UK';
	}

	getScript(): string {
		console.warn('[LocaleID] `getScript` not implemented, use default: \'\'');

		this._lastOperationStatus = LastOperationStatus.USING_DEFAULT_WARNING;
		return '';
	}

	getVariant(): String {
		console.warn('[LocaleID] `getVariant` not implemented, use default: \'\'');

		this._lastOperationStatus = LastOperationStatus.USING_DEFAULT_WARNING;
		return '';
	}

	isRightToLeft(): Boolean {
		console.warn('[LocaleID] `isRightToLeft` not implemented, use default: true');

		return true;
	}

	getKeysAndValues(): Object {
		console.warn('[LocaleID] `isRightToLeft` not implemented, use default: null');

		this._lastOperationStatus = LastOperationStatus.USING_DEFAULT_WARNING;
		return null;
	}
}
