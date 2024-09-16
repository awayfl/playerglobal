
//import { AccessibilityProperties } from './accessibility/AccessibilityProperties';
//import { Accessibility } from './accessibility/Accessibility';
//import { AccessibilityImplementation } from './accessibility/AccessibilityImplementation';

import { Clipboard } from './desktop/Clipboard';
import { ClipboardFormats } from './desktop/ClipboardFormats';
//import { ClipboardTransferMode } from './_shumway_flash/desktop/ClipboardTransferMode';

import { Bitmap } from './display/Bitmap';
import { BitmapData } from './display/BitmapData';
import { BitmapDataChannel } from './display/BitmapDataChannel';
//import { ColorCorrection } from './display/ColorCorrection';
import { DisplayObject } from './display/DisplayObject';
import { DisplayObjectContainer } from './display/DisplayObjectContainer';
import { FrameLabel } from './display/FrameLabel';
import { Graphics } from './display/Graphics';
import { InteractiveObject } from './display/InteractiveObject';
import { Loader } from './display/Loader';
import { LoaderInfo } from './display/LoaderInfo';
import { MovieClip } from './display/MovieClip';
import { NativeMenuItem } from './display/NativeMenuItem';
import { Scene } from './display/Scene';
import { Shape } from './display/Shape';
import { SimpleButton } from './display/SimpleButton';
import { Sprite } from './display/Sprite';
import { Stage } from './display/Stage';
import { Stage3D } from './display/Stage3D';

import { Context3D } from './display3D/Context3D';
import { Context3DBlendFactor } from './display3D/Context3DBlendFactor';
import { Context3DClearMask } from './display3D/Context3DClearMask';
import { Context3DCompareMode } from './display3D/Context3DCompareMode';
import { Context3DProfile } from './display3D/Context3DProfile';
import { Context3DProgramType } from './display3D/Context3DProgramType';
import { Context3DRenderMode } from './display3D/Context3DRenderMode';
import { Context3DStencilAction } from './display3D/Context3DStencilAction';
import { Context3DTextureFormat } from './display3D/Context3DTextureFormat';
import { Context3DTriangleFace } from './display3D/Context3DTriangleFace';
import { Context3DVertexBufferFormat } from './display3D/Context3DVertexBufferFormat';
import { IndexBuffer3D } from './display3D/IndexBuffer3D';
import { Program3D } from './display3D/Program3D';
import { VertexBuffer3D } from './display3D/VertexBuffer3D';

import { CubeTexture } from './display3D/textures/CubeTexture';
import { Texture } from './display3D/textures/Texture';
import { TextureBase } from './display3D/textures/TextureBase';

import { EOFError } from './errors/EOFError';
import { IllegalOperationError } from './errors/IllegalOperationError';
import { InvalidSWFError } from './errors/InvalidSWFError';
import { IOError } from './errors/IOError';
import { MemoryError } from './errors/MemoryError';
import { ScriptTimeoutError } from './errors/ScriptTimeoutError';
import { StackOverflowError } from './errors/StackOverflowError';

import { ColorTransform } from './geom/ColorTransform';
import { Matrix } from './geom/Matrix';
import { Matrix3D } from './geom/Matrix3D';
import { Point } from './geom/Point';
import { Rectangle } from './geom/Rectangle';
import { Transform } from './geom/Transform';
import { Vector3D } from './geom/Vector3D';

import { LocaleID } from './globalization/LocaleID';

import { AccelerometerEvent } from './events/AccelerometerEvent';
import { ActivityEvent } from './events/ActivityEvent';
import { AsyncErrorEvent } from './events/AsyncErrorEvent';
import { ContextMenuEvent } from './events/ContextMenuEvent';
import { DataEvent } from './events/DataEvent';
import { ErrorEvent } from './events/ErrorEvent';
import { Event } from './events/Event';
import { EventDispatcher } from './events/EventDispatcher';
import { EventPhase } from './events/EventPhase';
import { FocusEvent } from './events/FocusEvent';
import { FullScreenEvent } from './events/FullScreenEvent';
import { GameInputEvent } from './events/GameInputEvent';
import { GeolocationEvent } from './events/GeolocationEvent';
import { GestureEvent } from './events/GestureEvent';
import { GesturePhase } from './events/GesturePhase';
import { HTTPStatusEvent } from './events/HTTPStatusEvent';
import { IMEEvent } from './events/IMEEvent';
import { IOErrorEvent } from './events/IOErrorEvent';
import { KeyboardEvent } from './events/KeyboardEvent';
import { MouseEvent } from './events/MouseEvent';
import { NetDataEvent } from './events/NetDataEvent';
import { NetStatusEvent } from './events/NetStatusEvent';
import { OutputProgressEvent } from './events/OutputProgressEvent';
import { PressAndTapGestureEvent } from './events/PressAndTapGestureEvent';
import { ProgressEvent } from './events/ProgressEvent';
import { SampleDataEvent } from './events/SampleDataEvent';
import { ShaderEvent } from './events/ShaderEvent';
import { SoftKeyboardEvent } from './events/SoftKeyboardEvent';
import { SoftKeyboardTrigger } from './events/SoftKeyboardTrigger';
import { StageVideoAvailabilityEvent } from './events/StageVideoAvailabilityEvent';
import { StageVideoEvent } from './events/StageVideoEvent';
import { StatusEvent } from './events/StatusEvent';
import { SyncEvent } from './events/SyncEvent';
import { TextEvent } from './events/TextEvent';
import { ThrottleEvent } from './events/ThrottleEvent';
import { ThrottleType } from './events/ThrottleType';
import { TimerEvent } from './events/TimerEvent';
import { TouchEvent } from './events/TouchEvent';
import { TransformGestureEvent } from './events/TransformGestureEvent';
import { UncaughtErrorEvent } from './events/UncaughtErrorEvent';
import { UncaughtErrorEvents } from './events/UncaughtErrorEvents';
import { VideoEvent } from './events/VideoEvent';

