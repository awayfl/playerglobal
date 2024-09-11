import { ContextGLProfile, ContextMode, Stage as AwayStage, Stage, StageManager } from '@awayjs/stage';
import { EventDispatcher } from '../events/EventDispatcher';
import { Context3D } from '../display3D/Context3D';
import { Context3DProfile } from '../display3D/Context3DProfile';
import { AVMStage } from '@awayfl/swf-loader';
import { AXClass } from '@awayfl/avm2';

export class Stage3D extends EventDispatcher {
	static axClass: typeof Stage3D & AXClass;
	static classInitializer: any = null;
	private _context3D: Context3D
	private _visible: Boolean
	private _x: number
	private _y: number

	private _adapteeStage3Ds: AwayStage[] = AVMStage.instance().stage3Ds
	private _adaptee: AwayStage

	constructor() {
		super();

		this._adapteeStage3Ds[this._adapteeStage3Ds.length] = StageManager.getInstance().getFreeStage();
		console.log('Created Stage3D ' + (this._adapteeStage3Ds.length - 1));

	}

	public get context3D(): Context3D {
		return this._context3D;
	}

	public requestContext3D(context3DRenderMode: String = 'auto', profile: String = 'baseline'): void {
		this._context3D = new Context3D(this, this._adaptee, profile);
		const forceSoftware: boolean = (context3DRenderMode == 'auto');
		switch (profile) {
			case Context3DProfile.BASELINE:
				this._adaptee.requestContext(forceSoftware, ContextGLProfile.BASELINE);
				break;
			case Context3DProfile.BASELINE_CONSTRAINED:
				this._adaptee.requestContext(forceSoftware, ContextGLProfile.BASELINE_CONSTRAINED);
				break;
			case Context3DProfile.BASELINE_EXTENDED:
				this._adaptee.requestContext(forceSoftware, ContextGLProfile.BASELINE_EXTENDED);
				break;
			case Context3DProfile.STANDARD:
				console.log('Unsupported Context3D Profile \'standard\' Requested');
				break;
			case Context3DProfile.STANDARD_CONSTRAINED:
				console.log('Unsupported Context3D Profile \'standard_constrained\' Requested');
				break;
			case Context3DProfile.STANDARD_EXTENDED:
				console.log('Unsupported Context3D Profile \'standard_extended\' Requested');
				break;
			default:
				break;

		}
	}
}