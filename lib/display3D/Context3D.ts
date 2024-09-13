import { ContextGLDrawMode, ContextGLProfile, ContextGLProgramType, ContextGLVertexBufferFormat, 
		 ContextWebGL, ProgramWebGL, Stage as AwayStage, StageEvent } from '@awayjs/stage';
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

import { AXClass, Float64Vector } from '@awayfl/avm2';
import { AVMStage, Debug } from '@awayfl/swf-loader';
import { SecurityDomain } from '../SecurityDomain';

export class Context3D extends EventDispatcher {
	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string[] = null; // [];
	private _adaptee: AwayStage
	private _renderMode: string
	private _profile: string
	private _gl: WebGLRenderingContext | WebGL2RenderingContext
	private _program: Program3D
	private _stage3D: Stage3D

	constructor(id: number, stage3D: Stage3D, renderMode: string = 'auto', profile: string = 'baseline') {
		super()
		console.log('Context3D Create');
		this._renderMode = renderMode
		this._profile = profile
		this._stage3D = stage3D
		this._adaptee = stage3D.adaptee
		console.log(stage3D);
	}

	public get adaptee():AwayStage {
		return this._adaptee
	}

	private _onAwayContextCreatedDelegate(e: StageEvent): void {
		console.log(e.stage);
		this._adaptee = e.stage;
		this._gl = (this._adaptee.context as ContextWebGL)._gl;
		//this._stage3D.dispatchEvent(new (this.sec as SecurityDomain).flash.events.Event(Event.CONTEXT3D_CREATE))
		console.log('Context Created');

	}

	public get driverInfo(): string {
		Debug.notImplemented('public flash.display3D.Context3D::get driverInfo'); return;
		// return this._driverInfo;
	}

	public get enableErrorChecking(): boolean {
		Debug.notImplemented('public flash.display3D.Context3D::get enableErrorChecking'); return;
		// return this._enableErrorChecking;
	}

	public set enableErrorChecking(toggle: boolean) {
		toggle = !!toggle;
		Debug.notImplemented('public flash.display3D.Context3D::set enableErrorChecking'); return;
		// this._enableErrorChecking = toggle;
	}

	public dispose(): void {
		Debug.notImplemented('public flash.display3D.Context3D::dispose'); return;
	}

	public configureBackBuffer(width: number, height: number, antiAlias: number, enableDepthAndStencil: boolean = true, wantsBestResolution: Boolean = false, wantsBestResolutionOnBrowserZoom: Boolean = false): void {
		this._adaptee.configureBackBuffer(width, height, antiAlias, enableDepthAndStencil);
		console.log('configureBackBuffer')
	}

	public clear(red: number = 0.0, green: number = 0.0, blue: number = 0.0, alpha: number = 1.0, depth: number = 1.0, stencil: number = 0, mask: number = 0xffffffff): void {
		console.log('clear');
		this._adaptee.clear(red, green, blue, alpha, depth, stencil, mask);
	}

	public drawTriangles(indexBuffer: IndexBuffer3D, firstIndex: number = 0, numTriangles: number = -1): void {
		console.log("drawTriangles")
		if (numTriangles != -1) {
			var numIndices = numTriangles;
		} else {
			var numIndices = numTriangles * 3;
		}
		this._adaptee.context.drawIndices(ContextGLDrawMode.TRIANGLES, indexBuffer._adaptee, firstIndex, numIndices);
	}

	public present(): void {
		console.log('present')
		this._adaptee.present();
	}

	public setProgram(program: Program3D): void {
		console.log('setProgram')
		this._program = program;
		this._adaptee.context.setProgram(program._adaptee);
	}

	public setProgramConstantsFromVector(programType: string, firstRegister: number /*int*/, data: Float64Vector, numRegisters: number /*int*/ = -1): void {
		Debug.notImplemented('public flash.display3D.Context3D::setProgramConstantsFromVector'); return;
	}

