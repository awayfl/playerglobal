import { ContextGLDrawMode, ContextGLProfile, ContextGLProgramType, ContextGLVertexBufferFormat, ContextWebGL, IVertexBuffer, ProgramWebGL, Stage as AwayStage, StageEvent } from '@awayjs/stage';
import { BitmapData } from '../display/BitmapData';
import { Stage3D } from '../display/Stage3D';
import { Context3DProgramType } from '../display3D/Context3DProgramType';
import { Context3DVertexBufferFormat } from '../display3D/Context3DVertexBufferFormat';
import { IndexBuffer3D } from '../display3D/IndexBuffer3D';
import { Program3D } from '../display3D/Program3D';
import { VertexBuffer3D } from '../display3D/VertexBuffer3D';
import { EventDispatcher } from '../events/EventDispatcher';
import { Matrix3D } from '../geom/Matrix3D';
import { Rectangle } from '../geom/Rectangle';
import { ByteArray } from '../utils/ByteArray';
import { axCoerceString, Float64Vector } from '@awayfl/avm2';
import { Debug } from '@awayfl/swf-loader';
import { SecurityDomain } from '../SecurityDomain';
import { Event } from '../events/Event';
import { Security } from '../system/Security';
import { Texture } from './textures/Texture';
import { CubeTexture } from './textures/CubeTexture';
import { TextureBase } from './textures/TextureBase';
import { VertexBufferWebGL } from '@awayjs/stage';

export class Context3D extends EventDispatcher {
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // [];

	private _adaptee: AwayStage
	private _profile: string
	//private _currentProgram : Program3D

	constructor(id: number, stage3D: Stage3D, renderMode: string = 'auto', profile: string = 'baseline') {
		super();
		const context3D:Context3D = this
		const thisSec:SecurityDomain = (this.sec as SecurityDomain);

		console.log(`Context3D Create: ${renderMode} ${profile}`);
		this._profile = profile;
		this._adaptee = stage3D.adaptee;
		function dispatchContextCreated(e:StageEvent){
			context3D.adaptee.removeEventListener(StageEvent.CONTEXT_RECREATED, dispatchContextCreated)
			context3D.dispatchEvent(new thisSec.flash.events.Event(Event.CONTEXT3D_CREATE));
		}
		this._adaptee.addEventListener(StageEvent.CONTEXT_RECREATED, dispatchContextCreated)	
		}

	public get adaptee(): AwayStage {
		return this._adaptee;
	}

	public get backBufferHeight(): number {
		return this._adaptee.height
	}

	public get backBufferWidth(): number {
		return this._adaptee.width
	}

	public get driverInfo(): string {
		Debug.notImplemented('public flash.display3D.Context3D::get driverInfo'); 
		return 'OpenGL';
	}

	public get enableErrorChecking(): boolean {
		Debug.notImplemented('public flash.display3D.Context3D::get enableErrorChecking'); 
		return false
	}

	public set enableErrorChecking(toggle: boolean) {
		toggle = !!toggle;
		Debug.notImplemented('public flash.display3D.Context3D::set enableErrorChecking'); return;
		// this._enableErrorChecking = toggle;
	}

	public get maxBackBufferWidth(): number {
		Debug.notImplemented('public flash.display3D.Context3D::get maxBackBufferWidth'); 
		return 2048;
	}

	public set maxBackBufferWidth(value: number) {
		Debug.notImplemented('public flash.display3D.Context3D::set maxBackBufferWidth'); 
	}

	public get maxBackBufferHeight(): number {
		Debug.notImplemented('public flash.display3D.Context3D::set maxBackBufferHeight'); 
		return 2048;
	}

	public set maxBackBufferHeight(value: number) {
		Debug.notImplemented('public flash.display3D.Context3D::set maxBackBufferHeight'); 
	}

	public get profile(): string {
		Debug.notImplemented('public flash.display3D.Context3D::get profile'); 
		return axCoerceString(this._profile);
	}

	public static get supportsVideoTexture(): boolean {
		Debug.notImplemented('public flash.display3D.Context3D::get driverInfo'); 
		return false;;
	}

