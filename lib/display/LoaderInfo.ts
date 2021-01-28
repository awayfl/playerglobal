import { EventDispatcher } from '../events/EventDispatcher';
import { ApplicationDomain } from '../system/ApplicationDomain';
import { IOErrorEvent } from '../events/IOErrorEvent';
import { ProgressEvent } from '../events/ProgressEvent';
import { Event } from '../events/Event';
import { ILoader } from '../ILoader';
import { Loader } from './Loader';
import { URLLoaderEvent, LoaderEvent as AwayLoaderEvent, Box, Debug } from '@awayjs/core';
import { DisplayObject } from './DisplayObject';
import { ByteArray } from '../utils/ByteArray';
import { DisplayObject as AwayDisplayObject } from '@awayjs/scene';
import { SecurityDomain } from '../SecurityDomain';
import { PickGroup } from '@awayjs/view';
import { AVMStage } from '@awayfl/swf-loader';

interface LoaderInfoCompleteQueueItem {
	loaderInfo: LoaderInfo;
	delayCnt: number;
}
export class LoaderInfoCompleteQueue {
	private static _queue: LoaderInfoCompleteQueueItem[] = [];
	public static DELAY: number = 2;
	public static addQueue(LoaderInfo) {
		this._queue.push({
			loaderInfo:LoaderInfo,
			delayCnt: this.DELAY
		});
	}

	public static executeQueue() {
		const queue = this._queue;
		let i = queue.length;
		let allDone: boolean = true;
		while (i > 0) {
			i--;
			const loderInfoItem = queue[i];
			loderInfoItem.delayCnt--;
			if (loderInfoItem.delayCnt > 0) {
				allDone = false;
			} else if (loderInfoItem.delayCnt == 0) {
				const newEvent = new (<SecurityDomain> loderInfoItem.loaderInfo.sec).flash.events.Event(Event.COMPLETE);
				newEvent.currentTarget = loderInfoItem.loaderInfo;
				loderInfoItem.loaderInfo.dispatchEvent(newEvent);

			}

		}
		if (allDone)
			queue.length = 0;
	}
}
/**
 * The LoaderInfo export class provides information about a loaded SWF file or a
 * loaded image file(JPEG, GIF, or PNG). LoaderInfo objects are available for
 * any display object. The information provided includes load progress, the
 * URLs of the loader and loaded content, the number of bytes total for the
 * media, and the nominal height and width of the media.
 *
 * You can access LoaderInfo objects in two ways:
 *
 * * The `contentLoaderInfo` property of a flash.display.Loader
 *   object -  The `contentLoaderInfo` property is always available
 *   for any Loader object. For a Loader object that has not called the
 *   `load()` or `loadBytes()` method, or that has not
 *   sufficiently loaded, attempting to access many of the properties of the
 *   `contentLoaderInfo` property throws an error.
 * * The `loaderInfo` property of a display object.
 *
 * The `contentLoaderInfo` property of a Loader object provides
 * information about the content that the Loader object is loading, whereas
 * the `loaderInfo` property of a DisplayObject provides
 * information about the root SWF file for that display object.
 *
 * When you use a Loader object to load a display object(such as a SWF
 * file or a bitmap), the `loaderInfo` property of the display
 * object is the same as the `contentLoaderInfo` property of the
 * Loader object(`DisplayObject.loaderInfo =
 * Loader.contentLoaderInfo`). Because the instance of the main export class of
 * the SWF file has no Loader object, the `loaderInfo` property is
 * the only way to access the LoaderInfo for the instance of the main export class of
 * the SWF file.
 *
 * The following diagram shows the different uses of the LoaderInfo
 * object - for the instance of the main export class of the SWF file, for the
 * `contentLoaderInfo` property of a Loader object, and for the
 * `loaderInfo` property of a loaded object:
 *
 * When a loading operation is not complete, some properties of the
 * `contentLoaderInfo` property of a Loader object are not
 * available. You can obtain some properties, such as
 * `bytesLoaded`, `bytesTotal`, `url`,
 * `loaderURL`, and `applicationDomain`. When the
 * `loaderInfo` object dispatches the `init` event, you
 * can access all properties of the `loaderInfo` object and the
 * loaded image or SWF file.
 *
 * **Note:** All properties of LoaderInfo objects are read-only.
 *
 * The `EventDispatcher.dispatchEvent()` method is not
 * applicable to LoaderInfo objects. If you call `dispatchEvent()`
 * on a LoaderInfo object, an IllegalOperationError exception is thrown.
 *
 * @event complete   Dispatched when data has loaded successfully. In other
 *                   words, it is dispatched when all the content has been
 *                   downloaded and the loading has finished. The
 *                   `complete` event is always dispatched after
 *                   the `init` event. The `init` event
 *                   is dispatched when the object is ready to access, though
 *                   the content may still be downloading.
 * @event httpStatus Dispatched when a network request is made over HTTP and
 *                   an HTTP status code can be detected.
 * @event init       Dispatched when the properties and methods of a loaded
 *                   SWF file are accessible and ready for use. The content,
 *                   however, can still be downloading. A LoaderInfo object
 *                   dispatches the `init` event when the following
 *                   conditions exist:
 *
 *                   * All properties and methods associated with the
 *                     loaded object and those associated with the LoaderInfo
 *                     object are accessible.
 *                   * The constructors for all child objects have
 *                     completed.
 *                   * All ActionScript code in the first frame of the
 *                     loaded SWF's main timeline has been executed.
 *
 *                   For example, an `Event.INIT` is dispatched
 *                   when the first frame of a movie or animation is loaded.
 *                   The movie is then accessible and can be added to the
 *                   display list. The complete movie, however, can take
 *                   longer to download. The `Event.COMPLETE` is
 *                   only dispatched once the full movie is loaded.
 *
 *                   The `init` event always precedes the
 *                   `complete` event.
 * @event ioError    Dispatched when an input or output error occurs that
 *                   causes a load operation to fail.
 * @event open       Dispatched when a load operation starts.
 * @event progress   Dispatched when data is received as the download
 *                   operation progresses.
 * @event unload     Dispatched by a LoaderInfo object whenever a loaded
 *                   object is removed by using the `unload()`
 *                   method of the Loader object, or when a second load is
 *                   performed by the same Loader object and the original
 *                   content is removed prior to the load beginning.
 */
