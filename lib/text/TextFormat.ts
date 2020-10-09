import { TextFormat as AwaytextFormat, Font } from "@awayjs/scene";
import { ASObject, AXClass, ASArray } from '@awayfl/avm2';

export class TextFormat extends ASObject {

	static axClass: typeof TextFormat & AXClass;
	
    public adaptee: AwaytextFormat;

    public get target(): string {
        console.log("not implemented: TextFormat target");
        return null;
    }
    public set target(value: string) {
        console.log("not implemented: TextFormat target");
    }

    public get tabStops(): ASArray {
        console.log("not implemented: TextFormat tabStops");
        return null;
    }
    public set tabStops(value: ASArray) {
        console.log("not implemented: TextFormat tabStops");
    }

    public get display(): string {
        console.log("not implemented: TextFormat display");
        return null;
    }
    public set display(value: string) {
        console.log("not implemented: TextFormat display");
    }

    public get bullet(): any {
        console.log("not implemented: TextFormat bullet");
        return null;
    }
    public set bullet(value: any) {
        console.log("not implemented: TextFormat bullet");
        //this._bullet = TextFormat.coerceBoolean(value);
    }

    public get url(): string {
        console.log("not implemented: TextFormat url");
        return null;
    }
    public set url(value: string) {
        console.log("not implemented: TextFormat url");
    }
	/**
	 * Indicates the target window where the hyperlink is displayed. If the
	 * target window is an empty string, the text is displayed in the default
	 * target window <code>_self</code>. You can choose a custom name or one of
	 * the following four names: <code>_self</code> specifies the current frame
	 * in the current window, <code>_blank</code> specifies a new window,
	 * <code>_parent</code> specifies the parent of the current frame, and
	 * <code>_top</code> specifies the top-level frame in the current window. If
	 * the <code>TextFormat.url</code> property is an empty string or
	 * <code>null</code>, you can get or set this property, but the property will
	 * have no effect.
	 */
    public get link_target(): string {
        console.log("not implemented: TextFormat link_target");
        return null;
    }
    public set link_target(value: string) {
        console.log("not implemented: TextFormat link_target");
    }

    public get align(): string {
        return this.adaptee.align;
    }
    public set align(value: string) {
        this.adaptee.align = value;
    }

    public get blockIndent(): number {
        return this.adaptee.blockIndent;
    }
    public set blockIndent(value: number) {
        this.adaptee.blockIndent = value;
	}
	
    public get leftMargin(): number {
        return this.adaptee.leftMargin;
    }
    public set leftMargin(value: number) {
        this.adaptee.leftMargin = value;
    }

    public get rightMargin(): number {
        return this.adaptee.rightMargin;
    }
    public set rightMargin(value: number) {
        this.adaptee.rightMargin = value;
    }

    public get indent(): number {
        return this.adaptee.indent;
    }
    public set indent(value: number) {
        this.adaptee.indent = value;
    }

    public get color(): number {
        return this.adaptee.color;
    }
    public set color(value: number) {
        this.adaptee.color = value;
    }

    public get kerning(): boolean {
        return this.adaptee.kerning;
    }
    public set kerning(value: boolean) {
        this.adaptee.kerning = value;
    }

    public get leading(): number {
        return this.adaptee.leading;
    }
    public set leading(value: number) {
        this.adaptee.leading = value;
    }

    public get letterSpacing(): number {
        return this.adaptee.letterSpacing;
    }
    public set letterSpacing(value: number) {
        this.adaptee.letterSpacing = value;
    }

    public get size(): number {
        return this.adaptee.size;
    }
    public set size(value: number) {
        this.adaptee.size = value;
    }

    public get bold(): boolean {
        return this.adaptee.bold;
    }
    public set bold(value: boolean) {
        this.adaptee.bold = value;
    }

    public get italic(): boolean {
        return this.adaptee.italic;
    }
    public set italic(value: boolean) {
        this.adaptee.italic = value;
    }

    public get underline(): boolean {
        return this.adaptee.underline;
    }
    public set underline(value: boolean) {
        this.adaptee.underline = value;
    }

    public get font_name(): string {
        return this.adaptee.font_name;
    }
    public set font_name(value: string) {
        this.adaptee.font_name = value;
    }

    public get style_name(): any {
        return this.adaptee.style_name;
    }
    public set style_name(value: any) {
        this.adaptee.style_name = value;
    }

    public get font(): string {
        // font should return a `font_name`
        return this.adaptee.font_name;
    }

    public set font(value: string) {
        this.adaptee.font = <any>value;
    }

    constructor(
        font: string = null, size: number = null, color: number = null, bold: boolean = null,
        italic: boolean = null, underline: boolean = null, url: string = null, link_target: string = null, align: string = null,
        leftMargin: number = null, rightMargin: number = null, indent: number = null, leading: number = null) {
        super();
        this.adaptee = new AwaytextFormat(font, size, color, bold,
            italic, underline, url, link_target, align,
            leftMargin, rightMargin, indent, leading);
    }

    public clone(): TextFormat {
		//console.log("not implemented: textFOrmat.clone");
		var clonedFormat:TextFormat=new (<any>this.sec).flash.text.TextFormat();
		clonedFormat.adaptee=this.adaptee.clone();
        return clonedFormat;
    }


}