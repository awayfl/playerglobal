import {
	ABCFile,
	ABCCatalog,
	ActiveLoaderContext,
	AVM2LoadLibrariesFlags,
	IPlayerGlobal,
	AXSecurityDomain,
	Natives,
} from '@awayfl/avm2';
// @ts-ignore: can't find types
import assembly from "@awayjs/assembly";
import { release, assert, AVMStage, SWFFile } from '@awayfl/swf-loader';
import { SecurityDomain } from './SecurityDomain';
import { initLink } from './link';
import {
	ISceneGraphFactory,
	TextField,
	SceneImage2D,
	Font,
	Sprite,
	MovieClip,
	MorphSprite,
	IDisplayObjectAdapter,
	FrameScriptManager,
} from '@awayjs/scene';

import { FlashSceneGraphFactory } from './factories/FlashSceneGraphFactory';
import { AssetBase, IAsset, WaveAudio } from '@awayjs/core';
import { ApplicationDomain } from './system/ApplicationDomain';
import { BitmapImage2D } from '@awayjs/stage';
import { Graphics } from '@awayjs/graphics';
import { Stage } from './display/Stage';
import { DisplayObject } from './display/DisplayObject';
import { LoaderInfo } from './display/LoaderInfo';
import { ILoader } from './ILoader';
import { SharedObject } from './net/SharedObject';

// alternate of using a `node path`
function normalisePath (p: string) {
	// maybe http:// or https:// etc, like file://
	const methodIdx = p.indexOf('://');
	const prepend = p[0] === '/' ? '/'  : '';
	const parts = p.split(/[\\|/]/).filter(Boolean);

	// when remove '//' from method / will be removed. Restore it
	if (methodIdx > -1)
		parts[0] += '/';

	return prepend + parts.join('/');
}

function browserLoader(url: string, type: 'json' | 'arraybuffer'): Promise<any> {
	return fetch(normalisePath(url))
		.then((r) => {
			if (!r.ok) {
				throw `Ups: ${r.statusText}(${r.status})`;
			}

			return type === 'json' ? r.json() : r.arrayBuffer();
		})
		.catch(e => {
			throw new Error('Unable to load: ' + url + ': ' + e);
		});
}

export class PlayerGlobal implements IPlayerGlobal, ILoader {
	public static builtinsBaseUrl = './assets/builtins/';
	private _contentLoaderInfo: LoaderInfo;
	private _content: DisplayObject;
	private _avmStage: AVMStage;
	private _stage: Stage;
	private _applicationDomain: ApplicationDomain;

	public get stage(): Stage {
		return this._stage;
	}

	public get content(): DisplayObject {
		return this._content;
	}

	public dispose() {
		console.log('dispose PlayerGlobal');
		ApplicationDomain.currentDomain = null;
		SharedObject._sharedObjects = {};
	}

	public createSecurityDomain(
		avmStage: AVMStage,
		swfFile: SWFFile,
		libraries: AVM2LoadLibrariesFlags
	): Promise<ISceneGraphFactory> {
		this._avmStage = avmStage;

		if (this._avmStage.avmTestHandler) {
			Natives.print = function (_sec: AXSecurityDomain, _expression: any) {
				let message = '';

				if (arguments.length == 2) {
					// eslint-disable-next-line prefer-rest-params
					message = arguments[1]?.toString();
				} else {
					for (let i = 1; i < arguments.length; i++) {
						// eslint-disable-next-line prefer-rest-params
						message += arguments[i]?.toString();
						if (i !== arguments.length - 1) {
							message += ' ';
						}
					}
				}

				const messageSplit = message.split('\n');
				for (let i = 0; i < messageSplit.length; i++) {
					console.log('%c Test-Trace from SWF:', 'color: DodgerBlue', messageSplit[i]);
					avmStage.avmTestHandler.addMessage(messageSplit[i]);
				}
			};
		}

		initLink();

		release || console.log('createSecurityDomain');
		release || assert(!!(libraries & AVM2LoadLibrariesFlags.Builtin));
		release || console.log('Load builtin.abc file');

		const base = PlayerGlobal.builtinsBaseUrl;

		const tasks = [
			browserLoader(`${base}/builtin.abc`, 'arraybuffer'),
			assembly,
		];

		if (libraries & AVM2LoadLibrariesFlags.Playerglobal) {
			tasks.push(
				browserLoader(`${base}/playerglobal.abcs`,'arraybuffer'),
				browserLoader(`${base}/playerglobal.json`, 'json'),
				browserLoader(`${base}/avmplus.abc`, 'arraybuffer')
			);
		}

		return Promise.all(tasks).then(([builtins, assembly, pgByte, pgJson, avmplus]) => {
			const sec = new SecurityDomain();
			const builtinABC = new ABCFile({
				url: 'builtin.abc',
				app: sec.system
			}, new Uint8Array(builtins));

			(<any>sec).swfVersion = swfFile.swfVersion;
			sec.system.loadABC(builtinABC);
			sec.initialize();
			sec.system.executeABC(builtinABC);
			sec.player = avmStage;

			if (!(libraries & AVM2LoadLibrariesFlags.Playerglobal)) {
				return null;
			}

			release || console.log('Load playerglobal.abcs & playerglobal.json');
			const catalog = new ABCCatalog(sec.system, new Uint8Array(pgByte), pgJson);

			release || console.log('add playerglobals as ABCCatalog');
			sec.addCatalog(catalog);

			const avmPlusABC = new ABCFile({
				url: 'avmplus.File',
				app: sec.system
			}, new Uint8Array(avmplus));

			sec.system.loadAndExecuteABC(avmPlusABC);

			this._constructStage(sec, swfFile);

			(globalThis || window).__assembly = assembly.exports;

			return new FlashSceneGraphFactory(sec);
		});
	}

