import { BitmapImage2D,
		 ContextGLDrawMode,
		 ContextGLProgramType,
		 ContextGLVertexBufferFormat,
		 ContextWebGL,
		 Stage as AwayStage,
		 StageEvent,
		 TextureWebGL,
		 VertexBufferWebGL,
		 ContextGLClearMask,
		 ContextGLCompareMode,
		 ContextGLStencilAction,
		 ContextGLTriangleFace,
		 ContextGLBlendFactor } from '@awayjs/stage';
import { axCoerceString, Float64Vector } from '@awayfl/avm2';
import { Debug } from '@awayfl/swf-loader';
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
import { SecurityDomain } from '../SecurityDomain';
import { Event } from '../events/Event';
import { Security } from '../system/Security';
import { Texture } from './textures/Texture';
import { RectangleTexture } from './textures/RectangleTexture';
import { CubeTexture } from './textures/CubeTexture';
import { TextureBase } from './textures/TextureBase';
import { Context3DClearMask } from './Context3DClearMask';
import { CoordinateSystem } from '@awayjs/core';
import { Context3DTriangleFace } from './Context3DTriangleFace';
import { Context3DCompareMode } from './Context3DCompareMode';
import { Context3DStencilAction } from './Context3DStencilAction';
import { Context3DBlendFactor } from './Context3DBlendFactor';

export class Context3D extends EventDispatcher {
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // [];

	private _adaptee: AwayStage;
	private _profile: string;
	private _gl: WebGL2RenderingContext | WebGLRenderingContext;
	//private _currentProgram : Program3D;

	// @todo: Constructor isn't meant to be public
	constructor(stage3D: Stage3D, renderMode: string = 'auto', profile: string = 'baseline') {
		super();
		const context3D: Context3D = this;
		const thisSec: SecurityDomain = (this.sec as SecurityDomain);

		console.log(`Context3D Create: ${renderMode} ${profile}`);
		this._profile = profile;
		this._adaptee = stage3D.adaptee;
		function dispatchContextCreated(e: StageEvent) {
			context3D.adaptee.removeEventListener(StageEvent.CONTEXT_RECREATED, dispatchContextCreated);
			context3D.dispatchEvent(new thisSec.flash.events.Event(Event.CONTEXT3D_CREATE));
			context3D._gl = (context3D.adaptee.context as unknown as ContextWebGL)._gl;
		}
		this._adaptee.addEventListener(StageEvent.CONTEXT_RECREATED, dispatchContextCreated);
	}

	public get adaptee(): AwayStage {
		return this._adaptee;
	}

	public get backBufferHeight(): number {
		return this._adaptee.height;
	}

	public get backBufferWidth(): number {
		return this._adaptee.width;
	}

	public get driverInfo(): string {
		Debug.notImplemented('public flash.display3D.Context3D::get driverInfo');
		return axCoerceString('OpenGL');
	}

	public get enableErrorChecking(): boolean {
		Debug.notImplemented('public flash.display3D.Context3D::get enableErrorChecking');
		return false;
	}

	public set enableErrorChecking(toggle: boolean) {
		toggle = !!toggle;
		Debug.notImplemented('public flash.display3D.Context3D::set enableErrorChecking'); return;
		// this._enableErrorChecking = toggle;
	}

	public get maxBackBufferWidth(): number {
		return this._gl.getParameter(this._gl.MAX_VIEWPORT_DIMS);
	}

	public set maxBackBufferWidth(value: number) {
		Debug.notImplemented('public flash.display3D.Context3D::set maxBackBufferWidth');
	}

	public get maxBackBufferHeight(): number {
		return this._gl.getParameter(this._gl.MAX_VIEWPORT_DIMS);
	}

	public set maxBackBufferHeight(value: number) {
		Debug.notImplemented('public flash.display3D.Context3D::set maxBackBufferHeight');
	}

	public get profile(): string {
		return axCoerceString(this._profile);
	}

	public static get supportsVideoTexture(): boolean {
		Debug.notImplemented('public flash.display3D.Context3D::get driverInfo');
		return false;
	}

	public get totalGPUMemory(): number {
		Debug.notImplemented('public flash.display3D.Context3D::get totalGPUMemory');
		return 1024;
	}

	public dispose(): void {
		this._adaptee.context.dispose();
	}