export class LoaderInfo extends EventDispatcher {
	private _bytes: ByteArray;
	private _bytesLoaded: number = 0;
	private _bytesTotal: number = 0;
	private _url: string;

	public static DefaultLocation: string = null;

	private _source: ByteArray;
	private _loader: ILoader;
	private _container: AwayDisplayObject;
	private _onLoaderErrorDelegate: (event: AwayLoaderEvent) => void;
	private _onLoaderStartDelegate: (event: AwayLoaderEvent) => void;
	private _onLoadProgressDelegate: (event: URLLoaderEvent) => void;
	public _onLoaderCompleteDelegate: (event: AwayLoaderEvent) => void;

	private _swfVersion: number;
	private _applicationDomain: ApplicationDomain;

	/**
	 * The ActionScript version of the loaded SWF file. The language
	 * version is specified by using the enumerations in the
	 * ActionScriptVersion class, such as
	 * `ActionScriptVersion.ACTIONSCRIPT2` and `ActionScriptVersion.ACTIONSCRIPT3`.
	 *
	 * **Note:** This property always has a value of either
	 * `ActionScriptVersion.ACTIONSCRIPT2` or `ActionScriptVersion.ACTIONSCRIPT3`.
	 * ActionScript 1.0 and 2.0 are both reported as
	 * `ActionScriptVersion.ACTIONSCRIPT2` (version 2.0). This property only
	 * distinguishes ActionScript 1.0 and 2.0 from ActionScript 3.0.
	 *
	 * @throws	Error If the file is not downloaded sufficiently to retrieve the
	 *                requested information.
	 * @throws	Error If the file is not a SWF file.
	 */
	public get actionScriptVersion(): number {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get actionScriptVersion', '');
		return 0;
	}

