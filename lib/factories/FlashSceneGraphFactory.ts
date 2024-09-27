
import { BitmapImage2D, Image2D } from '@awayjs/stage';
import {
	IFrameScript,
	Timeline,
	MovieClip,
	Sprite,
	DisplayObjectContainer as AwayDisplayObjectContainer,
	Billboard,
	ISceneGraphFactory,
	TextField,
	PrefabBase,
	MorphSprite,
	DisplayObject,
	FrameScriptManager,
} from '@awayjs/scene';
import { MaterialBase, MethodMaterial } from '@awayjs/materials';
import { DefaultSceneGraphFactory } from '@awayjs/scene';
import { SceneImage2D } from '@awayjs/scene';

import { Bitmap } from '../display/Bitmap';
import { BitmapData } from '../display/BitmapData';
import { Graphics } from '@awayjs/graphics';
import {
	Multiname,
	NamespaceType,
	constructClassFromSymbol,
	ABCFile,
	AXClass,
	AXApplicationDomain,
} from '@awayfl/avm2';
import { SecurityDomain } from '../SecurityDomain';
import { LoaderInfo } from '../display/LoaderInfo';
import { BasicPartition } from '@awayjs/view';
import { IAsset } from '@awayjs/core';

export class FlashSceneGraphFactory extends DefaultSceneGraphFactory implements ISceneGraphFactory {
	public imageStore: Object = {};
	private _sec: SecurityDomain;
	private _loaderInfo: LoaderInfo;

	private get appDomain(): AXApplicationDomain {
		if (this._loaderInfo) {
			return this._loaderInfo.applicationDomain.axApplicationDomain;
		}

		return  this._sec.application;
	}

	constructor(sec: SecurityDomain, loaderInfo?: LoaderInfo) {
		super();
		this._sec = sec;
		this._loaderInfo = loaderInfo;
	}

	public executeABCBytes(abcBlocks: any[]) {
		for (let i = 0; i < abcBlocks.length; i++) {
			const abcBlock = abcBlocks[i];
			const abc = new ABCFile({ app: this.appDomain, url: '' }, abcBlock.data);
			if (abcBlock.flags) {
				// kDoAbcLazyInitializeFlag = 1 Indicates that the ABC block should not be executed
				// immediately.
				this.appDomain.loadABC(abc);
			} else {
				// TODO: probably delay execution until playhead reaches the frame.
				this.appDomain.loadAndExecuteABC(abc);
			}
		}
		return null;
	}

	public createSprite(_prefab: PrefabBase = null, graphics: Graphics = null, symbol: any = null): Sprite {
		if (!symbol || !this._sec)
			throw ('no symbol provided');
		let symbolClass = null;
		if (symbol.className)
			symbolClass = this.appDomain.getClass(Multiname.FromFQNString(symbol.className, NamespaceType.Public));
		else
			symbolClass = this._sec.flash.display.Sprite.axClass;

		symbol.symbolClass = symbolClass;
		//Graphicsadapter.currentAwayGraphics=graphics;
		// create the root for the root-symbol
		const asObj = constructClassFromSymbol(symbol, symbolClass);
		asObj.adaptee = new Sprite(graphics);
		asObj.adaptee.name = graphics.name;
		// manually call the axInitializer for now:
		//asObj.axInitializer(Sprite.getNewSprite(new this._sec.flash.display.Graphics(graphics).adaptee));

		return asObj.adaptee;
	}

	public createDisplayObjectContainer(_symbol: any = null): AwayDisplayObjectContainer {
		return <AwayDisplayObjectContainer> new this._sec.flash.display.DisplayObjectContainer().adaptee;
	}

	public createBinarySymbol(symbol: any = null): void {
		this.appDomain.addBinarySymbol(symbol);
	}