	public configureBackBuffer(width: number, height: number, antiAlias: number, enableDepthAndStencil: boolean = true, wantsBestResolution: boolean = false, wantsBestResolutionOnBrowserZoom: boolean = false): void {
		this._adaptee.configureBackBuffer(width, height, antiAlias, enableDepthAndStencil);
	}

	public clear(red: number = 0.0, green: number = 0.0, blue: number = 0.0, alpha: number = 1.0, depth: number = 1.0, stencil: number = 0, mask: number = 0xffffffff): void {

		let awayMask: number = 0;
		if (mask & Context3DClearMask.COLOR)
			awayMask |= ContextGLClearMask.COLOR;
		if (mask & Context3DClearMask.DEPTH)
			awayMask |= ContextGLClearMask.DEPTH;
		if (mask & Context3DClearMask.STENCIL)
			awayMask |= ContextGLClearMask.STENCIL;

		this._adaptee.clear(red, green, blue, alpha, depth, stencil, awayMask);
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
		const awayData: Float32Array = new Float32Array(data.length);
		for (let i = 0; i < data.length; i++)
			awayData[i] = data.axGetNumericProperty(i);

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
		(this._adaptee.context as unknown as ContextWebGL).setVertexBufferAt(buffer ? index : -1, buffer ? (buffer._adaptee as unknown as VertexBufferWebGL) : null, bufferOffset * 4, awayFormat, false);

	}

	public setBlendFactors(sourceFactor: string, destinationFactor: string): void {
		let awaySourceFactor: ContextGLBlendFactor;
		switch (sourceFactor) {
			case Context3DBlendFactor.ONE:
				awaySourceFactor = ContextGLBlendFactor.ONE;
				break;
			case Context3DBlendFactor.ZERO:
				awaySourceFactor = ContextGLBlendFactor.ZERO;
				break;
			case Context3DBlendFactor.SOURCE_ALPHA:
				awaySourceFactor = ContextGLBlendFactor.SOURCE_ALPHA;
				break;
			case Context3DBlendFactor.SOURCE_COLOR:
				awaySourceFactor = ContextGLBlendFactor.SOURCE_COLOR;
				break;
			case Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA:
				awaySourceFactor = ContextGLBlendFactor.ONE_MINUS_SOURCE_ALPHA;
				break;
			case Context3DBlendFactor.ONE_MINUS_SOURCE_COLOR:
				awaySourceFactor = ContextGLBlendFactor.ONE_MINUS_SOURCE_COLOR;
				break;
			case Context3DBlendFactor.DESTINATION_ALPHA:
				awaySourceFactor = ContextGLBlendFactor.DESTINATION_ALPHA;
				break;
			case Context3DBlendFactor.DESTINATION_COLOR:
				awaySourceFactor = ContextGLBlendFactor.DESTINATION_COLOR;
				break;
			case Context3DBlendFactor.ONE_MINUS_DESTINATION_ALPHA:
				awaySourceFactor = ContextGLBlendFactor.ONE_MINUS_DESTINATION_ALPHA;
				break;
			case Context3DBlendFactor.ONE_MINUS_DESTINATION_COLOR:
				awaySourceFactor = ContextGLBlendFactor.ONE_MINUS_DESTINATION_COLOR;
				break;
			default:
				break;
		}

		let awayDestinationFactor: ContextGLBlendFactor;
		switch (destinationFactor) {
			case Context3DBlendFactor.ONE:
				awayDestinationFactor = ContextGLBlendFactor.ONE;
				break;
			case Context3DBlendFactor.ZERO:
				awayDestinationFactor = ContextGLBlendFactor.ZERO;
				break;
			case Context3DBlendFactor.SOURCE_ALPHA:
				awayDestinationFactor = ContextGLBlendFactor.SOURCE_ALPHA;
				break;
			case Context3DBlendFactor.SOURCE_COLOR:
				awayDestinationFactor = ContextGLBlendFactor.SOURCE_COLOR;
				break;
			case Context3DBlendFactor.ONE_MINUS_SOURCE_ALPHA:
				awayDestinationFactor = ContextGLBlendFactor.ONE_MINUS_SOURCE_ALPHA;
				break;
			case Context3DBlendFactor.ONE_MINUS_SOURCE_COLOR:
				awayDestinationFactor = ContextGLBlendFactor.ONE_MINUS_SOURCE_COLOR;
				break;
			case Context3DBlendFactor.DESTINATION_ALPHA:
				awayDestinationFactor = ContextGLBlendFactor.DESTINATION_ALPHA;
				break;
			case Context3DBlendFactor.DESTINATION_COLOR:
				awayDestinationFactor = ContextGLBlendFactor.DESTINATION_COLOR;
				break;
			case Context3DBlendFactor.ONE_MINUS_DESTINATION_ALPHA:
				awayDestinationFactor = ContextGLBlendFactor.ONE_MINUS_DESTINATION_ALPHA;
				break;
			case Context3DBlendFactor.ONE_MINUS_DESTINATION_COLOR:
				awayDestinationFactor = ContextGLBlendFactor.ONE_MINUS_DESTINATION_COLOR;
				break;
			default:
				break;
		}

		this._adaptee.context.setBlendFactors(awaySourceFactor, awayDestinationFactor);
	}

