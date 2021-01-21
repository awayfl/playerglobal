import { axCoerceString } from '@awayjs/graphics';
import { Event } from '../../events/Event';

export class StageCaptureEvent extends Event {
	constructor (type: string, bubbles: boolean = false,
		cancelable: boolean = false, url: string = '', checksum: number /*uint*/ = 0) {
		type = axCoerceString(type); bubbles = !!bubbles;
		cancelable = !!cancelable; url = axCoerceString(url); checksum = checksum >>> 0;
		super(undefined, undefined, undefined);
	}

	// Static   JS -> AS Bindings
	// Static   AS -> JS Bindings
	// Instance JS -> AS Bindings
	m_url: string;
	m_checksum: number /*uint*/;
	clone: () => Event;
	url: string;
	checksum: number /*uint*/;
	// Instance AS -> JS Bindings
}