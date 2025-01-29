import { AVMStage } from '@awayfl/swf-loader';
import { ContextGLProfile, Stage as AwayStage } from '@awayjs/stage';
import { Context3D } from '../display3D/Context3D';
import { Event } from '../events/Event';
import { EventDispatcher } from '../events/EventDispatcher';
import { SecurityDomain } from '../SecurityDomain';
import { AXSecurityDomain } from '@awayfl/avm2';
import { ErrorEvent } from '../events/ErrorEvent';

export class Stage3D extends EventDispatcher {
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // [];
	private _context3D: Context3D
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
		return this._adaptee.x;
	}

	public set x(value: number) {
		this._adaptee.y = value;
	}

	public get y(): number {
		return this._adaptee.y;
	}

	public set y(value: number) {
		this._adaptee.y = value;
	}

	public get visible(): boolean {
		return this._adaptee.visible ;
	}

	public set visible(value: boolean) {
		this._adaptee.visible = value;
	}

	public get context3D(): Context3D {
		return this._context3D;
	}

	public requestContext3D(context3DRenderMode: string = 'auto', profile: string = 'baseline'): void {
		const stage3D:Stage3D = this
		setTimeout(function(){
		console.log('Request Context');
		stage3D._context3D = new (stage3D.sec as SecurityDomain).flash.display3D.Context3D(stage3D._id, stage3D, profile, context3DRenderMode);
		const forceSoftware: boolean = (context3DRenderMode == 'software');
		var awayContextProfile: ContextGLProfile;
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
				awayContextProfile = ContextGLProfile.STANDARD;
				break;
			case 'standard_constrained':
				awayContextProfile = ContextGLProfile.STANDARD_CONSTRAINED;
				break;
			case 'standard_extended':
				awayContextProfile = ContextGLProfile.STANDARD_EXTENDED;
				break;
			case 'enhanced':
				awayContextProfile = ContextGLProfile.ENHANCED;
				break;
			default:
				break;
		}
		console.log('Context3D Config: ', 'id: ', stage3D._id, ' forceSoftware: ', forceSoftware, ' profile: ', awayContextProfile);
		
		function dispatchContextCreated(e:Event){
			console.log(stage3D.context3D.driverInfo)
			stage3D._context3D.removeEventListener(Event.CONTEXT3D_CREATE, dispatchContextCreated)
			stage3D.dispatchEvent(new (<SecurityDomain>stage3D.sec).flash.events.Event(Event.CONTEXT3D_CREATE));
		}
		stage3D._context3D.addEventListener(Event.CONTEXT3D_CREATE, dispatchContextCreated)		
		stage3D._adaptee.requestContext(forceSoftware, awayContextProfile)
	}
}
