import { BitmapData } from './../display/BitmapData';
import { ByteArray } from './../utils/ByteArray';
export class Texture {

	// todo. can probably route directly to awayjs class

	public static fromBitmapData(bitmapData: BitmapData): Texture {
		console.warn('[playerglobal/display3D/Texture] - fromBitmapData not implemented');
		return null;
	}

	constructor () {
	}

	public uploadCompressedTextureFromByteArray (data: ByteArray, byteArrayOffset: number, async: boolean = false) {
		console.warn('[playerglobal/display3D/Texture] - uploadCompressedTextureFromByteArray not implemented');

	}

	public uploadFromBitmapData (source: BitmapData, miplevel: number = 0) {
		console.warn('[playerglobal/display3D/Texture] - uploadFromBitmapData not implemented');

	}

	public uploadFromByteArray (data: ByteArray, byteArrayOffset: number, miplevel: number = 0) {
		console.warn('[playerglobal/display3D/Texture] - uploadFromByteArray not implemented');

	}
}
