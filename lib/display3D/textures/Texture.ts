import { Debug } from '@awayfl/swf-loader';
import { TextureWebGL } from '@awayjs/stage';
import { BitmapData } from './../../display/BitmapData';
import { ByteArray } from './../../utils/ByteArray';
import { TextureBase } from './TextureBase';
export class Texture extends TextureBase {
	public _adaptee: TextureWebGL;

	constructor() {
		super()
		Debug.notImplemented('public flash.display3D.textures.Texture::Texture'); return;
		
		
	}

	public uploadCompressedTextureFromByteArray (data: ByteArray, byteArrayOffset: number, async: boolean = false) {
		Debug.notImplemented('public flash.display3D.textures.Texture::uploadCompressedTextureFromByteArray');

	}

	public uploadFromBitmapData (source: BitmapData, miplevel: number = 0) {
		Debug.notImplemented('public flash.display3D.textures.Texture::uploadFromBitmapData');

	}

	public uploadFromByteArray (data: ByteArray, byteArrayOffset: number, miplevel: number = 0) {
		Debug.notImplemented('public flash.display3D.textures.Texture::uploadFromByteArray');

	}
}
