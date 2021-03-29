/*export { Sprite as Shape } from './Sprite';*/

import { constructClassFromSymbol } from '@awayfl/avm2';
import { DisplayObject } from './DisplayObject';
import { Graphics } from './Graphics';
import { Sprite as AwaySprite, DisplayObject as AwayDisplayObject } from '@awayjs/scene';
import { SecurityDomain } from '../SecurityDomain';

/**
 * This class is used to create lightweight shapes using the ActionScript drawing application program interface (API).
 * The Shape class includes a <codeph class="+ topic/ph pr-d/codeph ">graphics</codeph> property,
 * which lets you access methods from the Graphics class.
 *
 *   <p class="- topic/p ">The Sprite class also includes a
 * <codeph class="+ topic/ph pr-d/codeph ">graphics</codeph>property,
 * and it includes other features not available to the
 * Shape class. For example, a Sprite object is a display object container,
 * whereas a Shape object is not (and cannot contain
 * child display objects). For this reason, Shape objects consume less memory than Sprite objects that contain the
 * same graphics. However, a Sprite object supports user input events, while a Shape object does not.</p>
 */

export class Shape extends DisplayObject {

	private _graphics: Graphics;
	/**
		 * Creates a new Shape object.
		 */

	constructor() {
		super();
		this._graphics = new (<SecurityDomain> this.sec).flash.display.Graphics((<AwaySprite> this._adaptee).graphics);
	}

	protected createAdaptee(): AwayDisplayObject {
		const newAdaptee = AwaySprite.getNewSprite();

		//console.log("createAdaptee AwaySprite");
		newAdaptee.reset();
		//FrameScriptManager.execute_queue();
		return newAdaptee;
	}
	/**
		 * Specifies the Graphics object belonging to this Shape object, where vector
		 * drawing commands can occur.
		 */

	public get graphics(): Graphics {
		return this._graphics;
	}

	public clone(): Shape {

		if (!(<any> this)._symbol) {
			throw ('_symbol not defined when cloning movieclip');
		}
		const clone = constructClassFromSymbol((<any> this)._symbol, (<any> this)._symbol.symbolClass);
		const adaptee = new AwaySprite();
		this.adaptee.copyTo(adaptee);
		clone.adaptee = adaptee;
		clone._stage = this.activeStage;
		clone.adaptee.graphics = this.graphics;
		return clone;
	}
}
