import { Debug } from "@awayfl/swf-loader";
import { ContextGLTextureFormat, TextureWebGL } from "@awayjs/stage";
import { Context3D } from "../Context3D";
import { BitmapData } from "./../../display/BitmapData";
import { ByteArray } from "./../../utils/ByteArray";
import { TextureBase } from "./TextureBase";
export class Texture extends TextureBase {
	constructor(
		context: Context3D,
		width: number,
		height: number,
		format: string,
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
		this._adaptee = context.adaptee.context.createTexture(
			width,
			height,
			awayTextureFormat,
			optimizeForRenderToTexture
		) as TextureWebGL;
	}

	public uploadCompressedTextureFromByteArray(data: ByteArray, byteArrayOffset: number, async: boolean = false) {
		Debug.notImplemented("public flash.display3D.textures.Texture::uploadCompressedTextureFromByteArray");
	}

	public uploadFromBitmapData(source: BitmapData, miplevel: number = 0) {
		(<TextureWebGL>this._adaptee).uploadFromArray(new Uint8Array(source.adaptee.getDataInternal()), miplevel);
	}

	public uploadFromByteArray(data: ByteArray, byteArrayOffset: number, miplevel: number = 0) {
		(<TextureWebGL>this._adaptee).uploadFromArray(new Uint8Array(data.arraybytes), miplevel);
	}
}
