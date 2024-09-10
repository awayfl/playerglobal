import { ContextWebGL, Stage as AwayStage, StageEvent } from '@awayjs/stage';
import { EventDispatcher } from "../events/EventDispatcher";

export class Context3D extends EventDispatcher {
        private _adaptee:AwayStage
        private _errorChecking:boolean

        constructor(awayStage:AwayStage, profile) {
            super()
            awayStage.addEventListener(StageEvent.CONTEXT_CREATED, function() {
                this._adaptee = awayStage }
            )}

        // Properties
        public get backBufferHeight():number {
            return this._adaptee.height
        }

        public set backBufferHeight(value:number) {
            this._adaptee.height = value
        }

        public get backBufferWidth():number {
            return this._adaptee.width
        }

        public set backBufferWidth(value:number) {
            this._adaptee.width = value
        }

        public get driverInfo():string {
            return ""
        }

        public get enableErrorChecking():boolean {
            return this._errorChecking
        }

        public set enableErrorChecking(value:boolean) {
            this._errorChecking = value
        }


        public get maxBackBufferHeight():number {
            return
        }

        public set maxBackBufferHeight(value:number) {
            
        }

        public get maxBackBufferWidth():number {
            return this._adaptee.width
        }

        public set maxBackBufferWidth(value:number) {
            
        }

        public get profile():string {
            return this.profile
        }

        public static get supportsVideoTexture():boolean {
            return false
        }

        public get totalGPUMemory():number{
            return 512
        }

        //Functions
        public clear(red:number = 0.0, green:number = 0.0, blue:number = 0.0, alpha:number = 1.0, depth:number = 1.0, stencil:number = 0, mask:number = 0xffffffff):void
        {
            console.log("Mask: " + mask)
            this._adaptee.clear(red, green, blue, alpha, depth, stencil, mask)
        }

        public configureBackBuffer(width:number, height:number, antiAlias:number, enableDepthAndStencil:boolean = true, wantsBestResolution:Boolean = false, wantsBestResolutionOnBrowserZoom:Boolean = false):void {
            this._adaptee.configureBackBuffer(width, height, antiAlias, enableDepthAndStencil)
        }

}