	public get totalGPUMemory(): number {
		Debug.notImplemented('public flash.display3D.Context3D::get totalGPUMemory'); 
		return 1024;;
	}

	public dispose(): void {
		Debug.notImplemented('public flash.display3D.Context3D::dispose'); return;
	}

	public configureBackBuffer(width: number, height: number, antiAlias: number, enableDepthAndStencil: boolean = true, wantsBestResolution: boolean = false, wantsBestResolutionOnBrowserZoom: boolean = false): void {
		this._adaptee.configureBackBuffer(width, height, antiAlias, enableDepthAndStencil);
	}

	public clear(red: number = 0.0, green: number = 0.0, blue: number = 0.0, alpha: number = 1.0, depth: number = 1.0, stencil: number = 0, mask: number = 0xffffffff): void {
		this._adaptee.clear(red, green, blue, alpha, depth, stencil, mask);
	}

	public drawTriangles(indexBuffer: IndexBuffer3D, firstIndex: number = 0, numTriangles: number = -1): void {
		this._adaptee.context.drawIndices(ContextGLDrawMode.TRIANGLES, indexBuffer._adaptee, firstIndex, (numTriangles == -1) ? -1 : (numTriangles * 3));
	}

	public present(): void {
		this._adaptee.present();
	}

	public setProgram(program: Program3D): void {
		this._adaptee.context.setProgram(program._adaptee);
		//this._currentProgram = program
	}

	public setProgramConstantsFromVector(programType: string, firstRegister: number /*int*/, data: Float64Vector, numRegisters: number /*int*/ = -1): void {
		let awayProgramType: ContextGLProgramType;
		switch (programType) {
			case Context3DProgramType.FRAGMENT:
				awayProgramType = ContextGLProgramType.FRAGMENT;
				break;
			case Context3DProgramType.VERTEX:
				awayProgramType = ContextGLProgramType.VERTEX;
				break;
			default:
				break;
		}
		// @todo: support transposed matrixes
		let awayData:Float32Array = new Float32Array(data.length)
		for(let i = 0; i < data.length; i++) {
			awayData[i] = data.axGetNumericProperty(i)

		}
		this._adaptee.context.setProgramConstantsFromArray(awayProgramType, awayData);
	}

	public setProgramConstantsFromMatrix(programType: string, firstRegister: number, matrix: Matrix3D, transposedMatrix: boolean = false): void {
		let awayProgramType: ContextGLProgramType;
		switch (programType) {
			case Context3DProgramType.FRAGMENT:
				awayProgramType = ContextGLProgramType.FRAGMENT;
				break;
			case Context3DProgramType.VERTEX:
				awayProgramType = ContextGLProgramType.VERTEX;
				break;
			default:
				break;
		}
		// @todo: support transposed matrixes
		this._adaptee.context.setProgramConstantsFromArray(awayProgramType, matrix.adaptee._rawData);
	}

	public setProgramConstantsFromByteArray(programType: string, firstRegister: number /*int*/, numRegisters: number /*int*/, data: ByteArray, byteArrayOffset: number /*uint*/): void {
		Debug.notImplemented('public flash.display3D.Context3D::setProgramConstantsFromByteArray'); return;
	}

	public setVertexBufferAt(index: number, buffer: VertexBuffer3D, bufferOffset: number = 0, format: string = 'float4'): void {
		let awayFormat: number;
		switch (format) {
			case Context3DVertexBufferFormat.BYTES_4:
				awayFormat = ContextGLVertexBufferFormat.BYTE_4;
				break;
			case Context3DVertexBufferFormat.FLOAT_1:
				awayFormat = ContextGLVertexBufferFormat.FLOAT_1;
				break;
			case Context3DVertexBufferFormat.FLOAT_2:
				awayFormat = ContextGLVertexBufferFormat.FLOAT_2;
				break;
			case Context3DVertexBufferFormat.FLOAT_3:
				awayFormat = ContextGLVertexBufferFormat.FLOAT_3;
				break;
			case Context3DVertexBufferFormat.FLOAT_4:
				awayFormat = ContextGLVertexBufferFormat.FLOAT_4;
				break;
			default:
				break;
		}
		(<ContextWebGL>this._adaptee.context).setVertexBufferAt( buffer ? index : -1, buffer ? <VertexBufferWebGL>buffer._adaptee : null, bufferOffset * 4, awayFormat, false);

	}

