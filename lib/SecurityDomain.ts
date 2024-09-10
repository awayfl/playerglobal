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
import { EventDispatcher } from './events/EventDispatcher';
import { DisplayObject } from './display/DisplayObject';
import { DisplayObjectContainer } from './display/DisplayObjectContainer';
import { Stage } from './display/Stage';
import { Stage3D } from './display/Stage3D';
import { Loader } from './display/Loader';
import { LoaderInfo } from './display/LoaderInfo';
import { MovieClip } from './display/MovieClip';
import { Graphics } from './display/Graphics';
import { Bitmap } from './display/Bitmap';
import { BitmapData } from './display/BitmapData';
import { SimpleButton } from './display/SimpleButton';
import { TextField } from './text/TextField';
import { Point } from './geom/Point';
import { Event } from './events/Event';
import { KeyboardEvent } from './events/KeyboardEvent';
import { MouseEvent } from './events/MouseEvent';
import { TouchEvent } from './events/TouchEvent';
import { ProgressEvent } from './events/ProgressEvent';
import { Rectangle } from './geom/Rectangle';
import { Matrix } from './geom/Matrix';
import { ColorTransform } from './geom/ColorTransform';
import { Transform } from './geom/Transform';
import { URLRequest } from './net/URLRequest';
import { URLLoader } from './net/URLLoader';
import { URLVariables } from './net/URLVariables';
import { SharedObject } from './net/SharedObject';
import { LoaderContext } from './system/LoaderContext';
import { Sound } from './media/Sound';
import { TextFormat } from './text/TextFormat';
import { AXSecurityDomain, ByteArray, XMLNode } from '@awayfl/avm2';
import { Sprite } from './display/Sprite';
import { ApplicationDomain } from './system/ApplicationDomain';
import { TextSnapshot } from './text/TextSnapshot';
import { ExternalInterface } from './external/ExternalInterface';
import { Capabilities } from './system/Capabilities';
import { Security } from './system/Security';
import { fscommand } from './system/FSCommand';
import { SoundChannel } from './media/SoundChannel';
import { SoundTransform } from './media/SoundTransform';
import { SoundMixer } from './media/SoundMixer';
import { IOErrorEvent } from './events/IOErrorEvent';
import { Vector3D } from './geom/Vector3D';
import { Matrix3D } from './geom/Matrix3D';
import { Shape } from './display/Shape';
import { TimerEvent } from './events/TimerEvent';
import { GlowFilter } from './filters/GlowFilter';
import { BevelFilter } from './filters/BevelFilter';
import { BitmapFilter } from './filters/BitmapFilter';
import { BlurFilter } from './filters/BlurFilter';
import { ColorMatrixFilter } from './filters/ColorMatrixFilter';
import { ConvolutionFilter } from './filters/ConvolutionFilter';
import { DisplacementMapFilter } from './filters/DisplacementMapFilter';
import { DropShadowFilter } from './filters/DropShadowFilter';
import { GradientBevelFilter } from './filters/GradientBevelFilter';
import { GradientGlowFilter } from './filters/GradientGlowFilter';
import { ContextMenuBuiltInItems } from './ui/ContextMenuBuiltInItems';
import { ContextMenu } from './ui/ContextMenu';
import { ContextMenuItem } from './ui/ContextMenuItem';
import { FrameLabel } from './display/FrameLabel';
import { TextLineMetrics } from './text/TextLineMetrics';
import { FocusEvent } from './events/FocusEvent';

export class Mouse {}

export class SecurityDomain extends AXSecurityDomain {
	public flash = {
		display: {
			EventDispatcher: EventDispatcher,
			DisplayObject: DisplayObject,
			DisplayObjectContainer: DisplayObjectContainer,
			Stage: Stage,
			Stage3D: Stage3D,
			Loader: Loader,
			LoaderInfo: LoaderInfo,
			MovieClip: MovieClip,
			Graphics: Graphics,
			Bitmap: Bitmap,
			BitmapData: BitmapData,
			SimpleButton: SimpleButton,
			Sprite: Sprite,
			Shape: Shape,
			FrameLabel: FrameLabel
		},
		events: {
			EventDispatcher: EventDispatcher,
			Event: Event,
			FocusEvent: FocusEvent,
			KeyboardEvent: KeyboardEvent,
			MouseEvent: MouseEvent,
			TouchEvent: TouchEvent,
			ProgressEvent: ProgressEvent,
			IOErrorEvent: IOErrorEvent,
			TimerEvent:TimerEvent,
		},
		external: {
			ExternalInterface: ExternalInterface
		},
		filters: {
			BevelFilter: BevelFilter,
			BitmapFilter: BitmapFilter,
			BlurFilter: BlurFilter,
			ColorMatrixFilter: ColorMatrixFilter,
			ConvolutionFilter: ConvolutionFilter,
			DisplacementMapFilter: DisplacementMapFilter,
			DropShadowFilter: DropShadowFilter,
			GlowFilter: GlowFilter,
			GradientBevelFilter: GradientBevelFilter,
			GradientGlowFilter: GradientGlowFilter,
		},
		text: {
			TextField: TextField,
			TextFormat: TextFormat,
			TextSnapshot: TextSnapshot,
			TextLineMetrics: TextLineMetrics,
		},
		geom: {
			Point: Point,
			Rectangle: Rectangle,
			Matrix: Matrix,
			ColorTransform: ColorTransform,
			Transform: Transform,
			Vector3D: Vector3D,
			Matrix3D: Matrix3D
		},
		net: {
			URLRequest: URLRequest,
			URLLoader: URLLoader,
			URLVariables: URLVariables,
			SharedObject: SharedObject
		},
		system: {
			ApplicationDomain: ApplicationDomain,
			Capabilities: Capabilities,
			LoaderContext: LoaderContext,
			Security: Security,
			fscommand: fscommand
		},
		ui: {
			ContextMenu: ContextMenu,
			ContextMenuItem: ContextMenuItem,
			ContextMenuBuiltInItems: ContextMenuBuiltInItems,
			Mouse: Mouse
		},
		utils: {
			ByteArray: ByteArray
		},
		media: {
			Sound: Sound,
			SoundChannel: SoundChannel,
			SoundTransform: SoundTransform,
			SoundMixer: SoundMixer
		},
		xml: {
			XMLDocument: XMLDocument,
			XMLNode: XMLNode
		}
	};
	//public player: any;//80pro Shumway.Player.Player;
	//public application: AXApplicationDomain;
}