	public set source(value: ByteArray) {
		this._source = value;
		this._bytesTotal = value?.length || 0;
	}

	// for AVM:
	public getSymbolById(value: any): any {}

	constructor(loader: ILoader, container: AwayDisplayObject) {
		super();

		// Events that are supposed to be working are registered as eventMappingExtern:

		this.eventMappingExtern[Event.COMPLETE] = 'LoaderInfo:Event.COMPLETE';
		this.eventMappingExtern[ProgressEvent.PROGRESS] = 'LoaderInfo:ProgressEvent.PROGRESS';
		this.eventMappingExtern[IOErrorEvent.IO_ERROR] = 'LoaderInfo:IOErrorEvent.IO_ERROR';

		// Events not supported yet are registered as eventMappingDummys:

		this.eventMappingDummys[Event.UNLOAD] = 'LoaderInfo:Event.UNLOAD';
		//this.eventMappingDummys[IOErrorEvent.IO_ERROR]="LoaderInfo:IOErrorEvent.IO_ERROR";
		//this.eventMappingDummys[HTTPStatusEvent.IO_ERROR]="HTTPStatusEvent.IO_ERROR";
		this.eventMappingDummys[Event.OPEN] = 'LoaderInfo:Event.OPEN';
		this.eventMappingDummys[Event.INIT] = 'LoaderInfo:Event.INIT';

		this._onLoaderStartDelegate = (event: AwayLoaderEvent) => this._onLoaderStart(event);
		this._onLoadProgressDelegate = (event: URLLoaderEvent) => this._onLoadProgress(event);
		this._onLoaderCompleteDelegate = (event: AwayLoaderEvent) => this._onLoaderComplete(event);
		this._onLoaderErrorDelegate = this._onLoadeError.bind(this);

		this._loader = loader;
		this._container = container;
		this._container.addEventListener(AwayLoaderEvent.LOADER_START, this._onLoaderStartDelegate);
		this._container.addEventListener(URLLoaderEvent.LOAD_PROGRESS, this._onLoadProgressDelegate);
		this._container.addEventListener(AwayLoaderEvent.LOADER_COMPLETE, this._onLoaderCompleteDelegate);
		this._container.addEventListener(URLLoaderEvent.LOAD_ERROR, this._onLoaderErrorDelegate);
	}

	private _onLoadeError(event: URLLoaderEvent): void {
		const newEvent = new (<SecurityDomain> this.sec).flash.events.IOErrorEvent(IOErrorEvent.IO_ERROR);
		newEvent.currentTarget = this;
		this.dispatchEvent(newEvent);
	}

	private _onLoaderStart(event: AwayLoaderEvent): void {
		this._bytesLoaded = 0;
		this._bytesTotal = this._source?.length || 0;

		this._url = event.url;
	}

	private _onLoadProgress(event: URLLoaderEvent): void {
		this._bytesLoaded = event.urlLoader.bytesLoaded;
		this._bytesTotal = event.urlLoader.bytesTotal;

		const newEvent = new (<SecurityDomain> this.sec).flash.events.ProgressEvent(
			ProgressEvent.PROGRESS, null, null, event.urlLoader.bytesLoaded, event.urlLoader.bytesTotal);
		newEvent.currentTarget = this;
		this.dispatchEvent(newEvent);
	}

	private _onLoaderComplete(event: AwayLoaderEvent): void {
		if (this._source) {
			this._bytesTotal = this._bytesLoaded = this._source.length;
		} else if (event.assets && event.assets.length) {
			// use count of assets instead real bytes
			this._bytesLoaded = event.assets.length;
			this._bytesTotal = event.assets.length;
		} else {
			this._bytesTotal = this._bytesLoaded = this._bytesTotal || 1; //avoid devide on 0
		}

		this._url = event.url;

		LoaderInfoCompleteQueue.addQueue(this);
	}