	public setBlendFactors(sourceFactor: string, destinationFactor: string): void {
		Debug.notImplemented('public flash.display3D.Context3D::setBlendFactors'); return;
	}

	public setColorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void {
		Debug.notImplemented('public flash.display3D.Context3D::setColorMask'); return;
	}

	public setDepthTest(fdepthMask: boolean, passCompareMode: string): void {
		Debug.notImplemented('public flash.display3D.Context3D::setDepthTest'); return;
	}

	public setCulling(triangleFaceToCull: string): void {
		Debug.notImplemented('public flash.display3D.Context3D::setCulling'); return;
	}

	public setStencilActions(triangleFace: string = 'frontAndBack', compareMode: string = 'always', actionOnBothPass: string = 'keep', actionOnDepthFail: string = 'keep', actionOnDepthPassStencilFail: string = 'keep'): void {
		Debug.notImplemented('public flash.display3D.Context3D::setStencilActions'); return;
	}

	public setStencilReferenceValue(referenceValue: number /*uint*/, readMask: number /*uint*/ = 255, writeMask: number /*uint*/ = 255): void {
		Debug.notImplemented('public flash.display3D.Context3D::setStencilReferenceValue'); return;
	}

	public setScissorRectangle(rectangle: Rectangle): void {
		Debug.notImplemented('public flash.display3D.Context3D::setScissorRectangle'); return;
	}

	public createVertexBuffer(numVertices: number, data32PerVertex: number, bufferUsage: string = 'staticDraw'): VertexBuffer3D {
		console.log('createVertexBuffer');
		return new (this.sec as SecurityDomain).flash.display3D.VertexBuffer3D(this, numVertices, data32PerVertex);
	}

	public createIndexBuffer(numIndices: number, bufferUsage: string = 'staticDraw'): IndexBuffer3D {
		return new (this.sec as SecurityDomain).flash.display3D.IndexBuffer3D(this, numIndices);
	}

	public createTexture(width: number /*int*/, height: number /*int*/, format: string, optimizeForRenderToTexture: boolean, streamingLevels: number /*int*/ = 0): any {
		return new (this.sec as SecurityDomain).flash.display3D.textures.Texture(this, width, height, format, optimizeForRenderToTexture, streamingLevels);
	}

	public createRectangleTexture(width: number /*int*/, height: number /*int*/, format: string, optimizeForRenderToTexture: boolean): any {
		return new (this.sec as SecurityDomain).flash.display3D.textures.RectangleTexture(this, width, height, format, optimizeForRenderToTexture);
	}

	public createCubeTexture(size: number /*int*/, format: string, optimizeForRenderToTexture: boolean, streamingLevels: number /*int*/ = 0): any /*CubeTexture*/ {
		return new (this.sec as SecurityDomain).flash.display3D.textures.CubeTexture(this, size, format, optimizeForRenderToTexture, streamingLevels)
	}

	public createProgram(): Program3D {
		return new (this.sec as SecurityDomain).flash.display3D.Program3D(this);
	}

	public drawToBitmapData(destination: BitmapData): void {
		Debug.notImplemented('public flash.display3D.Context3D::drawToBitmapData'); return;
	}

	public setRenderToTextureInternal(texture:TextureBase, targetType: number /*int*/, enableDepthAndStencil: boolean, antiAlias: number /*int*/, surfaceSelector: number /*int*/): void {
		Debug.notImplemented('public flash.display3D.Context3D::setRenderToTextureInternal ' + texture._adaptee); return;
	}

	public setTextureInternal(sampler: number /*int*/, texture:Texture): void {
		if(texture) // Away3D uses a null texture to clear this, but null in AwayJS just errors
			this._adaptee.context.setTextureAt(sampler, texture._adaptee)
	}

	public setCubeTextureInternal(sampler: number /*int*/, textureCube:CubeTexture): void {
		if(textureCube) // Away3D uses a null texture to clear this, but null in AwayJS just errors
			this._adaptee.context.setTextureAt(sampler, textureCube._adaptee)
	}

}