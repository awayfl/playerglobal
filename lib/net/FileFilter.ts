
import { ASObject } from '@awayfl/avm2';
export class FileFilter extends ASObject {

	private _description: string;
	private _extension: string;
	private _macType: string;

	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}

	public get extension(): string {
		return this._extension;
	}

	public set extension(value: string) {
		this._extension = value;
	}

	public get macType(): string {
		return this._macType;
	}

	public set macType(value: string) {
		this._macType = value;
	}
}