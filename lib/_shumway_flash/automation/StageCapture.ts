
import { axCoerceString } from '@awayjs/graphics';
import { BitmapData } from '../../display/BitmapData';
import { EventDispatcher } from '../../events/EventDispatcher';
import { Rectangle } from '../../geom/Rectangle';

export class StageCapture extends EventDispatcher {
	constructor () {
		super();
	}

	// Static   JS -> AS Bindings
	// Static   AS -> JS Bindings
	// Instance JS -> AS Bindings
	// Instance AS -> JS Bindings
	capture(type: string): void {
		type = axCoerceString(type);
	}

	cancel(): void {
	}

	set fileNameBase(value: string) {
		value = axCoerceString(value);
	}

	get fileNameBase(): string {
		return '';
	}

	set clipRect(value: Rectangle) {
		return;
	}

	get clipRect(): Rectangle {
		return null;
	}

	captureBitmapData(): BitmapData {
		return null;
	}

	set captureSource(value: string) {
		value = axCoerceString(value);
	}

	get captureSource(): string {
		return '';
	}
}