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

import { ASObject } from '@awayfl/avm2';

// Class: Context3DBlendFactor
export class Context3DBlendFactor extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	constructor () {
		super();
	}

	// JS -> AS Bindings
	public static ONE: string = 'one';
	public static ZERO: string = 'zero';
	public static SOURCE_ALPHA: string = 'sourceAlpha';
	public static SOURCE_COLOR: string = 'sourceColor';
	public static ONE_MINUS_SOURCE_ALPHA: string = 'oneMinusSourceAlpha';
	public static ONE_MINUS_SOURCE_COLOR: string = 'oneMinusSourceColor';
	public static DESTINATION_ALPHA: string = 'destinationAlpha';
	public static DESTINATION_COLOR: string = 'destinationColor';
	public static ONE_MINUS_DESTINATION_ALPHA: string = 'oneMinusDestinationAlpha';
	public static ONE_MINUS_DESTINATION_COLOR: string = 'oneMinusDestinationColor';

	// AS -> JS Bindings

}
