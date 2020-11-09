import { TextFormat } from './TextFormat';
import { ASObject } from '@awayfl/avm2';

export class TextRun extends ASObject {

	public static classInitializer: any = null;

	constructor(beginIndex: number /*int*/, endIndex: number /*int*/,
		textFormat: TextFormat) {
		super();
		this._beginIndex = beginIndex | 0;
		this._endIndex = endIndex | 0;
		this._textFormat = textFormat;
		console.warn('[TextRun] not implemented');
	}

	private _beginIndex: number /*int*/;
	private _endIndex: number /*int*/;
	private _textFormat: TextFormat;

	public get beginIndex(): number {
		return this._beginIndex;
	}

	public set beginIndex(value: number) {
		this._beginIndex = value | 0;
	}

	public get endIndex(): number {
		return this._endIndex;
	}

	public set endIndex(value: number) {
		this._endIndex = value | 0;
	}

	public get textFormat(): TextFormat {
		return this._textFormat;
	}

	public set textFormat(value: TextFormat) {
		this._textFormat = value;
	}

	public clone(): TextRun {
		return new TextRun(this.beginIndex, this.endIndex,
			this.textFormat.clone());
	}

	public containsIndex(index: number): boolean {
		return index >= this._beginIndex && index < this._endIndex;
	}

	public intersects(beginIndex: number, endIndex: number): boolean {
		return Math.max(this._beginIndex, beginIndex) < Math.min(this._endIndex, endIndex);
	}
}