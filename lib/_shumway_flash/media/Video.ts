import { DisplayObject, DisplayObjectDirtyFlags } from '../display/DisplayObject';
import { release, assert, somewhatImplemented, notImplemented } from '../../base/utilities/Debug';
import { NetStreamAppendBytesAction } from '../net/NetStreamAppendBytesAction';
import { DisplaySymbol, SymbolData } from '../symbol';
import { ISecurityDomain } from '../../avm2/nat/ISecurityDomain';
import { LoaderInfo } from '../display/LoaderInfo';
import { Camera } from './Camera';
import { NetStream } from '../net/NetStream';

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
// Class: Video

export class Video extends DisplayObject {
	static classInitializer: any = null;
	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	_symbol: VideoSymbol;
	applySymbol() {
		this._initializeFields();
		const symbol = this._symbol;
		this._deblocking = symbol.deblocking;
		this._smoothing = symbol.smoothing;
		this._setFillAndLineBoundsFromWidthAndHeight(symbol.width * 20, symbol.height * 20);
	}

	protected _initializeFields() {
		super._initializeFields();
		this._deblocking = 0;
		this._smoothing = false;
		this._videoWidth = 0;
		this._videoHeight = 0;
	}

	constructor (width: number /*int*/ = 320, height: number /*int*/ = 240) {
		width |= 0;
		height |= 0;
		super();
		if (this._symbol && !this._fieldsInitialized) {
			this.applySymbol();
		}
		if (!this._fieldsInitialized) {
			this._initializeFields();
		}
		if (!this._symbol) {
			width = width || 320;
			height = height || 240;
			this._setFillAndLineBoundsFromWidthAndHeight(width * 20, height * 20);
		}
	}

	_deblocking: number;
	_smoothing: boolean;
	_videoWidth: number;
	_videoHeight: number;

	_netStream: NetStream;
	_camera: Camera;

	get deblocking(): number /*int*/ {
		return this._deblocking;
	}

	set deblocking(value: number /*int*/) {
		this._deblocking = value | 0;
	}

	get smoothing(): boolean {
		return this._smoothing;
	}

	set smoothing(value: boolean) {
		this._smoothing = !!value;
	}

	get videoWidth(): number /*int*/ {
		return this._videoWidth;
	}

	get videoHeight(): number /*int*/ {
		return this._videoHeight;
	}

	_containsPointDirectly(localX: number, localY: number,
		globalX: number, globalY: number): boolean {
		// If this override is reached, the content bounds have already been checked, which is all
		// we need to do.
		release || assert(this._getContentBounds().contains(localX, localY));
		return true;
	}

	clear(): void {
		release || somewhatImplemented('public flash.media.Video::clear'); return;
	}

	attachNetStream(netStream: NetStreamAppendBytesAction): void {
		console.log('80pro: todo: attachNetStream');
		/*
    if (this._netStream === netStream) {
      return;
    }
    if (this._netStream) {
      this._netStream._videoReferrer = null;
    }
    this._netStream = netStream;
    if (this._netStream) {
      netStream._videoReferrer = this;
    }
    this._setDirtyFlags(DisplayObjectDirtyFlags.DirtyNetStream);*/
	}

	attachCamera(camera: Camera): void {
		release || notImplemented('public flash.media.Video::attachCamera'); return;
	}
}

export class VideoSymbol extends DisplaySymbol {
	width: number;
	height: number;
	deblocking: number;
	smoothing: boolean;
	codec: number;

	constructor(data: SymbolData, sec: ISecurityDomain) {
		super(data, Video.axClass, true);
	}

	static FromData(data: any, loaderInfo: LoaderInfo): VideoSymbol {
		const symbol = new VideoSymbol(data, loaderInfo.sec);
		symbol.width = data.width;
		symbol.height = data.height;
		symbol.deblocking = data.deblocking;
		symbol.smoothing = data.smoothing;
		symbol.codec = data.codec;
		return symbol;
	}
}