	public setColorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void {
		this._adaptee.context.setColorMask(red, green, blue, alpha);
	}

	public setDepthTest(depthMask: boolean, passCompareMode: string): void {
		let awayPassCompareMode: ContextGLCompareMode = ContextGLCompareMode.ALWAYS;
		switch (passCompareMode) {
			case Context3DCompareMode.ALWAYS:
				awayPassCompareMode = ContextGLCompareMode.ALWAYS;
				break;
			case Context3DCompareMode.NEVER:
				awayPassCompareMode = ContextGLCompareMode.NEVER;
				break;
			case Context3DCompareMode.LESS:
				awayPassCompareMode = ContextGLCompareMode.LESS;
				break;
			case Context3DCompareMode.LESS_EQUAL:
				awayPassCompareMode = ContextGLCompareMode.LESS_EQUAL;
				break;
			case Context3DCompareMode.EQUAL:
				awayPassCompareMode = ContextGLCompareMode.EQUAL;
				break;
			case Context3DCompareMode.GREATER_EQUAL:
				awayPassCompareMode = ContextGLCompareMode.GREATER_EQUAL;
				break;
			case Context3DCompareMode.GREATER:
				awayPassCompareMode = ContextGLCompareMode.GREATER;
				break;
			case Context3DCompareMode.NOT_EQUAL:
				awayPassCompareMode = ContextGLCompareMode.NOT_EQUAL;
				break;
			default:
				break;
		}
		this._adaptee.context.setDepthTest(depthMask, awayPassCompareMode);
	}

	public setCulling(triangleFaceToCull: string): void {
		let awayTriangleFaceToCull: ContextGLTriangleFace;
		switch (triangleFaceToCull) {
			case Context3DTriangleFace.NONE:
				awayTriangleFaceToCull = ContextGLTriangleFace.NONE;
			case Context3DTriangleFace.BACK:
				awayTriangleFaceToCull = ContextGLTriangleFace.BACK;
			case Context3DTriangleFace.FRONT:
				awayTriangleFaceToCull = ContextGLTriangleFace.FRONT;
			case Context3DTriangleFace.FRONT_AND_BACK:
				awayTriangleFaceToCull = ContextGLTriangleFace.FRONT_AND_BACK;
		}
		this._adaptee.context.setCulling(awayTriangleFaceToCull);
	}

