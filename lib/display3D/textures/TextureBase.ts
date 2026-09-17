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

import { Debug } from '@awayfl/swf-loader';
import { CubeTextureWebGL, TextureBaseWebGL, TextureWebGL } from '@awayjs/stage';
import { EventDispatcher } from '../../events/EventDispatcher';
import { CubeTexture } from './CubeTexture';
import { Texture } from './Texture';

export class TextureBase extends EventDispatcher {

	// Called whenever the class is initialized.
	static classInitializer: any = null;
	public _adaptee: TextureBaseWebGL;
	constructor () {
		super();
	}

	public dispose(): void {
		this._adaptee.dispose();
	}
}
