import { ASObject } from '@awayfl/avm2';
import { Rectangle } from '../../geom/Rectangle';

export class FontMetrics extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// Called whenever an instance of the class is initialized.
	public static initializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null;

	constructor(
		emBox: Rectangle,
		strikethroughOffset: number,
		strikethroughThickness: number,
		underlineOffset: number,
		underlineThickness: number,
		subscriptOffset: number,
		subscriptScale: number,
		superscriptOffset: number,
		superscriptScale: number, lineGap: number = 0) {
		super();
		this.emBox = emBox;
		this.strikethroughOffset = +strikethroughOffset;
		this.strikethroughThickness = +strikethroughThickness;
		this.underlineOffset = +underlineOffset;
		this.underlineThickness = +underlineThickness;
		this.subscriptOffset = +subscriptOffset;
		this.subscriptScale = +subscriptScale;
		this.superscriptOffset = +superscriptOffset;
		this.superscriptScale = +superscriptScale;
		this.lineGap = +lineGap;
		console.warn('[FontMetrics] not implemented');
	}

	// JS -> AS Bindings

	public emBox: Rectangle;
	public strikethroughOffset: number;
	public strikethroughThickness: number;
	public underlineOffset: number;
	public underlineThickness: number;
	public subscriptOffset: number;
	public subscriptScale: number;
	public superscriptOffset: number;
	public superscriptScale: number;
	public lineGap: number;

	// AS -> JS Bindings

}
