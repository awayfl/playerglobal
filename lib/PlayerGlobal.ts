import { ABCFile, ABCCatalog, ActiveLoaderContext, AVM2LoadLibrariesFlags, IPlayerGlobal, AXSecurityDomain, Natives } from "@awayfl/avm2";
import { release, assert, PromiseWrapper, AVMStage, SWFFile } from "@awayfl/swf-loader";
import { SecurityDomain } from "./SecurityDomain";
import { initLink } from './link';
import { ISceneGraphFactory, TextField, SceneImage2D, Font, Sprite, MovieClip, MorphSprite, IDisplayObjectAdapter, FrameScriptManager, DisplayObjectContainer } from '@awayjs/scene';
import { LoaderContext } from './system/LoaderContext';
import { FlashSceneGraphFactory } from './factories/FlashSceneGraphFactory';
import { IAsset, WaveAudio } from '@awayjs/core';
import { ApplicationDomain } from './system/ApplicationDomain';
import { BitmapImage2D } from '@awayjs/stage';
import { Graphics } from '@awayjs/graphics';
import { Stage } from './display/Stage';
import { DisplayObject } from './display/DisplayObject';
import { LoaderInfo } from './display/LoaderInfo';
import { ILoader } from './ILoader';


export class PlayerGlobal implements IPlayerGlobal, ILoader {

	private _contentLoaderInfo:LoaderInfo;
	private _content:DisplayObject;
	private _avmStage: AVMStage;
	private _stage: Stage;
	private _applicationDomain: ApplicationDomain;

	public get stage():Stage
	{
		return this._stage;
	}

	public get content():DisplayObject
	{
		return this._content;
	}

	public createSecurityDomain(
		avmStage: AVMStage,
		swfFile: SWFFile,
		libraries: AVM2LoadLibrariesFlags
	): Promise<ISceneGraphFactory> {

		this._avmStage = avmStage;
		
		if(this._avmStage.avmTestHandler){
			Natives.print=function(sec: AXSecurityDomain, expression: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any) {
				let message;
				if(arguments.length==2){
					message=arguments[1];
				}
				else{
					message=Array.prototype.slice.call(arguments, 1).join(" ");
				}
				console.log("%c Test-Trace from SWF:", "color: DodgerBlue", message);
				avmStage.avmTestHandler.addMessage(message);
			}
		}


		initLink();

		var result = new PromiseWrapper<ISceneGraphFactory>();
		release || console.log("createSecurityDomain");
		release || assert(!!(libraries & AVM2LoadLibrariesFlags.Builtin));
		release || console.log("Load builtin.abc file");
		BrowserSystemResourcesLoadingService.getInstance()
			.load("./assets/builtins/builtin.abc", "arraybuffer")
			.then((buffer) => {
				var sec = new SecurityDomain();
				var env = { url: "builtin.abc", app: sec.system };
				var builtinABC = new ABCFile(env, new Uint8Array(buffer));
				(<any>sec).swfVersion = swfFile.swfVersion;
				sec.system.loadABC(builtinABC);
				sec.initialize();
				sec.system.executeABC(builtinABC);
				sec.player=avmStage;
				//SWF.leaveTimeline();

				//// If library is shell.abc, then just go ahead and run it now since
				//// it's not worth doing it lazily given that it is so small.
				//if (!!(libraries & AVM2LoadLibrariesFlags.Shell)) {
				//  var shellABC = new Shumway.AVMX.ABCFile(new Uint8Array(buffer));
				//  sec.system.loadAndExecuteABC(shellABC);
				//  result.resolve(sec);
				//  SystemResourcesLoadingService.instance.load(SystemResourceId.ShellAbc).then(function (buffer) {
				//    var shellABC = new Shumway.AVMX.ABCFile(new Uint8Array(buffer));
				//    sec.system.loadAndExecuteABC(shellABC);
				//    result.resolve(sec);
				//  }, result.reject);
				//  return;
				//}

				if (!!(libraries & AVM2LoadLibrariesFlags.Playerglobal)) {
					return Promise.all([
						BrowserSystemResourcesLoadingService.getInstance().load(
							"./assets/builtins/playerglobal.abcs", "arraybuffer"
						),
						BrowserSystemResourcesLoadingService.getInstance().load(
							"./assets/builtins/playerglobal.json", "json"
						)
					]).then((results) => {
						release || console.log("Load playerglobal.abcs & playerglobal.json");
						var catalog = new ABCCatalog(
							sec.system,
							new Uint8Array(results[0]),
							results[1]
						);
						release || console.log("add playerglobals as ABCCatalog");
						sec.addCatalog(catalog);

						BrowserSystemResourcesLoadingService.getInstance()
							.load("./assets/builtins/avmplus.abc", "arraybuffer")
							.then((buffer) => {
								//var sec = new AXSecurityDomain();
								var env = { url: "avmplus.File", app: sec.system };
								var avmPlusABC = new ABCFile(env, new Uint8Array(buffer));
								sec.system.loadABC(avmPlusABC);
								//sec.initialize();
								sec.system.executeABC(avmPlusABC);
							}, result.reject)
							.then(
								() => {
									this._contentLoaderInfo = new sec.flash.display.LoaderInfo(this, this._avmStage);
									this._applicationDomain = new sec.flash.system.ApplicationDomain()
									var loaderContext: LoaderContext = new sec.flash.system.LoaderContext(false, this._applicationDomain);
									ActiveLoaderContext.loaderContext = loaderContext;
									this._stage = new sec.flash.display.Stage();
									sec.flash.display.DisplayObject.axClass._activeStage = this._stage;
									this._avmStage.adapter = this._stage;
									this._stage.adaptee = this._avmStage;
									result.resolve(new FlashSceneGraphFactory(sec));
								}, result.reject);
					}, result.reject);
				}
				// todo: is this needed:
				result.resolve(null);
			}, result.reject);
		return result.promise;
	}

