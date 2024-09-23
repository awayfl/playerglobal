/**
 * Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Class: CubeTexture
import { Debug } from "@awayfl/swf-loader";
import { ContextGLTextureFormat, CubeTextureWebGL, TextureWebGL } from "@awayjs/stage";
import { Context3D } from "../Context3D";
import { BitmapData } from "./../../display/BitmapData";
import { ByteArray } from "./../../utils/ByteArray";
import { TextureBase } from "./TextureBase";

export class CubeTexture extends TextureBase {
	// Called whenever the class is initialized.
	static classInitializer: any = null;

	constructor(
		context: Context3D,
		size: number,
		format: String,
		optimizeForRenderToTexture: boolean,
		streamingLevels: number = 0
	) {
		super();
		let awayTextureFormat: ContextGLTextureFormat;
		switch (format) {
			case "bgra":
				awayTextureFormat = ContextGLTextureFormat.BGRA;
				break;
			case "compressed":
				awayTextureFormat = ContextGLTextureFormat.COMPRESSED;
				break;
			case "compressedAlpha":
				awayTextureFormat = ContextGLTextureFormat.COMPRESSED_ALPHA;
				break;
		}
		this._adaptee = context.adaptee.context.createCubeTexture(
			size,
			awayTextureFormat,
			optimizeForRenderToTexture,
			streamingLevels
		) as CubeTextureWebGL;
	}

	public uploadFromBitmapData(source: BitmapData, side: number /*uint*/, miplevel: number /*uint*/ = 0): void {
		(<CubeTextureWebGL>this._adaptee).uploadFromArray(new Uint8Array(source.adaptee.getDataInternal()), side, miplevel)
	}

	uploadFromByteArray(data: ByteArray,byteArrayOffset: number /*uint*/,side: number /*uint*/,miplevel: number /*uint*/ = 0
	): void {
		data.position = byteArrayOffset;
		(<CubeTextureWebGL>this._adaptee).uploadFromArray(new Uint8Array(data.arraybytes), side, miplevel)
	}

	uploadCompressedTextureFromByteArray(data: ByteArray,byteArrayOffset: number /*uint*/,async: boolean = false
	): void {
		data = data;
		byteArrayOffset = byteArrayOffset >>> 0;
		async = !!async;
		Debug.notImplemented("public flash.display3D.textures.CubeTexture::uploadCompressedTextureFromByteArray");
		return;
	}
}
