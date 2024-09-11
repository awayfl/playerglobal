import { ContextGLDrawMode, ContextGLProgramType, ContextGLVertexBufferFormat, ContextWebGL, ProgramWebGL, Stage as AwayStage, StageEvent } from '@awayjs/stage';
import { EventDispatcher } from '../events/EventDispatcher';
import { Context3DProgramType } from '../display3D/Context3DProgramType';
import { Context3DVertexBufferFormat } from '../display3D/Context3DVertexBufferFormat';
import { IndexBuffer3D } from '../display3D/IndexBuffer3D';
import { VertexBuffer3D } from '../display3D/VertexBuffer3D';
import { Program3D } from '../display3D/Program3D';
import { Matrix3D } from '../geom/Matrix3D';
import { Stage3D } from '../display/Stage3D';
import { Event } from '../events/Event';
import { SecurityDomain } from '../SecurityDomain';

export class Context3D extends EventDispatcher {
	private _adaptee: AwayStage
	private _gl: WebGLRenderingContext | WebGL2RenderingContext
	private _program: Program3D
	private _stage3D: Stage3D

	constructor(stage3D: Stage3D, awayStage: AwayStage, profile) {
		super();
		awayStage.addEventListener(StageEvent.CONTEXT_CREATED, this.onAwayContextCreated);
		this._stage3D = stage3D
	}

	private onAwayContextCreated(e: StageEvent) {
		this._adaptee = e.stage;
		this._adaptee.removeEventListener(StageEvent.CONTEXT_CREATED, this.onAwayContextCreated);
		this._gl = (this._adaptee.context as ContextWebGL)._gl;
		this._stage3D.dispatchEvent(new Event(Event.CONTEXT3D_CREATE))
		
	}

	public clear(red: number = 0.0, green: number = 0.0, blue: number = 0.0, alpha: number = 1.0, depth: number = 1.0, stencil: number = 0, mask: number = 0xffffffff): void {
		console.log('Mask: ' + mask);
		this._adaptee.clear(red, green, blue, alpha, depth, stencil, mask);
	}

	public configureBackBuffer(width: number, height: number, antiAlias: number, enableDepthAndStencil: boolean = true, wantsBestResolution: Boolean = false, wantsBestResolutionOnBrowserZoom: Boolean = false): void {
		this._adaptee.configureBackBuffer(width, height, antiAlias, enableDepthAndStencil);
	}

	public createIndexBuffer(numIndices: number, bufferUsage: string = 'staticDraw'): IndexBuffer3D {
		return new IndexBuffer3D(this._adaptee.context, numIndices);
	}

	public createProgram(): Program3D {
		return new Program3D(this._adaptee.context);
	}

	public createVertexBuffer(numVertices: number, data32PerVertex: number, bufferUsage: string = 'staticDraw'): VertexBuffer3D {
		return new VertexBuffer3D(this._adaptee.context, numVertices, data32PerVertex);
	}

	public drawTriangles(indexBuffer: IndexBuffer3D, firstIndex: number = 0, numTriangles: number = -1): void {
		if (numTriangles != -1) {
			var numIndices = numTriangles;
		} else {
			var numIndices = numTriangles * 3;
		}
		this._adaptee.context.drawIndices(ContextGLDrawMode.TRIANGLES, indexBuffer._adaptee, firstIndex, numIndices);
	}

	public present(): void {
		this._adaptee.present();
	}

	public setProgram(program: Program3D): void {
		this._program = program;
		this._adaptee.context.setProgram(program._adaptee);
	}

	public setProgramConstantsFromMatrix(programType: string, firstRegister: number, matrix: Matrix3D, transposedMatrix: boolean = false): void {
		switch (programType) {
			case Context3DProgramType.FRAGMENT:
				var awayProgramType = ContextGLProgramType.FRAGMENT;
				break;
			case Context3DProgramType.VERTEX:
				var awayProgramType = ContextGLProgramType.VERTEX;
				break;
			default:
				break;
		}
		const programWebGL: ProgramWebGL = this._program._adaptee as ProgramWebGL;
		let matrixRawData: Float32Array;
		matrix.adaptee.copyRawDataTo(matrixRawData, 0, false);
		programWebGL.uniformMatrix4fv(awayProgramType, transposedMatrix, matrixRawData);
	}

	public setVertexBufferAt(index: number, buffer: VertexBuffer3D, bufferOffset: number = 0, format: String = 'float4'): void {
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

}