	public setStencilActions(triangleFace: string = 'frontAndBack', compareMode: string = 'always', actionOnBothPass: string = 'keep', actionOnDepthFail: string = 'keep', actionOnDepthPassStencilFail: string = 'keep'): void {
		let awayTriangleFace: ContextGLTriangleFace = ContextGLTriangleFace.FRONT_AND_BACK;
		switch (triangleFace) {
			case Context3DTriangleFace.BACK:
				awayTriangleFace = ContextGLTriangleFace.BACK;
				break;
			case Context3DTriangleFace.FRONT:
				awayTriangleFace = ContextGLTriangleFace.FRONT;
				break;
			case Context3DTriangleFace.FRONT_AND_BACK:
				awayTriangleFace = ContextGLTriangleFace.FRONT_AND_BACK;
				break;
			case Context3DTriangleFace.NONE:
				awayTriangleFace = ContextGLTriangleFace.NONE;
				break;
			default:
				break;
		}

		let awayCompareMode: ContextGLCompareMode = ContextGLCompareMode.ALWAYS;
		switch (compareMode) {
			case Context3DCompareMode.ALWAYS:
				awayCompareMode = ContextGLCompareMode.ALWAYS;
				break;
			case Context3DCompareMode.NEVER:
				awayCompareMode = ContextGLCompareMode.NEVER;
				break;
			case Context3DCompareMode.LESS:
				awayCompareMode = ContextGLCompareMode.LESS;
				break;
			case Context3DCompareMode.LESS_EQUAL:
				awayCompareMode = ContextGLCompareMode.LESS_EQUAL;
				break;
			case Context3DCompareMode.EQUAL:
				awayCompareMode = ContextGLCompareMode.EQUAL;
				break;
			case Context3DCompareMode.GREATER_EQUAL:
				awayCompareMode = ContextGLCompareMode.GREATER_EQUAL;
				break;
			case Context3DCompareMode.GREATER:
				awayCompareMode = ContextGLCompareMode.GREATER;
				break;
			case Context3DCompareMode.NOT_EQUAL:
				awayCompareMode = ContextGLCompareMode.NOT_EQUAL;
				break;
			default:
				break;
		}

		let awayActionOnBothPass: ContextGLStencilAction = ContextGLStencilAction.KEEP;
		switch (actionOnBothPass) {
			case Context3DStencilAction.DECREMENT_SATURATE:
				awayActionOnBothPass = ContextGLStencilAction.DECREMENT_SATURATE;
				break;
			case Context3DStencilAction.DECREMENT_WRAP:
				awayActionOnBothPass = ContextGLStencilAction.DECREMENT_WRAP;
				break;
			case Context3DStencilAction.INCREMENT_SATURATE:
				awayActionOnBothPass = ContextGLStencilAction.INCREMENT_SATURATE;
				break;
			case Context3DStencilAction.INCREMENT_WRAP:
				awayActionOnBothPass = ContextGLStencilAction.INCREMENT_WRAP;
				break;
			case Context3DStencilAction.INVERT:
				awayActionOnBothPass = ContextGLStencilAction.INVERT;
				break;
			case Context3DStencilAction.KEEP:
				awayActionOnBothPass = ContextGLStencilAction.KEEP;
				break;
			case Context3DStencilAction.SET:
				awayActionOnBothPass = ContextGLStencilAction.SET;
				break;
			case Context3DStencilAction.ZERO:
				awayActionOnBothPass = ContextGLStencilAction.ZERO;
				break;
			default:
				break;
		}

		let awayActionOnDepthFail: ContextGLStencilAction = ContextGLStencilAction.KEEP;
		switch (actionOnDepthFail) {
			case Context3DStencilAction.DECREMENT_SATURATE:
				awayActionOnDepthFail = ContextGLStencilAction.DECREMENT_SATURATE;
				break;
			case Context3DStencilAction.DECREMENT_WRAP:
				awayActionOnDepthFail = ContextGLStencilAction.DECREMENT_WRAP;
				break;
			case Context3DStencilAction.INCREMENT_SATURATE:
				awayActionOnDepthFail = ContextGLStencilAction.INCREMENT_SATURATE;
				break;
			case Context3DStencilAction.INCREMENT_WRAP:
				awayActionOnDepthFail = ContextGLStencilAction.INCREMENT_WRAP;
				break;
			case Context3DStencilAction.INVERT:
				awayActionOnDepthFail = ContextGLStencilAction.INVERT;
				break;
			case Context3DStencilAction.KEEP:
				awayActionOnDepthFail = ContextGLStencilAction.KEEP;
				break;
			case Context3DStencilAction.SET:
				awayActionOnDepthFail = ContextGLStencilAction.SET;
				break;
			case Context3DStencilAction.ZERO:
				awayActionOnDepthFail = ContextGLStencilAction.ZERO;
				break;
			default:
				break;
		}

		let awayActionOnDepthPassStencilFail: ContextGLStencilAction = ContextGLStencilAction.KEEP;
		switch (actionOnDepthPassStencilFail) {
			case Context3DStencilAction.DECREMENT_SATURATE:
				awayActionOnDepthPassStencilFail = ContextGLStencilAction.DECREMENT_SATURATE;
				break;
			case Context3DStencilAction.DECREMENT_WRAP:
				awayActionOnDepthPassStencilFail = ContextGLStencilAction.DECREMENT_WRAP;
				break;
			case Context3DStencilAction.INCREMENT_SATURATE:
				awayActionOnDepthPassStencilFail = ContextGLStencilAction.INCREMENT_SATURATE;
				break;
			case Context3DStencilAction.INCREMENT_WRAP:
				awayActionOnDepthPassStencilFail = ContextGLStencilAction.INCREMENT_WRAP;
				break;
			case Context3DStencilAction.INVERT:
				awayActionOnDepthPassStencilFail = ContextGLStencilAction.INVERT;
				break;
			case Context3DStencilAction.KEEP:
				awayActionOnDepthPassStencilFail = ContextGLStencilAction.KEEP;
				break;
			case Context3DStencilAction.SET:
				awayActionOnDepthPassStencilFail = ContextGLStencilAction.SET;
				break;
			case Context3DStencilAction.ZERO:
				awayActionOnDepthPassStencilFail = ContextGLStencilAction.ZERO;
				break;
			default:
				break;
		}

		this._adaptee.context.setStencilActions(awayTriangleFace, awayCompareMode, awayActionOnBothPass, awayActionOnDepthFail, awayActionOnDepthPassStencilFail, CoordinateSystem.LEFT_HANDED);
	}

