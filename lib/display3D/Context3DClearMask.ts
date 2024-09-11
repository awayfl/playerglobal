import { ASObject } from "@awayfl/avm2";

// Based on https://github.com/ruffle-rs/ruffle/blob/master/core/src/avm2/globals/flash/display3D/Context3DClearMask.as
export class Context3DClearMask extends ASObject {
    static classInitializer: any = null;
	static classSymbols = null; // [];
	static instanceSymbols = null;

     // Clear all buffers.
     public static ALL:number = Context3DClearMask.COLOR | Context3DClearMask.DEPTH | Context3DClearMask.STENCIL;

     // Clear only the color buffer.
     public static COLOR:number   = 1 << 0;

     // Clear only the depth buffer.
     public static DEPTH:number   = 1 << 1;

     // Clear only the stencil buffer.
     public static STENCIL:number = 1 << 2;

    constructor() {
        super();
    }
}