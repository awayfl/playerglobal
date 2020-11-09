import { ASObject } from '@awayfl/avm2';

export class TextBlock extends ASObject {

	static forceNative = true;

	static classInitializer = function() {
		console.log('Text Block');
	}

	constructor() {
		super();

		console.log('Text block TS constructor');
	}

	get applyNonLinearFontScaling() { return null;}
	set applyNonLinearFontScaling(e) {}

	get baselineFontDescription() { return null;}
	set baselineFontDescription(e) {}

	get baselineFontSize() { return null;}
	set baselineFontSize(e) {}

	get baselineZero() { return null;}
	set baselineZero(e) {}

	get content() { return null; }
	set content(e) {}

	get firstInvalidLine() {return null;}
	set firstInvalidLine(e) {}

	get bidiLevel() {return null;}
	set bidiLevel(e) {}

	get firstLine() {return null;}
	set firstLine(e) {}

	get lastLine() {return null;}
	set lastLine(e) {}

	get textLineCreationResult() {return null;}
	set textLineCreationResult(e) {}

	get lineRotation() {return null;}
	set lineRotation(e) {}

	findNextAtomBoundary() {}
	findPreviousAtomBoundary() {}
	findNextWordBoundary() {}
	findPreviousWordBoundary() {}
	getTextLineAtCharIndex() {}
	releaseLineCreationData() {}
	releaseLines() {}
	dump() {}

	DoCreateTextLine() {}
	getTabStops() {}
	setTabStops() {}
	getTextJustifier() {}
	setTextJustifier() {}
}