import { ExternalInterface } from './external/ExternalInterface';

import { BevelFilter } from './filters/BevelFilter';
import { BitmapFilter } from './filters/BitmapFilter';
import { BlurFilter } from './filters/BlurFilter';
import { ColorMatrixFilter } from './filters/ColorMatrixFilter';
import { ConvolutionFilter } from './filters/ConvolutionFilter';
import { DisplacementMapFilter } from './filters/DisplacementMapFilter';
import { DropShadowFilter } from './filters/DropShadowFilter';
import { GlowFilter } from './filters/GlowFilter';
import { GradientBevelFilter } from './filters/GradientBevelFilter';
import { GradientGlowFilter } from './filters/GradientGlowFilter';

import { NumberFormatter } from './globalization/NumberFormatter';

import { Sound } from './media/Sound';
import { SoundChannel } from './media/SoundChannel';
import { SoundMixer } from './media/SoundMixer';
import { SoundTransform } from './media/SoundTransform';

import { FileFilter } from './net/FileFilter';
import { FileReference } from './net/FileReference';
import { LocalConnection } from './net/LocalConnection';
import { SharedObject } from './net/SharedObject';
import { URLLoader } from './net/URLLoader';
import { URLRequest } from './net/URLRequest';
import { URLVariables } from './net/URLVariables';

import { ApplicationDomain } from './system/ApplicationDomain';
import { Capabilities } from './system/Capabilities';
import { fscommand } from './system/FSCommand';
import { LoaderContext } from './system/LoaderContext';
import { Security } from './system/Security';
import { SecurityDomain } from './system/SecurityDomain';
import { System } from './system/System';

import { CSMSettings } from './text/CSMSettings';
import { Font } from './text/Font';
import { FontType } from './text/FontType';
import { StaticText } from './text/StaticText';
import { StyleSheet } from './text/StyleSheet';
import { TextColorType } from './text/TextColorType';
import { TextDisplayMode } from './text/TextDisplayMode';
import { TextExtent } from './text/TextExtent';
import { TextField } from './text/TextField';
import { TextFormat } from './text/TextFormat';
import { TextFormatDisplay } from './text/TextFormatDisplay';
import { TextLineMetrics } from './text/TextLineMetrics';
import { TextRenderer } from './text/TextRenderer';
import { TextRun } from './text/TextRun';
import { TextSnapshot } from './text/TextSnapshot';

import { CompositionAttributeRange } from './text/ime/CompositionAttributeRange';
//import { IIMEClient } from './text/ime/IIMEClient';

import { BreakOpportunity } from './text/engine/BreakOpportunity';
import { CFFHinting } from './text/engine/CFFHinting';
import { ContentElement } from './text/engine/ContentElement';
import { DigitCase } from './text/engine/DigitCase';
import { DigitWidth } from './text/engine/DigitWidth';
import { EastAsianJustifier } from './text/engine/EastAsianJustifier';
import { ElementFormat } from './text/engine/ElementFormat';
import { FontDescription } from './text/engine/FontDescription';
import { FontLookup } from './text/engine/FontLookup';
import { FontMetrics } from './text/engine/FontMetrics';
import { FontPosture } from './text/engine/FontPosture';
import { FontWeight } from './text/engine/FontWeight';
import { GraphicElement } from './text/engine/GraphicElement';
import { JustificationStyle } from './text/engine/JustificationStyle';
import { Kerning } from './text/engine/Kerning';
import { LigatureLevel } from './text/engine/LigatureLevel';
import { LineJustification } from './text/engine/LineJustification';
import { RenderingMode } from './text/engine/RenderingMode';
import { SpaceJustifier } from './text/engine/SpaceJustifier';
import { TabAlignment } from './text/engine/TabAlignment';
import { TabStop } from './text/engine/TabStop';
import { TextBaseline } from './text/engine/TextBaseline';
import { TextBlock } from './text/engine/TextBlock';
import { TextElement } from './text/engine/TextElement';
import { TextJustifier } from './text/engine/TextJustifier';
import { TextLine } from './text/engine/TextLine';
import { TextLineCreationResult } from './text/engine/TextLineCreationResult';
import { TextLineMirrorRegion } from './text/engine/TextLineMirrorRegion';
import { TextLineValidity } from './text/engine/TextLineValidity';
import { TextRotation } from './text/engine/TextRotation';
import { TypographicCase } from './text/engine/TypographicCase';

