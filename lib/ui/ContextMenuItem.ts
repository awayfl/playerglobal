import { NativeMenuItem } from '../display/NativeMenuItem';
import { axCoerceString } from '@awayfl/avm2';
export class ContextMenuItem extends NativeMenuItem {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string [] = null; // ["clone"];

	constructor (caption: string, separatorBefore: boolean = false,
		enabled: boolean = true, visible: boolean = true) {
		super();
		caption = axCoerceString(caption);
		separatorBefore = !!separatorBefore;
		enabled = !!enabled;
		visible = !!visible;
		this._caption = caption ? caption : '';
		this._separatorBefore = separatorBefore;
		this._enabled = enabled;
		this._visible = visible;
	}

	clone: () => ContextMenuItem;

	_caption: string;
	_separatorBefore: boolean;
	_visible: boolean;
	_enabled: boolean;

	get caption(): string {
		return this._caption;
	}

	set caption(value: string) {
		value = axCoerceString(value);
		this._caption = value;
	}

	get separatorBefore(): boolean {
		return this._separatorBefore;
	}

	set separatorBefore(value: boolean) {
		value = !!value;
		this._separatorBefore = value;
	}

	get visible(): boolean {
		return this._visible;
	}

	set visible(value: boolean) {
		value = !!value;
		this._visible = value;
	}
}