	private _constructStage(sec: SecurityDomain, file: SWFFile) {
		this._contentLoaderInfo = new sec.flash.display.LoaderInfo(this, this._avmStage.root);
		this._contentLoaderInfo.url = file.url;
		this._applicationDomain = new sec.flash.system.ApplicationDomain();

		// not needs, because shuld be resolved from domain
		ActiveLoaderContext.loaderContext = new sec.flash.system.LoaderContext(
			false,
			this._applicationDomain
		);

		this._stage = new sec.flash.display.Stage();
		sec.flash.display.DisplayObject.axClass._activeStage = this._stage;
		this._avmStage.root.adapter = this._stage;
		this._stage.adaptee = this._avmStage.root;
	}

	public enterFrame() {
		this._stage && this._stage.enterFrame();
	}

	public resizeStage() {
		// it can happen that resizeStage is called before createSecurityDomain has finished and stage exists
		this._stage && this._stage.resizeCallback();
	}

	public addAsset(asset: IAsset, addScene: boolean) {
		(<any>asset.adapter).loaderInfo = this._contentLoaderInfo;
		switch (asset.assetType) {
			case TextField.assetType: {
				this._applicationDomain.addDefinition(asset.name, <TextField>asset);
				break;
			}
			case SceneImage2D.assetType:
			case BitmapImage2D.assetType: {
				this._applicationDomain.addDefinition(asset.name, <SceneImage2D>asset);
				break;
				// we should only do this for bitmaps loaded from jpg or png
				// todo:
				//if (this._isImage)
				//	(<AwayDisplayObjectContainer> this._adaptee).addChild(
				//	new Bitmap(<BitmapData> (<SceneImage2D> asset).adapter).adaptee);
			}
			case WaveAudio.assetType: {
				this._applicationDomain.addAudioDefinition(asset.name, <WaveAudio>asset);
				break;
			}
			case Font.assetType: {
				this._applicationDomain.addFontDefinition(asset.name, <Font>asset);
				break;
			}
			case Sprite.assetType: {
				this._applicationDomain.addDefinition(asset.name, <Sprite>asset);
				break;
			}
			case MovieClip.assetType: {
				this._applicationDomain.addDefinition(asset.name, <MovieClip>asset);

				// if this is the "Scene 1", we make it a child of the loader
				if (addScene && (<any>asset).isAVMScene) {
					// "Scene 1" when AWDParser, isAVMScene when using SWFParser

					this._content = <DisplayObject>(<IDisplayObjectAdapter>asset.adapter).clone();
					this._content.loaderInfo = this._contentLoaderInfo;
					this._content.adaptee.reset();
					(<any> this._content.adaptee).firstFrameOnSWFStart = true;
					FrameScriptManager.invalidAS3Constructors = true;
					(<any> this._stage.adaptee).addChild(this._content.adaptee);
					FrameScriptManager.execute_as3_constructors_recursiv(<any> this._content.adaptee);
					this._content.dispatchStaticEvent('added', this._content);
					this._content.dispatch_ADDED_TO_STAGE(true);
				}
				break;
			}
			case '[asset Generic]': {
				this._applicationDomain.addDefinition(asset.name, asset as AssetBase);
				break;
			}
			case Graphics.assetType:
			case MorphSprite.assetType: {
				break;
			}
			default: {
				console.warn('Loaded unhandled asset-type', asset.assetType);
			}
		}
	}
}