import { ASClass, ByteArray, registerNativeClass, registerNativeFunction, XMLDocument, XMLNode } from '@awayfl/avm2';
import { release } from '@awayfl/swf-loader';
import { BlendMode } from '@awayjs/stage';
import { GroupElement } from './text/engine/GroupElement';
import { ContextMenu } from './ui/ContextMenu';
import { ContextMenuBuiltInItems } from './ui/ContextMenuBuiltInItems';
import { ContextMenuClipboardItems } from './ui/ContextMenuClipboardItems';
import { ContextMenuItem } from './ui/ContextMenuItem';
import { GameInput } from './ui/GameInput';
import { GameInputControl } from './ui/GameInputControl';
import { GameInputControlType } from './ui/GameInputControlType';
import { GameInputDevice } from './ui/GameInputDevice';
import { GameInputFinger } from './ui/GameInputFinger';
import { GameInputHand } from './ui/GameInputHand';
import { Keyboard } from './ui/Keyboard';
import { Mouse } from './ui/Mouse';
import { Multitouch } from './ui/Multitouch';
import { MultitouchInputMode } from './ui/MultitouchInputMode';
import { CompressionAlgorithm } from './utils/CompressionAlgorithm';
import { Timer } from './utils/Timer';

import { BaseTextLayoutImporter, Property } from './text/engine/NativehacksForTLF';

function M(name: string, asClass: ASClass) {
	registerNativeClass(name, asClass);
}

