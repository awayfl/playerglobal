export class RegisterCode {}

import { TextureAtlasParser, ImageCubeParser, Image2DParser } from '@awayjs/stage';
import { Loader, WaveAudioParser } from '@awayjs/core';

//enable parsers
Loader.enableParser(WaveAudioParser);
Loader.enableParser(Image2DParser);
Loader.enableParser(ImageCubeParser);
Loader.enableParser(TextureAtlasParser);