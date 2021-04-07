import { DropShadowFilter } from './DropShadowFilter';
import { GlowFilter } from './GlowFilter';
import { BevelFilter } from './BevelFilter';
import { GradientGlowFilter } from './GradientGlowFilter';
import { GradientBevelFilter } from './GradientBevelFilter';
import { BlurFilter } from './BlurFilter';
import { ConvolutionFilter } from './ConvolutionFilter';
import { ColorMatrixFilter } from './ColorMatrixFilter';
import { IFilter } from '@awayjs/scene';
import { AXSecurityDomain } from '@awayfl/avm2';
import { FilterType } from '@awayfl/swf-loader';

type tFilterBuilder = { FromUntyped: (filter: IFilter, sec: AXSecurityDomain) => any };
const TYPE_FILTER_MAP: Record<number, tFilterBuilder > = {
	[FilterType.DROPSHADOW]: DropShadowFilter,
	[FilterType.GLOW]: GlowFilter,
	[FilterType.BEVEL]: BevelFilter,
	[FilterType.GRADIENTGLOW]: GradientGlowFilter,
	[FilterType.GRADIENTBEVEL]: GradientBevelFilter,
	[FilterType.BLUR]: BlurFilter,
	[FilterType.CONVOLUTION]: ConvolutionFilter,
	[FilterType.COLORMATRIX]: ColorMatrixFilter
};

// WE can't use imports direct from BitmapFilter because filters extends it (circular reference)
export class FilterBuilder {
	static FromUntyped (filter: IFilter, sec: AXSecurityDomain) {
		if (!filter || !TYPE_FILTER_MAP[filter.type]) {
			return null;
		}

		return TYPE_FILTER_MAP[filter.type].FromUntyped(filter, sec);
	}
}