export function initLink() {
	release || console.log('init link');

	//M('fl.text.TLFTextField', TLFTextField);
	M('flashx.textLayout.conversion.BaseTextLayoutImporter', BaseTextLayoutImporter);
	M('flashx.textLayout.property.Property', Property);

	//M('flash.accessibility.Accessibility', Accessibility);
	//M('flash.accessibility.AccessibilityProperties', AccessibilityProperties);
	//M('flash.accessibility.AccessibilityImplementation', AccessibilityImplementation);

	// flash.concurrent
	// flash.crypto
	// flash.data

	M('flash.desktop.Clipboard', Clipboard);
	M('flash.desktop.ClipboardFormats', ClipboardFormats);
	//M('flash.desktop.ClipboardTransferMode', ClipboardTransferMode);

	//M('flash.display.ActionScriptVersion', ActionScriptVersion);
	//M('flash.display.AVM1Movie', AVM1Movie);
	M('flash.display.Bitmap', Bitmap);
	M('flash.display.BitmapData', BitmapData);
	M('flash.display.BitmapDataChannel', BitmapDataChannel);
	//M('flash.display.BitmapEncodingColorSpace', BitmapEncodingColorSpace);
	M('flash.display.BlendMode', <any>BlendMode);
	//M('flash.display.CapsStyle', CapsStyle);
	//M('flash.display.ColorCorrection', ColorCorrection);
	//M('flash.display.ColorCorrectionSupport', ColorCorrectionSupport);
	M('flash.display.DisplayObject', DisplayObject);
	M('flash.display.DisplayObjectContainer', DisplayObjectContainer);
	//M('flash.display.FocusDirection', FocusDirection);//AIR
	M('flash.display.FrameLabel', FrameLabel);
	//M('flash.display.GradientType', GradientType);
	M('flash.display.Graphics', Graphics);
	//M('flash.display.GraphicsBitmapFill', GraphicsBitmapFill);
	//M('flash.display.GraphicsEndFill', GraphicsEndFill);
	//M('flash.display.GraphicsGradientFill', GraphicsGradientFill);
	//M('flash.display.GraphicsPath', GraphicsPath);
	//M('flash.display.GraphicsPathCommand', GraphicsPathCommand);
	//M('flash.display.GraphicsPathWinding', GraphicsPathWinding);
	//M('flash.display.GraphicsShaderFill', GraphicsShaderFill);
	//M('flash.display.GraphicsSolidFill', GraphicsSolidFill);
	//M('flash.display.GraphicsStroke', GraphicsStroke);
	//M('flash.display.GraphicsTrianglePath', GraphicsTrianglePath);
	M('flash.display.InteractiveObject', InteractiveObject);
	//M('flash.display.InterpolationMethod', InterpolationMethod);
	//M('flash.display.JointStyle', JointStyle);
	//M('flash.display.JPEGEncoderOptions', JPEGEncoderOptions);
	//M('flash.display.JPEGXREncoderOptions', JPEGXREncoderOptions);
	//M('flash.display.LineScaleMode', LineScaleMode);
	M('flash.display.Loader', Loader);
	M('flash.display.LoaderInfo', LoaderInfo);
	//M('flash.display.MorphShape', MorphShape);
	M('flash.display.MovieClip', MovieClip);
	//M('flash.display.NativeMenu', NativeMenu);//AIR
	M('flash.display.NativeMenuItem', NativeMenuItem);//AIR
	//M('flash.display.NativeWindow', NativeWindow);//AIR
	//M('flash.display.NativeWindowDisplayState', NativeWindowDisplayState);//AIR
	//M('flash.display.NativeWindowInitOptions', NativeWindowInitOptions);//AIR
	//M('flash.display.NativeWindowRenderMode', NativeWindowRenderMode);//AIR
	//M('flash.display.NativeWindowResize', NativeWindowResize);//AIR
	//M('flash.display.NativeWindowSystemChrome', NativeWindowSystemChrome);//AIR
	//M('flash.display.NativeWindowType', NativeWindowType);//AIR
	//M('flash.display.PixelSnapping', PixelSnapping);
	//M('flash.display.PNGEncoderOptions', PNGEncoderOptions);
	M('flash.display.Scene', Scene);
	//M('flash.display.Screen', Screen);//AIR
	//M('flash.display.ScreenMode', ScreenMode);//AIR
	//M('flash.display.Shader', Shader);
	//M('flash.display.ShaderData', ShaderData);
	//M('flash.display.ShaderInput', ShaderInput);
	//M('flash.display.ShaderJob', ShaderJob);
	//M('flash.display.ShaderParameter', ShaderParameter);
	//M('flash.display.ShaderParameterType', ShaderParameterType);
	//M('flash.display.ShaderPrecision', ShaderPrecision);
	M('flash.display.Shape', Shape);
	M('flash.display.SimpleButton', SimpleButton);
	//M('flash.display.SpreadMethod', SpreadMethod);
	M('flash.display.Sprite', Sprite);
	M('flash.display.Stage', Stage);
	M('flash.display.Stage3D', Stage3D);

	//M('flash.display.StageAlign', StageAlign);
	//M('flash.display.StageAspectRatio', StageAspectRatio);//AIR
	//M('flash.display.StageDisplayState', StageDisplayState);
	//M('flash.display.StageOrientation', StageOrientation);
	//M('flash.display.StageScaleMode', StageScaleMode);
	//M('flash.display.TriangleCulling', TriangleCulling);

	// TODO: Add display3d stuff

	M('flash.display3D.Context3D', Context3D);
	M('flash.display3D.Context3DBlendFactor', Context3DBlendFactor);
	M('flash.display3D.Context3DClearMask', Context3DClearMask);
	M('flash.display3D.Context3DCompareMode', Context3DCompareMode);
	M('flash.display3D.Context3DProfile', Context3DProfile);
	M('flash.display3D.Context3DProgramType', Context3DProgramType);
	M('flash.display3D.Context3DRenderMode', Context3DRenderMode);
	M('flash.display3D.Context3DStencilAction', Context3DStencilAction);
	M('flash.display3D.Context3DTextureFormat', Context3DTextureFormat);
	M('flash.display3D.Context3DTriangleFace', Context3DTriangleFace);
	M('flash.display3D.Context3DVertexBufferFormat', Context3DVertexBufferFormat);
	M('flash.display3D.IndexBuffer3D', IndexBuffer3D);
	M('flash.display3D.Program3D', Program3D);
	M('flash.display3D.VertexBuffer3D', VertexBuffer3D);

	M('flash.display3D.textures.TextureBase', TextureBase);
	M('flash.display3D.textures.Texture', Texture);
	M('flash.display3D.textures.CubeTexture', CubeTexture);

	//M('flash.errors.DRMManagerError', DRMManagerError);//AIR
	M('flash.errors.EOFError', EOFError);
	M('flash.errors.IllegalOperationError', IllegalOperationError);
	M('flash.errors.InvalidSWFError', InvalidSWFError);
	M('flash.errors.IOError', IOError);
	M('flash.errors.MemoryError', MemoryError);
	//M('flash.errors.PermissionError', PermissionError);//AIR
	M('flash.errors.ScriptTimeoutError', ScriptTimeoutError);
	//M('flash.errors.SQLError', SQLError);//AIR
	//M('flash.errors.SQLErrorOpperation', SQLErrorOpperation);//AIR
	M('flash.errors.StackOverflowError', StackOverflowError);

	M('flash.events.AccelerometerEvent', AccelerometerEvent);
	M('flash.events.ActivityEvent', ActivityEvent);
	M('flash.events.AsyncErrorEvent', AsyncErrorEvent);
	//M('flash.events.AudioOutputChangeEvent', AudioOutputChangeEvent);
	//M('flash.events.AVDictionaryDataEvent', AVDictionaryDataEvent);
	//M('flash.events.AVHTTPStatusEvent', AVHTTPStatusEvent);
	//M('flash.events.AVPauseAtPeriodEvent', AVPauseAtPeriodEvent);
	//M('flash.events.BrowserInvokeEvent', BrowserInvokeEvent); //AIR
	M('flash.events.ContextMenuEvent', ContextMenuEvent);
	M('flash.events.DataEvent', DataEvent);
	//M('flash.events.DatagramSocketDataEvent', DatagramSocketDataEvent);//AIR
	//M('flash.events.DeviceRotationEvent', DeviceRotationEvent);//AIR
	//M('flash.events.DNSResolveEvent', DNSResolveEvent);//AIR
	//M('flash.events.DRMAuthentificateEvent', DRMAuthentificateEvent);//AIR
	//M('flash.events.DRMAuthentificationCompleteEvent', DRMAuthentificationCompleteEvent);
	//M('flash.events.DRMAuthentificationErrorEvent', DRMAuthentificationErrorEvent);
	//M('flash.events.DRMDeviceGroupErrorEvent', DRMDeviceGroupErrorEvent);
	//M('flash.events.DRMDeviceGroupEvent', DRMDeviceGroupEvent);
	//M('flash.events.DRMErrorEvent', DRMErrorEvent);
	//M('flash.events.DRMLicenseRequestEvent', DRMLicenseRequestEvent);
	//M('flash.events.DRMMetadataEvent', DRMMetadataEvent);
	//M('flash.events.DRMReturnVoucherCompleteEvent', DRMReturnVoucherCompleteEvent);
	//M('flash.events.DRMReturnVoucherErrorEvent', DRMReturnVoucherErrorEvent);
	//M('flash.events.DRMStatusEvent', DRMStatusEvent);
	M('flash.events.ErrorEvent', ErrorEvent);
	M('flash.events.Event', Event);
	M('flash.events.EventDispatcher', EventDispatcher);
	M('flash.events.EventPhase', EventPhase);
	//M('flash.events.FileListEvent', FileListEvent);//AIR
	M('flash.events.FocusEvent', FocusEvent);
	M('flash.events.FullScreenEvent', FullScreenEvent);
	M('flash.events.GameInputEvent', GameInputEvent);//AIR
	M('flash.events.GeolocationEvent', GeolocationEvent);//AIR
	M('flash.events.GestureEvent', GestureEvent);
	M('flash.events.GesturePhase', GesturePhase);
	//M('flash.events.HTMLUncaughtScriptExceptionEvent', HTMLUncaughtScriptExceptionEvent);
	M('flash.events.HTTPStatusEvent', HTTPStatusEvent);
	M('flash.events.IMEEvent', IMEEvent);
	//M('flash.events.InvokeEvent', InvokeEvent);//AIR
	M('flash.events.IOErrorEvent', IOErrorEvent);
	M('flash.events.KeyboardEvent', KeyboardEvent);
	//M('flash.events.LocationChangedEvent', LocationChangedEvent);//AIR
	//M('flash.events.MediaEvent', MediaEvent);//AIR
	M('flash.events.MouseEvent', MouseEvent);
	//M('flash.events.NativeDragEvent', NativeDragEvent);//AIR
	//M('flash.events.NativeProcessExitEvent', NativeProcessExitEvent);//AIR
	//M('flash.events.NativeWindowBoundsEvent', NativeWindowBoundsEvent);//AIR
	//M('flash.events.NativeWindowDisplayStateEvent', Nativ
	M('flash.events.NetDataEvent', NetDataEvent);//AIR
	//M('flash.events.NetMonitorEvent', NetMonitorEvent);
	M('flash.events.NetStatusEvent', NetStatusEvent);
	M('flash.events.OutputProgressEvent', OutputProgressEvent);//AIR
	//M('flash.events.PermissionEvent', PermissionEvent);
	M('flash.events.PressAndTabGestureEvent', PressAndTapGestureEvent);
	M('flash.events.ProgressEvent', ProgressEvent);
	//M('flash.events.RemoteNotificationEvent', RemoteNotificationEvent);//AIR
	M('flash.events.SampleDataEvent', SampleDataEvent);
	//M('flash.events.ScreenMouseEvent', ScreenMouseEvent);//AIR
	//M('flash.events.SecurityErrorEvent', SecurityErrorEvent);
	//M('flash.events.ServerSocketConnectEvent', ServerSocketConnectEvent);//AIR
	M('flash.events.ShaderEvent', ShaderEvent);
	M('flash.events.SoftKeyboardEvent', SoftKeyboardEvent);
	M('flash.events.SoftKeyboardTrigger', SoftKeyboardTrigger);
	//M('flash.events.SQLEvent', SQLEvent);//AIR
	//M('flash.events.SQLUpdateEvent', SQLUpdateEvent);//AIR
	//M('flash.events.StageOrientationEvent', StageOrientationEvent);//AIR
	M('flash.events.StageVideoAvailabilityEvent', StageVideoAvailabilityEvent);
	M('flash.events.StageVideoEvent', StageVideoEvent);
	M('flash.events.StatusEvent', StatusEvent);
	//M('flash.events.StorageVolumeChangeEvent', StorageVolumeChangeEvent);//AIR
	M('flash.events.SyncEvent', SyncEvent);
	M('flash.events.TextEvent', TextEvent);
	M('flash.events.ThrottleEvent', ThrottleEvent);
	M('flash.events.ThrottleType', ThrottleType);
	M('flash.events.TimerEvent', TimerEvent);
	M('flash.events.TouchEvent', TouchEvent);
	//M('flash.events.TouchEventIntent', TouchEventIntent);//AIR
	M('flash.events.TransformGestureEvent', TransformGestureEvent);
	M('flash.events.UncaughtErrorEvent', UncaughtErrorEvent);
	M('flash.events.UncaughtErrorEvents', UncaughtErrorEvents);
	M('flash.events.VideoEvent', VideoEvent);
	//M('flash.events.VideoTextureEvent', VideoTextureEvent);
	//M('flash.events.VsyncStateChangeAvailabilityEvent', VsyncStateChangeAvailabilityEvent);//AIR

	//M('flash.external.ExtensionContext', ExtensionContext);//AIR
	M('flash.external.ExternalInterface', ExternalInterface);

	// flash.filesystem

	M('flash.filters.BevelFilter', BevelFilter);
	M('flash.filters.BitmapFilter', BitmapFilter);
	//M('flash.filters.BitmapFilterQuality', BitmapFilterQuality);
	//M('flash.filters.BitmapFilterType', BitmapFilterType);
	M('flash.filters.BlurFilter', BlurFilter);
	M('flash.filters.ColorMatrixFilter', ColorMatrixFilter);
	M('flash.filters.ConvolutionFilter', ConvolutionFilter);
	M('flash.filters.DisplacementMapFilter', DisplacementMapFilter);
	//M('flash.filters.DisplacementMapFilterMode', DisplacementMapFilterMode);
	M('flash.filters.DropShadowFilter', DropShadowFilter);
	M('flash.filters.GlowFilter', GlowFilter);
	M('flash.filters.GradientBevelFilter', GradientBevelFilter);
	M('flash.filters.GradientGlowFilter', GradientGlowFilter);
	//M('flash.filters.ShaderFilter', ShaderFilter);

	M('flash.geom.ColorTransform', ColorTransform);
	M('flash.geom.Matrix', Matrix);
	M('flash.geom.Matrix3D', Matrix3D);
	//M('flash.geom.Orientation3D', Orientation3D);
	//M('flash.geom.PerspectiveProjection', PerspectiveProjection);
	M('flash.geom.Point', Point);
	M('flash.geom.Rectangle', Rectangle);
	M('flash.geom.Transform', Transform);
	//M('flash.geom.Utils3D', Utils3D);
	M('flash.geom.Vector3D', Vector3D);

	//M('flash.globalization.Collator', Collator);
	//M('flash.globalization.CollatorMode', CollatorMode);
	//M('flash.globalization.CurrencyFormatter', CurrencyFormatter);
	//M('flash.globalization.CurrencyParseResult', CurrencyParseResult);
	//M('flash.globalization.DateTimeFormatter', DateTimeFormatter);
	//M('flash.globalization.DateTimeNameContext', DateTimeNameContext);
	//M('flash.globalization.DateTimeNameStyle', DateTimeNameStyle);
	//M('flash.globalization.DateTimeStyle', DateTimeStyle);
	//M('flash.globalization.LastOperationStatus', LastOperationStatus);
	M('flash.globalization.LocaleID', LocaleID);
	//M('flash.globalization.NationalDigitsType', NationalDigitsType);
	M('flash.globalization.NumberFormatter', NumberFormatter);
	//M('flash.globalization.NumberParseResult', NumberParseResult);
	//M('flash.globalization.StringTools', StringTools);

	// flash.html

	//M('flash.media.AudioDecoder', AudioDecoder);
	//M('flash.media.AudioDeviceManager', AudioDeviceManager);
	//M('flash.media.AudioOutputChangeReason', AudioOutputChangeReason);
	//M('flash.media.AudioPlaybackMode', AudioPlaybackMode);//AIR
	//M('flash.media.AVNetworkingParams', AVNetworkingParams);
	//M('flash.media.AVTagData', AVTagData);
	//M('flash.media.AVURLLoader', AVURLLoader);
	//M('flash.media.AVURLStream', AVURLStream);
	//M('flash.media.Camera', Camera);
	//M('flash.media.CameraPosition', CameraPosition);//AIR
	//M('flash.media.CameraRoll', CameraRoll);//AIR
	//M('flash.media.CameraRollBrowseOptions', CameraRollBrowseOptions);//AIR
	//M('flash.media.CameraUI', CameraUI);//AIR
	//M('flash.media.H264Level', H264Level);
	//M('flash.media.H264Profile', H264Profile);
	//M('flash.media.H264VideoStreamSettings', H264VideoStreamSettings);
	//M('flash.media.ID3Info', ID3Info);
	//M('flash.media.MediaPromise', MediaPromise);//AIR
	//M('flash.media.MediaType', MediaType);//AIR
	//M('flash.media.Microphone', Microphone);
	//M('flash.media.MicrophoneEnhancedMode', MicrophoneEnhancedMode);
	//M('flash.media.MicrophoneEnhancedOptions', MicrophoneEnhancedOptions);
	M('flash.media.Sound', Sound);
	M('flash.media.SoundChannel', SoundChannel);
	//M('flash.media.SoundCodec', SoundCodec);
	//M('flash.media.SoundloaderContext', SoundloaderContext);
	M('flash.media.SoundMixer', SoundMixer);
	M('flash.media.SoundTransform', SoundTransform);
	//M('flash.media.StageVideo', StageVideo);
	//M('flash.media.StageVideoAvailability', StageVideoAvailability);
	//M('flash.media.StageVideoAvailabilityReason', StageVideoAvailabilityReason);
	//M('flash.media.StageWebView', StageWebView);//AIR
	//M('flash.media.Video', Video);
	//M('flash.media.VideoCodec', VideoCodec);
	//M('flash.media.VideoStatus', VideoStatus);
	//M('flash.media.VideoStreamSettings', VideoStreamSettings);

	//M('flash.net.DatagramSocket', FileFilter);//AIR
	M('flash.net.FileFilter', FileFilter);
	M('flash.net.FileReference', FileReference);
	//M('flash.net.FileReferenceList', FileReferenceList);
	//M('flash.net.GroupSpecifier', GroupSpecifier);
	//M('flash.net.InterfaceAddress', InterfaceAddress);
	//M('flash.net.IPVersion', IPVersion);//AIR
	M('flash.net.LocalConnection', LocalConnection);
	//M('flash.net.NetConnection', NetConnection);
	//M('flash.net.NetGroup', NetGroup);
	//M('flash.net.NetGroupInfo', NetGroupInfo);
	//M('flash.net.NetGroupRecieveMode', NetGroupRecieveMode);
	//M('flash.net.NetGroupReplicationStrategy', NetGroupReplicationStrategy);
	//M('flash.net.NetMonitor', NetMonitor);
	//M('flash.net.NetStream', NetStream);
	//M('flash.net.NetStreamAppendBytesAction', NetStreamAppendBytesAction);
	//M('flash.net.NetStreamInfo', NetStreamInfo);
	//M('flash.net.NetStreamMulticastInfo', NetStreamMulticastInfo);
	//M('flash.net.NetStreamPlayOptions', NetStreamPlayOptions);
	//M('flash.net.NetStreamPlayTransitions', NetStreamPlayTransitions);
	//M('flash.net.NetworkInfo', NetworkInfo);//AIR
	//M('flash.net.NetworkInterface', NetworkInterface);//AIR
	//M('flash.net.ObjectEncoding', ObjectEncoding);
	//M('flash.net.Responder', Responder);
	//M('flash.net.SecureSocket', SecureSocket);
	//M('flash.net.ServerSocket', ServerSocket);//AIR
	M('flash.net.SharedObject', SharedObject);
	//M('flash.net.SharedObjectFlushStatus', SharedObjectFlushStatus);
	//M('flash.net.Socket', Socket);
	M('flash.net.URLLoader', URLLoader);
	//M('flash.net.URLLoader', URLLoaderDataFormat);
	M('flash.net.URLRequest', URLRequest);
	//M('flash.net.URLRequestDefaults', URLRequestDefaults);//AIR
	//M('flash.net.URLRequestHeader', URLRequestHeader);
	//M('flash.net.URLRequestMethod', URLRequestMethod);
	//M('flash.net.URLStream', URLStream);
	M('flash.net.URLVariables', URLVariables);
	//M('flash.net.XMLSocket', XMLSocket);

	// flash.net.dns
	// flash.net.drm
	// flash.notifications
	// flash.permissions
	// flash.printing
	// flash.profiler
	// flash.sampler

	//M('flash.security.CertificateStatus', CertificateStatus);
	//M('flash.security.ReferencesValidationSetting', ReferencesValidationSetting);//AIR
	//M('flash.security.RevocationCheckSettings', RevocationCheckSettings);//AIR
	//M('flash.security.SignatureStatus', SignatureStatus);//AIR
	//M('flash.security.SignerTrustSettings', SignerTrustSettings);//AIR
	//M('flash.security.X500DistinguishedName', X500DistinguishedName);
	//M('flash.security.X509Certificate', X509Certificate);//AIR
	//M('flash.security.XMLSignatureValidator', XMLSignatureValidator);

	//M('flash.sensors.Accelerometer', Accelerometer);
	//M('flash.sensors.DeviceRotation', DeviceRotation);//AIR
	//M('flash.sensors.Geolocation', Geolocation);//AIR

	M('flash.system.ApplicationDomain', ApplicationDomain);
	M('flash.system.Capabilities', Capabilities);
	//M('flash.system.ImageDecodingPolicy', ImageDecodingPolicy);//AIR
	//M('flash.system.IME', IME);
	//M('flash.system.IMEConversionMode', IMEConversionMode);
	//M('flash.system.JPEGLoaderContext', JPEGLoaderContext);
	M('flash.system.LoaderContext', LoaderContext);
	//M('flash.system.MessageChannel', MessageChannel);
	//M('flash.system.MessageChannelState', MessageChannelState);
	M('flash.system.Security', Security);
	M('flash.system.SecurityDomain', SecurityDomain);
	//M('flash.system.SecurityPanel', SecurityPanel);
	M('flash.system.System', System);
	//M('flash.system.SystemUpdater', SystemUpdater);
	//M('flash.system.SystemUpdaterType', SystemUpdaterType);
	//M('flash.system.TouchscreenType', TouchscreenType);
	//M('flash.system.Worker', Worker);
	//M('flash.system.WorkerDomain', WorkerDomain);
	//M('flash.system.WorkerState', WorkerState);

	//M('flash.text.AntiAliasType', AntiAliasType);
	//M('flash.text.AutoCapitalize', AutoCapitalize);//AIR
	M('flash.text.CSMSettings', CSMSettings);
	M('flash.text.Font', Font);
	//M('flash.text.FontStyle', FontStyle);
	M('flash.text.FontType', FontType);
	//M('flash.text.GridFitType', GridFitType);
	//M('flash.text.ReturnKeyLabel', ReturnKeyLabel);//AIR
	//M('flash.text.SoftKeyboardType', SoftKeyboardType);//AIR
	//M('flash.text.StageText', StageText);//AIR
	//M('flash.text.StageTextClearButtonMode', StageTextClearButtonMode);//AIR
	//M('flash.text.StageTextInitOptions', StageTextInitOptions);//AIR
	M('flash.text.StaticText', StaticText);
	M('flash.text.StyleSheet', StyleSheet);
	M('flash.text.TextColorType', TextColorType);
	M('flash.text.TextDisplayMode', TextDisplayMode);
	M('flash.text.TextField', TextField);
	//M('flash.text.TextFieldAutoSize', TextFieldAutoSize);
	//M('flash.text.TextFieldType', TextFieldType);
	M('flash.text.TextFormat', TextFormat);
	//M('flash.text.TextFormatAlign', TextFormatAlign);
	//M('flash.text.TextInteractionMode', TextInteractionMode);
	M('flash.text.TextLineMetrics', TextLineMetrics);
	M('flash.text.TextRenderer', TextRenderer);
	M('flash.text.TextSnapshot', TextSnapshot);

	// these are not in the as3 documentation for flash.text:
	M('flash.text.TextFormatDisplay', TextFormatDisplay);
	M('flash.text.TextExtent', TextExtent);
	M('flash.text.TextRun', TextRun);

	M('flash.text.engine.BreakOpportunity', BreakOpportunity);
	M('flash.text.engine.CFFHinting', CFFHinting);
	M('flash.text.engine.ContentElement', ContentElement);
	M('flash.text.engine.DigitCase', DigitCase);
	M('flash.text.engine.DigitWidth', DigitWidth);
	M('flash.text.engine.EastAsianJustifier', EastAsianJustifier);
	M('flash.text.engine.ElementFormat', ElementFormat);
	M('flash.text.engine.FontDescription', FontDescription);
	M('flash.text.engine.FontLookup', FontLookup);
	M('flash.text.engine.FontMetrics', FontMetrics);
	M('flash.text.engine.FontMetrics', FontMetrics);
	M('flash.text.engine.FontPosture', FontPosture);
	M('flash.text.engine.FontWeight', FontWeight);
	M('flash.text.engine.GraphicElement', GraphicElement);
	M('flash.text.engine.GroupElement', GroupElement);
	M('flash.text.engine.JustificationStyle', JustificationStyle);
	M('flash.text.engine.Kerning', Kerning);
	M('flash.text.engine.LigatureLevel', LigatureLevel);
	M('flash.text.engine.LineJustification', LineJustification);
	M('flash.text.engine.RenderingMode', RenderingMode);
	M('flash.text.engine.SpaceJustifier', SpaceJustifier);
	M('flash.text.engine.TabAlignment', TabAlignment);
	M('flash.text.engine.TabStop', TabStop);
	M('flash.text.engine.TextBaseline', TextBaseline);
	M('flash.text.engine.TextBlock', TextBlock);
	M('flash.text.engine.TextElement', TextElement);
	M('flash.text.engine.TextJustifier', TextJustifier);
	M('flash.text.engine.TextLine', TextLine);
	M('flash.text.engine.TextLineCreationResult', TextLineCreationResult);
	M('flash.text.engine.TextLineMirrorRegion', TextLineMirrorRegion);
	M('flash.text.engine.TextLineValidity', TextLineValidity);
	M('flash.text.engine.TextRotation', TextRotation);
	M('flash.text.engine.TypographicCase', TypographicCase);

	M('flash.text.ime.CompositionAttributeRange', CompositionAttributeRange);

	M('flash.ui.ContextMenu', ContextMenu);
	M('flash.ui.ContextMenuBuiltInItems', ContextMenuBuiltInItems);
	M('flash.ui.ContextMenuClipboardItems', ContextMenuClipboardItems);
	M('flash.ui.ContextMenuItem', ContextMenuItem);
	M('flash.ui.GameInput', GameInput);//AIR
	M('flash.ui.GameInputControl', GameInputControl);//AIR
	M('flash.ui.GameInputControlType', GameInputControlType);//AIR
	M('flash.ui.GameInputDevice', GameInputDevice);//AIR
	M('flash.ui.GameInputFinger', GameInputFinger);//AIR
	M('flash.ui.GameInputHand', GameInputHand);//AIR
	M('flash.ui.Keyboard', Keyboard);
	//M('flash.ui.KeyboardType', KeyboardType);
	//M('flash.ui.KeyLocation', KeyLocation);
	M('flash.ui.Mouse', Mouse);
	//M('flash.ui.MouseCursor', MouseCursor);
	//M('flash.ui.MouseCursorData', MouseCursorData);
	M('flash.ui.Multitouch', <any>Multitouch);
	M('flash.ui.MultitouchInputMode', <any>MultitouchInputMode);

	M('flash.utils.ByteArray', ByteArray);
	M('flash.utils.CompressionAlgorithm', CompressionAlgorithm);
	//M('flash.utils.Dictionary', Dictionary);
	//M('flash.utils.Endian', Endian);
	M('flash.utils.Timer', Timer);

	M('flash.xml.XMLDocument', XMLDocument);
	M('flash.xml.XMLNode', XMLNode);
	//M('flash.xml.XMLNodeType', XMLNodeType);

	registerNativeFunction('flash.system.fscommand', fscommand);

	ExternalInterface.ensureInitialized();

}
