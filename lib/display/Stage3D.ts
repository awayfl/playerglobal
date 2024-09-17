import { AVMStage, Debug } from '@awayfl/swf-loader';
import { ContextGLProfile, Stage as AwayStage } from '@awayjs/stage';
import { Context3D } from '../display3D/Context3D';
import { Event } from '../events/Event';
import { EventDispatcher } from '../events/EventDispatcher';
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
	private _id: number
	private _adaptee: AwayStage

	constructor(i) {
		super();
		console.log('Stage3D Constructor');
		this._adaptee = AVMStage.instance().stage3Ds[i];
		this._id = i;
	}

	public get adaptee(): AwayStage {
		return this._adaptee;
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
		this._visible = value;
		Debug.notImplemented('[playerglobal/display/Stage3D] - set visible not implemented');
	}

	public get context3D(): Context3D {
		return this._context3D;
	}

	public requestContext3D(context3DRenderMode: string = 'auto', profile: string = 'baseline'): void {
		console.log('Request Context');
		this._context3D = new (this.sec as SecurityDomain).flash.display3D.Context3D(0, this, profile, context3DRenderMode);
		const forceSoftware: boolean = (context3DRenderMode == 'software');
		let awayContextProfile: ContextGLProfile;
		switch (profile) {
			case 'baseline':
				awayContextProfile = ContextGLProfile.BASELINE;
				break;
			case 'baseline_constrained':
				awayContextProfile = ContextGLProfile.BASELINE_CONSTRAINED;
				break;
			case 'baseline_extended':
				awayContextProfile = ContextGLProfile.BASELINE_EXTENDED;
				break;
			case 'standard':
				console.log('Unsupported Context3D Profile \'standard\' Requested');
				break;
			case 'standard_constrained':
				console.log('Unsupported Context3D Profile \'standard_constrained\' Requested');
				break;
			case 'standard_extended':
				console.log('Unsupported Context3D Profile \'standard_extended\' Requested');
				break;
			default:
				awayContextProfile = ContextGLProfile.BASELINE;
				break;
		}
		console.log('Context3D Config: ', 'id: ', 0, ' forceSoftware: ', forceSoftware, ' profile: ', awayContextProfile);
		this._adaptee.requestContext(forceSoftware, awayContextProfile);
		super.dispatchEvent(new (this.sec as SecurityDomain).flash.events.Event(Event.CONTEXT3D_CREATE));
	}
}