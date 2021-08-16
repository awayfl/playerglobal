
import { Image2D } from '@awayjs/stage';
import {
	IFrameScript,
	Timeline,
	MovieClip as AwayMovieClip,
	Sprite as AwaySprite,
	DisplayObjectContainer as AwayDisplayObjectContainer,
	Billboard,
	ISceneGraphFactory,
	TextField as AwayTextField,
	PrefabBase,
} from '@awayjs/scene';
import { MaterialBase } from '@awayjs/materials';
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

	public createSprite(_prefab: PrefabBase = null, graphics: Graphics = null, symbol: any = null): AwaySprite {
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
		asObj.adaptee = new AwaySprite(graphics);
		// manually call the axInitializer for now:
		//asObj.axInitializer(AwaySprite.getNewSprite(new this._sec.flash.display.Graphics(graphics).adaptee));

		return asObj.adaptee;
	}

	public createDisplayObjectContainer(_symbol: any = null): AwayDisplayObjectContainer {
		return <AwayDisplayObjectContainer> new this._sec.flash.display.DisplayObjectContainer().adaptee;
	}

	public createBinarySymbol(symbol: any = null): void {
		this.appDomain.addBinarySymbol(symbol);
	}

	public createMovieClip(_timeline: Timeline = null, symbol: any = null): AwayMovieClip {
		if (!symbol || !this._sec)
			throw ('no symbol provided');

		const rootSymbol = symbol.isButton
			? this._sec.flash.display.SimpleButton.axClass
			: this._sec.flash.display.MovieClip.axClass;

		let symbolClass: AXClass = null;
		if (symbol.className) {
			symbolClass = this.appDomain.getClass(Multiname.FromFQNString(symbol.className, NamespaceType.Public));
			(<any>symbolClass)._symbol = symbol;
		} else {
			symbolClass = rootSymbol;
		}

		//console.log("parsed symbolClass", symbolClass, symbol);
		symbol.symbolClass = symbolClass;

		// create the root for the root-symbol
		const asObj = constructClassFromSymbol(symbol,rootSymbol);

		asObj.adaptee = new AwayMovieClip();
		symbol.timeline = asObj.adaptee.timeline;

		//(<AwayMovieClip>asObj.adaptee).timeline.resetScripts();
		//(<any>asObj).axInitializer();
		return asObj.adaptee;
	}

	public createTextField(symbol: any = null): AwayTextField {
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
		console.warn('[FlashSceneGraphFactory] - createFrameScripts - should never be called');
		return null;
	}
}