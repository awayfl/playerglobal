export class RegisterCode {}

import { TextureAtlasParser, ImageCubeParser, Image2DParser } from '@awayjs/stage';
import { Loader, WaveAudioParser } from '@awayjs/core';

//enable parsers
Loader.enableParser(WaveAudioParser);
Loader.enableParser(Image2DParser);
Loader.enableParser(ImageCubeParser);
Loader.enableParser(TextureAtlasParser);

//register view nodes
/*
PartitionBase.registerAbstraction(CameraNode, Camera);
PartitionBase.registerAbstraction(EntityNode, Sprite);
PartitionBase.registerAbstraction(EntityNode, DisplayObjectContainer);
PartitionBase.registerAbstraction(EntityNode, Scene);
PartitionBase.registerAbstraction(EntityNode, MorphSprite);
PartitionBase.registerAbstraction(EntityNode, MovieClip);
PartitionBase.registerAbstraction(EntityNode, Billboard);
PartitionBase.registerAbstraction(EntityNode, LineSegment);
PartitionBase.registerAbstraction(EntityNode, TextField);
PartitionBase.registerAbstraction(SkyboxNode, Skybox);
*/