	public createMovieClip(timeline: Timeline = null, symbol: any = null): MovieClip {
		if (!symbol || !this._sec)
			throw ('no symbol provided');

		let symbolClass: AXClass = null;
		if (symbol.className) {
			symbolClass = this.appDomain.getClass(Multiname.FromFQNString(symbol.className, NamespaceType.Public));
			(<any>symbolClass)._symbol = symbol;
		} else if (symbol.isButton) {
			symbolClass = this._sec.flash.display.SimpleButton.axClass;
		} else {
			symbolClass = this._sec.flash.display.MovieClip.axClass;
		}
		//console.log("parsed symbolClass", symbolClass, symbol);
		symbol.symbolClass = symbolClass;

		// create the root for the root-symbol
		const rootSymbolClass = symbol.isButton
			? this._sec.flash.display.SimpleButton.axClass
			: this._sec.flash.display.MovieClip.axClass;
		const asObj = constructClassFromSymbol(symbol, rootSymbolClass);

		asObj.adaptee = new MovieClip(timeline || new Timeline(this));
		symbol.timeline = asObj.adaptee.timeline;

		//(<MovieClip>asObj.adaptee).timeline.resetScripts();
		//(<any>asObj).axInitializer();
		return asObj.adaptee;
	}

	public createTextField(symbol: any = null): TextField {
		let symbolClass: AXClass = null;

		if (symbol.className) {
			symbolClass = this.appDomain.getClass(Multiname.FromFQNString(symbol.className, NamespaceType.Public));
		} else {
			symbolClass = this._sec.flash.text.TextField.axClass;
		}

		symbol.symbolClass = symbolClass;
		// create the root for the root-symbol
		const asObj = constructClassFromSymbol(symbol, symbolClass);
		// 	manually call the axInitializer - this will run the constructor
		//	creating new Away-MovieClip and timeline, and registers framescripts on the timeline:
		asObj.axInitializer();
		return asObj.adaptee;
	}

	public createBillboard(material: MaterialBase, _symbol: any = null): Billboard {
		return <Billboard> new Bitmap(<BitmapData> material.style.image.adapter).adaptee;
	}

	public createImage2D(width: number, height: number,
		transparent: boolean = true,
		fillColor: number = null,
		_powerOfTwo: boolean = true,
		_symbol: any = null): Image2D {
		const image = <SceneImage2D> new BitmapData(width, height, transparent, fillColor).adaptee;

		// drop weak ref for symbols
		image.unuseWeakRef();

		return image;
	}

	createFrameScripts(_scripts: IFrameScript[], _frameIdx: number, _objName: string, _objID: number): IFrameScript[] {
		return _scripts;
	}

	/**
	 * Get a instance for a given SymbolID and assign a sessionID to it.
	 * This is used by timeline to create children
	 *
	 * @param symbolID
	 * @param sessionID
	 */
	public createChildInstanceForTimeline(timeline: Timeline, symbolID: number, sessionID: number): IAsset {

		// if this was called we might have new constructors from timeline to process
		FrameScriptManager.invalidAS3Constructors = true;

		const asset: IAsset = this.awaySymbols[symbolID];
		let clone: DisplayObject;
		if (asset.isAsset(Graphics)) {
			clone = Sprite.getNewSprite(<Graphics> asset.clone());//TODO: remove this clone() without the mem leak
			clone.name = asset.name;
			clone.mouseEnabled = false;
		} else if (asset.isAsset(Sprite)) {
			clone = Sprite.getNewSprite((<Sprite> asset).graphics);
			clone.mouseEnabled = false;
		} else if (asset.isAsset(MorphSprite)) {
			clone = MorphSprite.getNewMorphSprite((<MorphSprite> asset).graphics.clone());
			clone.mouseEnabled = false;
		} else if (asset.isAsset(BitmapImage2D)) {
			// enable blending for symbols, because if you place image directly on stage
			// it not enable blend mode
			const m = new MethodMaterial(<BitmapImage2D>asset);
			m.alphaBlending = (<BitmapImage2D>asset).transparent;
			clone = Billboard.getNewBillboard(m);
			clone.mouseEnabled = false;
		} else {
			clone = (<any> asset.adapter).clone(false).adaptee;
		}

		clone.partitionClass = BasicPartition;
		clone._sessionID = sessionID;
		return clone;
	}
}