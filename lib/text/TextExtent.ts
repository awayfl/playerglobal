import { ASObject } from '@awayfl/avm2';

export class TextExtent extends ASObject {

	public width: number;
	public height: number;
	public textFieldWidth: number;
	public textFieldHeight: number;
	public ascent: number;
	public descent: number;

	constructor(width: number, height: number, textFieldWidth: number, textFieldHeight: number,
		ascent: number, descent: number) {
		super();
		this.width = +width;
		this.height = +height;
		this.textFieldWidth = +textFieldWidth;
		this.textFieldHeight = +textFieldHeight;
		this.ascent = +ascent;
		this.descent = +descent;
		console.warn('[TextExtent] not implemented');
	}
}