import { ASObject } from '@awayfl/avm2';

import {TextLineMetrics as AwayLineMetrics} from "@awayjs/scene";

export class TextLineMetrics extends ASObject {
    
    constructor(public adapter: AwayLineMetrics) {
        super();
    }

   /**
	 * The ascent value of the text is the length from the baseline to the top of
	 * the line height in pixels.
	 */
    public get ascent() :number 
    {
        return this.adapter.ascent;
    }

	/**
	 * The descent value of the text is the length from the baseline to the
	 * bottom depth of the line in pixels.
	 */
    public get descent() :number
    {
        return this.adapter.descent;
    }

	/**
	 * The height value of the text of the selected lines (not necessarily the
	 * complete text) in pixels. The height of the text line does not include the
	 * gutter height.
	 */
    public get height() :number
    {
        return this.adapter.height;
    }

	/**
	 * The leading value is the measurement of the vertical distance between the
	 * lines of text.
	 */
    public get leading(): number 
    {
        return this.adapter.leading;
    }

	/**
	 * The width value is the width of the text of the selected lines (not
	 * necessarily the complete text) in pixels. The width of the text line is
	 * not the same as the width of the text field. The width of the text line is
	 * relative to the text field width, minus the gutter width of 4 pixels
	 * (2 pixels on each side).
	 */
    public get width() :number 
    {
        return this.adapter.width;
    }

	/**
	 * The x value is the left position of the first character in pixels. This
	 * value includes the margin, indent (if any), and gutter widths.
	 */
    public get x() :number {
        return this.adapter.x;
    }
}