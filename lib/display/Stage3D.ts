import { ContextGLProfile, ContextMode, Stage as AwayStage, Stage, StageManager } from '@awayjs/stage';
import { EventDispatcher } from '../events/EventDispatcher';
import { Context3D } from '../display3D/Context3D';
import { Context3DProfile } from '../display3D/Context3DProfile';
import { AVMStage, Debug } from '@awayfl/swf-loader';
import { Bytecode } from '@awayfl/avm2/lib/Bytecode';
import { Multiname } from '@awayfl/avm2';
import { Event } from '../events/Event';
import { SecurityDomain } from '../SecurityDomain';


export class Stage3D extends EventDispatcher {
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // [];
	private _context3D: Context3D
	private _visible: boolean
	private _x: number
	private _y: number
	private instance: number

	constructor() {
		// This is never called, what's going on???
		super();
		console.log("Stage3D constructor called")
	}

	public get x(): number {
		Debug.notImplemented('[playerglobal/display/Stage3D] - get x not implemented');
		return this._x;
	}

	public set x(value: number) {
		this._x = value;
		Debug.notImplemented('[playerglobal/display/Stage3D] - set x not implemented');
	}

	public get y(): number {
		Debug.notImplemented('[playerglobal/display/Stage3D] - get y not implemented');
		return this._y;
	}

	public set y(value: number) {
		value = this._y;
		Debug.notImplemented('[playerglobal/display/Stage3D] - set y not implemented');
	}

	public get visible(): boolean {
		Debug.notImplemented('[playerglobal/display/Stage3D] - get visible not implemented');
		return this._visible;
	}

	public set visible(value: boolean) {
		this._visible = value
		Debug.notImplemented('[playerglobal/display/Stage3D] - set visible not implemented');
	}

	public get context3D():Context3D {
		return this._context3D
	}

	public requestContext3D(context3DRenderMode: string = 'auto', profile: string = 'baseline'): void {
		console.log("Request Context")
		this._context3D = new Context3D(0, context3DRenderMode, profile ?? 'baseline' , this);
		this._context3D.addEventListener(Event.CONTEXT3D_CREATE, this.onContextCreated)
	}

	public onContextCreated(e:Event=null){
		super.dispatchEvent(new Event(Event.CONTEXT3D_CREATE))
	}
}