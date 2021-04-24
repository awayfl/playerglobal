import { ASObject } from '@awayfl/avm2';

export class CompressionAlgorithm extends ASObject {
	static $BgDEFLATE: string = 'deflate';
	static $BgLZMA: string = 'lzma';
	static $BgZLIB: string = 'zlib'
}