	/**
	 * When an external SWF file is loaded, all ActionScript 3.0 definitions
	 * contained in the loaded class are stored in the
	 * `applicationDomain` property.
	 *
	 * All code in a SWF file is defined to exist in an application domain.
	 * The current application domain is where your main application runs. The
	 * system domain contains all application domains, including the current
	 * domain and all classes used by Flash Player or Adobe AIR.
	 *
	 * All application domains, except the system domain, have an associated
	 * parent domain. The parent domain of your main application's
	 * `applicationDomain` is the system domain. Loaded classes are
	 * defined only when their parent doesn't already define them. You cannot
	 * override a loaded class definition with a newer definition.
	 *
	 * For usage examples of application domains, see the "Client System
	 * Environment" chapter in the _ActionScript 3.0 Developer's Guide_.
	 *
	 * @throws SecurityError This security sandbox of the caller is not allowed
	 *                       to access this ApplicationDomain.
	 */
	public get applicationDomain(): ApplicationDomain {
		return this._applicationDomain;
	}

	/**
	 * The bytes associated with a LoaderInfo object.
	 *
	 * @throws SecurityError If the object accessing this API is prevented from
	 *                       accessing the loaded object due to security
	 *                       restrictions. This situation can occur, for
	 *                       instance, when a Loader object attempts to access
	 *                       the `contentLoaderInfo.content` property
	 *                       and it is not granted security permission to access
	 *                       the loaded content.
	 *
	 *                       For more information related to security, see the
	 *                       Flash Player Developer Center Topic:
	 *                       [Security](http://www.adobe.com/go/devnet_security_en).
	 */
	public get bytes(): ByteArray {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get bytes', '');
		return null;

	}

	/**
	 * The number of bytes that are loaded for the media. When this number equals
	 * the value of `bytesTotal`, all of the bytes are loaded.
	 */
	public get bytesLoaded(): number {
		return this._bytesLoaded;
	}

	/**
	 * The number of compressed bytes in the entire media file.
	 *
	 * Before the first `progress` event is dispatched by this
	 * LoaderInfo object's corresponding Loader object, `bytesTotal`
	 * is 0. After the first `progress` event from the Loader object,
	 * `bytesTotal` reflects the actual number of bytes to be
	 * downloaded.
	 */
	public get bytesTotal(): number {
		return this._bytesTotal;
	}

	/**
	 * Expresses the trust relationship from content (child) to the Loader (parent).
	 * If the child has allowed the parent access, true; otherwise, false. This
	 * property is set to true if the child object has called the `allowDomain()`
	 * method to grant permission to the parent domain or if a URL policy is loaded
	 * at the child domain that grants permission to the parent domain. If child
	 * and parent are in the same domain, this property is set to true.
	 *
	 * For more information related to security, see the Flash Player Developer
	 * Center Topic: [Security](http://www.adobe.com/go/devnet_security_en).
	 *
	 * @throws Error Thrown if the file is not downloaded sufficiently to retrieve
	 *               the requested information.
	 */
	public get childAllowsParent(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get childAllowsParent', '');
		return false;
	}

	/**
	 * A object that can be set by the loaded content's code to expose properties
	 * and methods that can be accessed  by code in the Loader object's sandbox.
	 * This _sandbox bridge_ lets content from a non-application domain have
	 * controlled access to scripts in the AIR application sandbox, and vice versa.
	 * The sandbox bridge serves as a gateway between the sandboxes, providing
	 * explicit interaction between application and non-application security
	 * sandboxes.
	 *
	 * @throws SecurityError Only content in the loaded content's sandbox can set
	 *                       this property.
	 */
	public get childSandboxBridge(): any {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get childSandboxBridge', '');
		return null;
	}

