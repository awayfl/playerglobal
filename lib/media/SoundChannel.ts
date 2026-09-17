import { EventDispatcher } from '../events/EventDispatcher';
import { SoundTransform } from './SoundTransform';
import { release } from '@awayfl/swf-loader';
import { SecurityDomain } from '../SecurityDomain';
import { Event } from '../events/Event';
import { EventBase, IAudioChannel } from '@awayjs/core';
import { ISoundSource, SoundMixer } from './SoundMixer';
import { BaseAudioChannel } from '@awayjs/core';

/**
 * Dispatched when a sound has finished playing.
 * @eventType	flash.events.Event.SOUND_COMPLETE
 * [Event(name="soundComplete", type="flash.events.Event")]
 *
 * The SoundChannel class controls a sound in an application. Every sound
 * is assigned to a sound channel, and the application can have multiple
 * sound channels that are mixed together.
 * The SoundChannel class contains a <codeph class="+ topic/ph pr-d/codeph ">stop()</codeph> method,
 * properties for monitoring the amplitude (volume) of the channel, and a property for assigning a
 * SoundTransform object to the channel.
 */
export class SoundChannel extends EventDispatcher implements ISoundSource {
	// for AVM1:
	public axCallPublicProperty(value1: any, value2: any): any {
		return null;
	}

	public axGetPublicProperty(value: any): any {
		return null;
	}

	public axSetPublicProperty(value: any, value2: any): any {
		return null;
	}

	public axHasPublicProperty(value: any): any {
		return null;
	}

	public axDeletePublicProperty(value: any): any {
		return null;
	}

	public axGetEnumerableKeys(): string[] {
		return [];
	}

	private _soundTransform: SoundTransform;
	private _channel: IAudioChannel;

	/* internal */ init (channel: IAudioChannel | null, transform: SoundTransform) {
		this._channel = channel;

		if (!this._channel) {
			return;
		}

		this._channel.addEventListener(BaseAudioChannel.COMPLETE, this.soundCompleteInternal.bind(this));

		this.soundTransform = transform;

		SoundMixer._registerSoundSource(this);
	}

	/**
	 * The current amplitude (volume) of the left channel, from 0 (silent) to 1 (full amplitude).
	 */
	public get leftPeak(): number {
		release || console.log('leftPeak not implemented yet in flash/SoundChannel');
		return 0;
	}

	/**
	 * When the sound is playing, the position property indicates in milliseconds the current point
	 * that is being played in the sound file. When the sound is stopped or paused, the
	 * position property indicates the last point that was played in the sound file.
	 *
	 *   A common use case is to save the value of the position property when the
	 * sound is stopped. You can resume the sound later by restarting it from that saved position.
	 * If the sound is looped, position is reset to 0 at the beginning of each loop.
	 */
	public get position(): number {
		return this._channel ? this._channel.currentTime : 0;
	}

	/**
	 * The current amplitude (volume) of the right channel, from 0 (silent) to 1 (full amplitude).
	 */
	public get rightPeak(): number {
		release || console.log('rightPeak not implemented yet in flash/SoundChannel');
		return 0;
	}

	/**
	 * The SoundTransform object assigned to the sound channel. A SoundTransform object
	 * includes properties for setting volume, panning, left speaker assignment, and right
	 * speaker assignment.
	 */
	public get soundTransform(): SoundTransform {
		//	we not create this in the constructor, because it gets overwritten from Sound in most cases anyway
		//	but we still need a Soundtransform to be available in the getter
		if (!this._soundTransform) {
			this._soundTransform = new (<any> this.sec).flash.media.SoundTransform();
		}
		return this._soundTransform;
	}

	public set soundTransform(value: SoundTransform) {

		if (this._channel) {
			this._channel.volume = (value.volume == null) ? 0 : value.volume;
			this._channel.pan = (value.pan == null) ? 0 : value.pan;
		}

		this._soundTransform = value;
	}

	private soundCompleteInternal(event: EventBase) {
		this._stopInternally();
		// we should dispatch sound events to channel, because some games use this
		const complete = new (<SecurityDomain> this.sec).flash.events.Event(Event.SOUND_COMPLETE);
		this.dispatchEvent(complete);
	}

	private _stopInternally() {
		SoundMixer._unregisterSoundSource(this);
	}

	/**
	 * Stops the sound playing in the channel.
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @refpath
	 */
	public stop() {
		if (!this._channel) {
			release || console.log('SoundChannel.stop: No sound exists');
			return;
		}

		this._stopInternally();
		this._channel.stop();
	}

	// for ISoundSource
	stopSound() {
		this.stop();
	}

	// for ISoundSource
	updateSoundLevels(volume: number) {
		if (!this._channel) {
			return;
		}

		this._soundTransform.volume = volume;
		this._channel.volume = volume;
	}
}