	public setProgramConstantsFromMatrix(programType: string, firstRegister: number, matrix: Matrix3D, transposedMatrix: boolean = false): void {
		console.log('setProgramConstantsFromMatrix')
		let awayProgramType:ContextGLProgramType
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
		const programWebGL: ProgramWebGL = this._program._adaptee as ProgramWebGL;
		let matrixRawData: Float32Array = new Float32Array();
		matrix.adaptee.copyRawDataTo(matrixRawData, 0, false);
		programWebGL.uniformMatrix4fv(awayProgramType, transposedMatrix, matrixRawData);
	}

	public setProgramConstantsFromByteArray(programType: string, firstRegister: number /*int*/, numRegisters: number /*int*/, data: ByteArray, byteArrayOffset: number /*uint*/): void {
		Debug.notImplemented('public flash.display3D.Context3D::setProgramConstantsFromByteArray'); return;
	}

	public setVertexBufferAt(index: number, buffer: VertexBuffer3D, bufferOffset: number = 0, format: String = 'float4'): void {
		console.log("setVertexBufferAt")
		switch (format) {
			case Context3DVertexBufferFormat.BYTES_4:
				var awayFormat = ContextGLVertexBufferFormat.BYTE_4;
				break;
			case Context3DVertexBufferFormat.FLOAT_1:
				var awayFormat = ContextGLVertexBufferFormat.FLOAT_1;
				break;
			case Context3DVertexBufferFormat.FLOAT_2:
				var awayFormat = ContextGLVertexBufferFormat.FLOAT_2;
				break;
			case Context3DVertexBufferFormat.FLOAT_3:
				var awayFormat = ContextGLVertexBufferFormat.FLOAT_3;
				break;
			case Context3DVertexBufferFormat.FLOAT_4:
				var awayFormat = ContextGLVertexBufferFormat.FLOAT_4;
				break;
			default:
				break;
		}
		this._adaptee.context.setVertexBufferAt(index, buffer._adaptee, bufferOffset, awayFormat);
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
		console.log("createVertexBuffer")
		return new (this.sec as SecurityDomain).flash.display3D.VertexBuffer3D(this, numVertices, data32PerVertex);
	}

	public createIndexBuffer(numIndices: number, bufferUsage: string = 'staticDraw'): IndexBuffer3D {
		console.log("createIndexBuffer")
		return new (this.sec as SecurityDomain).flash.display3D.IndexBuffer3D(this, numIndices);
	}

	public createTexture(width: number /*int*/, height: number /*int*/, format: string, optimizeForRenderToTexture: boolean, streamingLevels: number /*int*/ = 0): any {
		Debug.notImplemented('public flash.display3D.Context3D::createTexture'); return;
	}

	public createCubeTexture(size: number /*int*/, format: string, optimizeForRenderToTexture: boolean, streamingLevels: number /*int*/ = 0): any /*CubeTexture*/ {
		Debug.notImplemented('public flash.display3D.Context3D::createCubeTexture'); return;
	}

	public createProgram(): Program3D {
		console.log("createProgram")
		return new (this.sec as SecurityDomain).flash.display3D.Program3D(this);
	}

	public drawToBitmapData(destination: BitmapData): void {
		Debug.notImplemented('public flash.display3D.Context3D::drawToBitmapData'); return;
	}

	public setRenderToTextureInternal(textureTextureBase, targetType: number /*int*/, enableDepthAndStencil: boolean, antiAlias: number /*int*/, surfaceSelector: number /*int*/): void {
		Debug.notImplemented('public flash.display3D.Context3D::setRenderToTextureInternal'); return;
	}

	public setTextureInternal(sampler: number /*int*/, textureTexture): void {
		Debug.notImplemented('public flash.display3D.Context3D::setTextureInternal'); return;
	}

	public setCubeTextureInternal(sampler: number /*int*/, textureCubeTexture): void {
		Debug.notImplemented('public flash.display3D.Context3D::setCubeTextureInternal'); return;
	}

}