	public setStencilReferenceValue(referenceValue: number /*uint*/, readMask: number /*uint*/ = 255, writeMask: number /*uint*/ = 255): void {
		this._adaptee.context.setStencilReferenceValue(referenceValue, readMask, writeMask);
	}

	public setScissorRectangle(rectangle: Rectangle): void {
		this._adaptee.context.setScissorRectangle(rectangle ? rectangle.adaptee : null);
	}

	public createVertexBuffer(numVertices: number, data32PerVertex: number, bufferUsage: string = 'staticDraw'): VertexBuffer3D {
		console.log('createVertexBuffer');
		return new (this.sec as SecurityDomain).flash.display3D.VertexBuffer3D(this, numVertices, data32PerVertex);
	}

	public createIndexBuffer(numIndices: number, bufferUsage: string = 'staticDraw'): IndexBuffer3D {
		return new (this.sec as SecurityDomain).flash.display3D.IndexBuffer3D(this, numIndices);
	}

	public createTexture(width: number /*int*/, height: number /*int*/, format: string, optimizeForRenderToTexture: boolean, streamingLevels: number /*int*/ = 0): Texture {
		return new (this.sec as SecurityDomain).flash.display3D.textures.Texture(this, width, height, format, optimizeForRenderToTexture, streamingLevels);
	}

	public createRectangleTexture(width: number /*int*/, height: number /*int*/, format: string, optimizeForRenderToTexture: boolean): RectangleTexture {
		return new (this.sec as SecurityDomain).flash.display3D.textures.RectangleTexture(this, width, height, format, optimizeForRenderToTexture);
	}

	public createCubeTexture(size: number /*int*/, format: string, optimizeForRenderToTexture: boolean, streamingLevels: number /*int*/ = 0): CubeTexture /*CubeTexture*/ {
		return new (this.sec as SecurityDomain).flash.display3D.textures.CubeTexture(this, size, format, optimizeForRenderToTexture, streamingLevels);
	}

	public createProgram(): Program3D {
		return new (this.sec as SecurityDomain).flash.display3D.Program3D(this);
	}

	public drawToBitmapData(destination: BitmapData): void {
		this.adaptee.context.drawToBitmapImage2D(destination.adaptee as unknown as BitmapImage2D);
	}

	public setRenderToBackBuffer(): void {
		this._adaptee.context.setRenderToBackBuffer();
	}

	public setRenderToTexture(texture: TextureBase, targetType: number /*int*/, enableDepthAndStencil: boolean, antiAlias: number /*int*/, surfaceSelector: number /*int*/): void {
		this._adaptee.context.setRenderToTexture(texture._adaptee, enableDepthAndStencil, antiAlias, surfaceSelector);
	}

	public setTextureAt(sampler: number /*int*/, texture: TextureBase): void {
		if (texture)
			this._adaptee.context.setTextureAt(sampler, <TextureWebGL>texture._adaptee);
	}
}