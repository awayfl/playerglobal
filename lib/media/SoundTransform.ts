import { ASObject, AXClass } from '@awayfl/avm2';

/**
 * The SoundTransform class contains properties for volume and panning.
 *
 */
export class SoundTransform extends ASObject {

	static axClass: typeof SoundTransform & AXClass;
	// for AVM1:
	public axCallPublicProperty(value1: any, value2: any): any {
		console.log('axCallPublicProperty not implemented yet in flash/SoundTransform');
		return null;
	}

	public axGetPublicProperty(value: any): any {
		console.log('axGetPublicProperty not implemented yet in flash/SoundTransform');
		return null;
	}

	public axSetPublicProperty(value: any, value2: any): any {
		console.log('axSetPublicProperty not implemented yet in flash/SoundTransform');
		return null;
	}

	public axHasPublicProperty(value: any): any {
		console.log('axHasPublicProperty not implemented yet in flash/SoundTransform');
		return null;
	}

	public axDeletePublicProperty(value: any): any {
		console.log('axDeletePublicProperty not implemented yet in flash/SoundTransform');
		return null;
	}

	public axGetEnumerableKeys(): string[] {
		console.log('axGetEnumerableKeys not implemented yet in flash/SoundTransform');
		return [];
	}

	private _vol: number = 1;
	private _pan: number = 0;
	/**
	 * Creates a SoundTransform object.
	 * @param	vol	The volume, ranging from 0 (silent) to 1 (full volume).
	 * @param	panning	The left-to-right panning of the sound, ranging from -1 (full pan left)
	 *   to 1 (full pan right). A value of 0 represents no panning (center).
	 * @langversion	3.0
	 * @playerversion	Flash 9
	 * @playerversion	Lite 4
	 * @refpath
	 */
	constructor (vol: number = 1, panning: number = 0) {
		super();
		this._vol = vol;
		this._pan = panning;
	}

	/**
	 * A value, from 0 (none) to 1 (all), specifying how much of the left input is played in the
	 * left speaker.
	 */
	public get leftToLeft (): number {
		console.log('leftToLeft not implemented yet in flash/SoundTransform');
		return 0;
	}

	public set leftToLeft (leftToLeft: number) {
		console.log('leftToLeft not implemented yet in flash/SoundTransform');
	}

	/**
	 * A value, from 0 (none) to 1 (all), specifying how much of the left input is played in the
	 * right speaker.
	 */
	public get leftToRight (): number {
		console.log('leftToRight not implemented yet in flash/SoundTransform');
		return 0;
	}

	public set leftToRight (leftToRight: number) {
		console.log('leftToRight not implemented yet in flash/SoundTransform');
	}

	/**
	 * The left-to-right panning of the sound, ranging from -1 (full pan left)
	 * to 1 (full pan right). A value of 0 represents no panning (balanced center between
	 * right and left).
	 */
	public get pan (): number {
		return this._pan;
	}

	public set pan (value: number) {
		this._pan = value;
	}

	/**
	 * A value, from 0 (none) to 1 (all), specifying how much of the right input is played in the
	 * left speaker.
	 */
	public get rightToLeft (): number {
		console.log('rightToLeft not implemented yet in flash/SoundTransform');
		return 0;
	}

	public set rightToLeft (rightToLeft: number) {
		console.log('rightToLeft not implemented yet in flash/SoundTransform');
	}

	/**
	 * A value, from 0 (none) to 1 (all), specifying how much of the right input is played in the
	 * right speaker.
	 */
	public get rightToRight (): number {
		console.log('rightToRight not implemented yet in flash/SoundTransform');
		return 0;
	}

	public set rightToRight (rightToRight: number) {
		console.log('rightToRight not implemented yet in flash/SoundTransform');
	}

	/**
	 * The volume, ranging from 0 (silent) to 1 (full volume).
	 */
	public get volume (): number {
		return this._vol;
	}

	public set volume (value: number) {
		this._vol = (value > 1)
			? 1
			: (value < 0 ? 0 : value);
	}

}