	public set childSandboxBridge(door: any) {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'set childSandboxBridge', '');
	}

	/**
	 * The loaded object associated with this LoaderInfo object.
	 *
	 * @throws SecurityError If the object accessing this API is prevented from
	 *                       accessing the loaded object due to security
	 *                       restrictions. This situation can occur, for
	 *                       instance, when a Loader object attempts to access
	 *                       the `contentLoaderInfo.content` property
	 *                       and it is not granted security permission to access
	 *                       the loaded content.
	 *
	 *                       For more information related to security, see the
	 *                       Flash Player Developer Center Topic:
	 *                       [Security](http://www.adobe.com/go/devnet_security_en).
	 */
	public get content(): DisplayObject {
		return this._loader.content;
	}

	/**
	 * The MIME type of the loaded file. The value is `null` if not
	 * enough of the file has loaded in order to determine the type. The
	 * following list gives the possible values:
	 *
	 * * `"application/x-shockwave-flash"`
	 * * `"image/jpeg"`
	 * * `"image/gif"`
	 * * `"image/png"`
	 */
	public get contentType(): string {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get contentType', '');
		return null;
	}

	/**
	 * The nominal frame rate, in frames per second, of the loaded SWF file. This
	 * number is often an integer, but need not be.
	 *
	 * This value may differ from the actual frame rate in use. Flash Player
	 * or Adobe AIR only uses a single frame rate for all loaded SWF files at any
	 * one time, and this frame rate is determined by the nominal frame rate of
	 * the main SWF file. Also, the main frame rate may not be able to be
	 * achieved, depending on hardware, sound synchronization, and other
	 * factors.
	 *
	 * @throws Error If the file is not downloaded sufficiently to retrieve the
	 *               requested information.
	 * @throws Error If the file is not a SWF file.
	 */
	public get frameRate(): number {
		return AVMStage.instance().frameRate;
	}

	/**
	 * The nominal height of the loaded file. This value might differ from the
	 * actual height at which the content is displayed, since the loaded content
	 * or its parent display objects might be scaled.
	 *
	 * @throws Error If the file is not downloaded sufficiently to retrieve the
	 *               requested information.
	 */
	public get height(): number {
		const box: Box = PickGroup.getInstance(
			this._loader.stage.view).getBoundsPicker(this._container.partition).getBoxBounds(this._container);

		return (box == null) ? 0 : box.height;

	}

	/**
	 * Indicates if the `LoaderInfo.url` property has been truncated.
	 *
	 * When the `isURLInaccessible` value is true the `LoaderInfo.url` value is only
	 * the domain of the final URL from which the content loaded. For example, the
	 * property is truncated if the content is loaded from
	 * `http://www.adobe.com/assets/hello.swf`, and the `LoaderInfo.url` property
	 * has the value `http://www.adobe.com`. The `isURLInaccessible`
	 * value is true only when all of the following are also true:
	 *
	 * * An HTTP redirect occurred while loading the content.
	 * * The SWF file calling `Loader.load()` is from a different domain than the
	 *   content's final URL.
	 * * The SWF file calling `Loader.load()` does not have permission to access
	 *   the content. Permission is granted to access the content the same way
	 *   permission is granted for `BitmapData.draw()`: call `Security.allowDomain()`
	 *   to access a SWF file (or for non-SWF file content, establish a policy
	 *   file and use the `LoaderContext.checkPolicyFile` property).
	 *
	 * **Note:** The `isURLInaccessible` property was added for Flash Player 10.1 and
	 * AIR 2.0. However, this property is made available to SWF files of all
	 * versions when the Flash runtime supports it. So, using some authoring tools
	 * in "strict mode" causes a compilation error. To work around the error use
	 * the indirect syntax `myLoaderInfo["isURLInaccessible"]`, or disable strict
	 * mode. If you are using Flash Professional CS5 or Flex SDK 4.1, you can use
	 * and compile this API for runtimes released before Flash Player 10.1 and AIR 2.
	 *
	 * For application content in AIR, the value of this property is always false.
	 */
	public get isURLInaccessible(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get isURLInaccessible', '');
		return false;

	}

	/**
	 * The Loader object associated with this LoaderInfo object. If this
	 * LoaderInfo object is the `loaderInfo` property of the instance
	 * of the main export class of the SWF file, no Loader object is associated.
	 *
	 * @throws SecurityError If the object accessing this API is prevented from
	 *                       accessing the Loader object because of security
	 *                       restrictions. This can occur, for instance, when a
	 *                       loaded SWF file attempts to access its
	 *                       `loaderInfo.loader` property and it is
	 *                       not granted security permission to access the
	 *                       loading SWF file.
	 *
	 *                       For more information related to security, see the
	 *                       Flash Player Developer Center Topic:
	 *                       [Security](http://www.adobe.com/go/devnet_security_en).
	 */
	public get loader(): Loader {
		return (this._loader instanceof Loader) ? this._loader : null;

	}

	/**
	 * The URL of the SWF file that initiated the loading of the media described
	 * by this LoaderInfo object. For the instance of the main class of the SWF
	 * file, this URL is the same as the SWF file's own URL.
	 */
	public get loaderURL(): string {
		return LoaderInfo.DefaultLocation;
		return this._loader.stage.getChildAt(0).loaderInfo.url;

	}

	/**
	 * An object that contains name-value pairs that represent the parameters
	 * provided to the loaded SWF file.
	 *
	 * You can use a `for-in` loop to extract all the names and
	 * values from the `parameters` object.
	 *
	 * The two sources of parameters are: the query string in the URL of the
	 * main SWF file, and the value of the `FlashVars` HTML parameter
	 * (this affects only the main SWF file).
	 *
	 * The `parameters` property replaces the ActionScript 1.0 and
	 * 2.0 technique of providing SWF file parameters as properties of the main
	 * timeline.
	 *
	 * The value of the `parameters` property is null for Loader
	 * objects that contain SWF files that use ActionScript 1.0 or 2.0. It is
	 * only non-null for Loader objects that contain SWF files that use
	 * ActionScript 3.0.
	 */
	public get parameters(): any {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get parameters', '');
		return this.sec.createArrayUnsafe([]);
	}

	/**
	 * Expresses the trust relationship from Loader(parent) to the content
	 * (child). If the parent has allowed the child access, `true`;
	 * otherwise, `false`. This property is set to `true`
	 * if the parent object called the `allowDomain()` method to grant
	 * permission to the child domain or if a URL policy file is loaded at the
	 * parent domain granting permission to the child domain. If child and parent
	 * are in the same domain, this property is set to `true`.
	 *
	 * For more information related to security, see the Flash Player
	 * Developer Center Topic: [Security](http://www.adobe.com/go/devnet_security_en).
	 *
	 * @throws Error Thrown if the file is not downloaded sufficiently to
	 *               retrieve the requested information.
	 */
	public get parentAllowsChild(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get parentAllowsChild', '');
		return false;

	}

	/**
	 * A object that can be set by code in the Loader object's sandbox to expose
	 * properties and methods that can be accessed by the loaded content's code.
	 * This _sandbox bridge_ lets content from a non-application domain have
	 * controlled access to scripts in the AIR application sandbox, and vice versa.
	 * The sandbox bridge serves as a gateway between the sandboxes, providing
	 * explicit interaction between application and non-application security
	 * sandboxes.
	 *
	 * @throws SecurityError Only content in the Loader object's sandbox can set
	 *         this property.
	 */
	public get parentSandboxBridge(): any {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get parentSandboxBridge', '');
		return null;
	}

	public set parentSandboxBridge(door: any) {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'set parentSandboxBridge', '');
	}

	/**
	 * Expresses the domain relationship between the loader and the content:
	 * `true` if they have the same origin domain; `false`
	 * otherwise.
	 *
	 * @throws Error Thrown if the file is not downloaded sufficiently to
	 *               retrieve the requested information.
	 */
	public get sameDomain(): boolean {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get sameDomain', '');
		return false;

	}

	/**
	 * An EventDispatcher instance that can be used to exchange events across
	 * security boundaries. Even when the Loader object and the loaded content
	 * originate from security domains that do not trust one another, both can
	 * access `sharedEvents` and send and receive events via this
	 * object.
	 */
	public get sharedEvents(): EventDispatcher {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get sharedEvents', '');
		return null;
	}

	/**
	 * The file format version of the loaded SWF file. The file format is
	 * specified using the enumerations in the SWFVersion class, such as
	 * `SWFVersion.FLASH7` and `SWFVersion.FLASH9`.
	 *
	 * @throws Error If the file is not downloaded sufficiently to retrieve
	 *               the requested information.
	 * @throws Error If the file is not a SWF file.
	 */
	public get swfVersion(): number {
		return this._swfVersion;
	}

	/**
	 * An object that dispatches an `uncaughtError` event when an
	 * unhandled error occurs in code in this LoaderInfo object's SWF file. An
	 * uncaught error happens when an error is thrown outside of any
	 * `try..catch` blocks or when an ErrorEvent object is dispatched
	 * with no registered listeners.
	 *
	 * This property is created when the SWF associated with this LoaderInfo
	 * has finished loading. Until then the `uncaughtErrorEvents`
	 * property is `null`. In an ActionScript-only project, you can
	 * access this property during or after the execution of the constructor
	 * function of the main class of the SWF file. For a Flex project, the
	 * `uncaughtErrorEvents` property is available after the
	 * `applicationComplete` event is dispatched.
	 */
	public get uncaughtErrorEvents(): any {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'get uncaughtErrorEvents', '');
		return null;

	}

	/**
	 * The URL of the media being loaded.
	 *
	 * Before the first `progress` event is dispatched by this
	 * LoaderInfo object's corresponding Loader object, the value of the
	 * `url` property might reflect only the initial URL specified in
	 * the call to the `load()` method of the Loader object. After the
	 * first `progress` event, the `url` property reflects
	 * the media's final URL, after any redirects and relative URLs are
	 * resolved.
	 *
	 * In some cases, the value of the `url` property is truncated;
	 * see the `isURLInaccessible` property for details.
	 */
	public get url(): string {
		if (LoaderInfo.DefaultLocation != null && typeof LoaderInfo.DefaultLocation !== 'undefined')
			return LoaderInfo.DefaultLocation;
		if (this._url.includes('?')) {
			this._url = this._url.substr(0, this._url.indexOf('?'));
		}
		return this._url;
	}

	public set url(value: string) {
		this._url = value;
	}

	/**
	 * The nominal width of the loaded content. This value might differ from the
	 * actual width at which the content is displayed, since the loaded content
	 * or its parent display objects might be scaled.
	 *
	 * @throws Error If the file is not downloaded sufficiently to retrieve the
	 *               requested information.
	 */
	public get width(): number {
		const box: Box = PickGroup.getInstance(
			this._loader.stage.view).getBoundsPicker(this._container.partition).getBoxBounds(this._container);

		return (box == null) ? 0 : box.width;
	}

	/**
	 * Returns the LoaderInfo object associated with a SWF file defined as an
	 * object.
	 *
	 * @param object The object for which you want to get an associated
	 *               LoaderInfo object.
	 * @return The associated LoaderInfo object. Returns null when called
	 *         in non-debugger builds (or when debugging is not enabled) or if
	 *         the referenced object does not have an associated LoaderInfo
	 *         object (such as some objects used by the AIR runtime).
	 * @throws SecurityError The caller is not running in the local trusted
	 *                       sandbox.
	 */
	public static getLoaderInfoByDefinition(object: any): LoaderInfo {
		// @todo
		Debug.throwPIR('playerglobals/display/LoaderInfo', 'static getLoaderInfoByDefinition', '');
		return null;
	}

	public _setApplicationDomain(value: ApplicationDomain) {
		this._applicationDomain = value
			|| new (<SecurityDomain> this.sec).flash.system.ApplicationDomain(ApplicationDomain.currentDomain);
	}

}