	public enterFrame() {	
		this._stage && this._stage.enterFrame();
	}

	public resizeStage() {
		// it can happen that resizeStage is called before createSecurityDomain has finished and stage exists
		this._stage && this._stage.resizeCallback();
	}
	
	public addAsset(asset: IAsset, addScene:boolean) {

		if (asset.isAsset(TextField)) {
			this._applicationDomain.addDefinition(asset.name, <TextField>asset);
		} else if (asset.isAsset(SceneImage2D) || asset.isAsset(BitmapImage2D)) {

			this._applicationDomain.addDefinition(asset.name, <SceneImage2D>asset);

			// we should only do this for bitmaps loaded from jpg or png
			// todo:
			//if (this._isImage)
			//	(<AwayDisplayObjectContainer> this._adaptee).addChild(new Bitmap(<BitmapData> (<SceneImage2D> asset).adapter).adaptee);
		} else if (asset.isAsset(WaveAudio)) {
			this._applicationDomain.addAudioDefinition(asset.name, (<WaveAudio>asset));
		} else if (asset.isAsset(Font)) {
			this._applicationDomain.addFontDefinition(asset.name, (<Font>asset));
		} else if (asset.isAsset(Sprite)) {
			//if((<AwaySprite> asset).material)
			//	(<AwaySprite> asset).material.bothSides=false;
			this._applicationDomain.addDefinition(asset.name, <Sprite>asset);
		} else if (asset.isAsset(MovieClip)) {
			this._applicationDomain.addDefinition(asset.name, <MovieClip>asset);

			// if this is the "Scene 1", we make it a child of the loader
			if (addScene && (<any>asset).isAVMScene) {// "Scene 1" when AWDParser, isAVMScene when using SWFParser

				this._content = <DisplayObject>(<IDisplayObjectAdapter>asset.adapter).clone();
				this._content.loaderInfo = this._contentLoaderInfo;
				this._content.adaptee.reset();
				(<any>this._content.adaptee).firstFrameOnSWFStart=true;
				FrameScriptManager.queue_as3_constructor(<any>this._content.adaptee);
				(<any>this._stage.adaptee).addChild(this._content.adaptee);				
				FrameScriptManager.execute_as3_constructors();
				this._content.dispatchStaticEvent("added", this._content);
				this._content.dispatch_ADDED_TO_STAGE();
				
			}
		}
		else if (asset.isAsset(Graphics)) {
		}
		else if (asset.isAsset(MorphSprite)) {
		}
		else {
			console.log("loaded unhandled asset-type")
		}
	}

}


class BrowserSystemResourcesLoadingService {
	private static _instance: BrowserSystemResourcesLoadingService;
	public static getInstance() {
		if (BrowserSystemResourcesLoadingService._instance)
			return BrowserSystemResourcesLoadingService._instance;
		return (BrowserSystemResourcesLoadingService._instance = new BrowserSystemResourcesLoadingService());
	}
	public constructor()
	{
		
	}

	public load(url, type): Promise<any> {
		return this._promiseFile(url, type);
	}

	private _promiseFile(path, responseType) {
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", path);
			xhr.responseType = responseType;
			xhr.onload = function () {
				var response = xhr.response;
				if (response) {
					if (responseType === "json" && xhr.responseType !== "json") {
						response = JSON.parse(response);
					}
					resolve(response);
				} else {
					reject("Unable to load " + path + ": " + xhr.statusText);
				}
			};
			xhr.onerror = function () {
				reject("Unable to load: xhr error");
			};
			xhr.send();
		});
	}
}
