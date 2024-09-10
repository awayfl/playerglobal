import { ContextGLDrawMode, ContextGLVertexBufferFormat, Stage as AwayStage, StageEvent } from '@awayjs/stage';
import { EventDispatcher } from "../events/EventDispatcher";
import { Context3DVertexBufferFormat } from "../display3D/Context3DVertexBufferFormat"
import { IndexBuffer3D } from "../display3D/IndexBuffer3D"
import { VertexBuffer3D } from "../display3D/VertexBuffer3D"
import { Program3D } from "../display3D/Program3D"
import { Matrix3D } from "../geom/Matrix3D"


export class Context3D extends EventDispatcher {
        private _adaptee:AwayStage

        constructor(awayStage:AwayStage, profile) {
            super()
            awayStage.addEventListener(StageEvent.CONTEXT_CREATED, 
                function() {
                    this._adaptee = awayStage
                }
            )}

        public clear(red:number = 0.0, green:number = 0.0, blue:number = 0.0, alpha:number = 1.0, depth:number = 1.0, stencil:number = 0, mask:number = 0xffffffff):void
        {
            console.log("Mask: " + mask)
            this._adaptee.clear(red, green, blue, alpha, depth, stencil, mask)
        }

        public configureBackBuffer(width:number, height:number, antiAlias:number, enableDepthAndStencil:boolean = true, wantsBestResolution:Boolean = false, wantsBestResolutionOnBrowserZoom:Boolean = false):void {
            this._adaptee.configureBackBuffer(width, height, antiAlias, enableDepthAndStencil)
        }

        public createIndexBuffer(numIndices:number, bufferUsage:string = "staticDraw"):IndexBuffer3D {
            return new IndexBuffer3D(this._adaptee.context, numIndices)
        }

        public createProgram():Program3D{
            return new Program3D(this._adaptee.context)
        }

        public createVertexBuffer(numVertices:number, data32PerVertex:number, bufferUsage:string = "staticDraw"):VertexBuffer3D {
            return new VertexBuffer3D(this._adaptee.context, numVertices, data32PerVertex)
        }

        public drawTriangles(indexBuffer:IndexBuffer3D, firstIndex:number = 0, numTriangles:number = -1):void {
            if (numTriangles != -1){
                var numIndices = numTriangles
            } else {
                var numIndices = numTriangles*3
            }
            this._adaptee.context.drawIndices(ContextGLDrawMode.TRIANGLES, indexBuffer._adaptee, firstIndex, numIndices)
        }

        public present():void{
            this._adaptee.present()
        }

        public setProgram(program:Program3D):void{
            this._adaptee.context.setProgram(program._adaptee)
        }

        public setProgramConstantsFromMatrix(programType:string, firstRegister:number, matrix:Matrix3D, transposedMatrix:boolean = false):void {
            //TODO: Figure out how to use ContextGL's setProgramConstantsFromArray with a Matrix3D
        }

        public setVertexBufferAt(index:number, buffer:VertexBuffer3D, bufferOffset:number = 0, format:String = "float4"):void{
            switch(format) {
                case Context3DVertexBufferFormat.BYTES_4:
                    var awayFormat = ContextGLVertexBufferFormat.BYTE_4
                    break;
                case Context3DVertexBufferFormat.FLOAT_1:
                    var awayFormat = ContextGLVertexBufferFormat.FLOAT_1
                    break;
                case Context3DVertexBufferFormat.FLOAT_2:
                    var awayFormat = ContextGLVertexBufferFormat.FLOAT_2
                    break;
                case Context3DVertexBufferFormat.FLOAT_3:
                    var awayFormat = ContextGLVertexBufferFormat.FLOAT_3
                    break;
                case Context3DVertexBufferFormat.FLOAT_4:
                    var awayFormat = ContextGLVertexBufferFormat.FLOAT_4
                    break;
            }
            this._adaptee.context.setVertexBufferAt(index, buffer._adaptee, bufferOffset, awayFormat)
        }

}