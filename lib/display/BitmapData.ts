import { Debug, IAssetAdapter, Point as APoint } from '@awayjs/core';
import { StageManager, BitmapImage2D } from '@awayjs/stage';
import { Rectangle } from '../geom/Rectangle';
import { Point } from '../geom/Point';
import { Matrix } from '../geom/Matrix';
import { ColorTransform } from '../geom/ColorTransform';
import { BitmapFilter } from '../filters/BitmapFilter';
import { IBitmapDrawable } from './IBitmapDrawable';
import { SceneImage2D } from '@awayjs/scene';

import { IBitmapDataOwner } from './IBitmapDataOwner';
import { ASObject, ByteArray, Uint32Vector, GenericVector, ASArray } from '@awayfl/avm2';
import { SecurityDomain } from '../SecurityDomain';

const ALER_TABLE: StringMap<boolean> = {};
const ALERT_ONCE = (id: string, message: string) => {
	if (ALER_TABLE[id]) return;
	console.warn(`${id}:`, message);
	ALER_TABLE[id] = true;
};

// Generated solely from local Adobe Flash getPixels observations.
// Each bit records where Adobe rounds down relative to nearest-integer division.
// Index: alpha * (alpha + 1) / 2 + premultiplied channel.
const PIXEL_ROUNDING_CORRECTIONS = new Uint8Array([
	16, 16, 64, 5, 0, 1, 0, 85, 1, 0, 17, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 64, 16, 4,
	0, 0, 16, 17, 17, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 16, 2, 0,
	0, 0, 16, 0, 16, 0, 0, 0, 0, 0, 84, 85, 85, 85, 0, 0, 16, 32, 0, 0, 1, 0, 0, 0,
	0, 0, 80, 85, 85, 85, 21, 0, 0, 0, 0, 0, 1, 16, 0, 1, 0, 0, 64, 128, 0, 0, 2, 1,
	0, 2, 0, 4, 128, 0, 0, 1, 1, 1, 1, 1, 0, 32, 0, 0, 0, 64, 0, 16, 0, 4, 0, 0,
	0, 0, 0, 0, 0, 128, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 32, 16,
	0, 129, 64, 0, 1, 0, 1, 0, 1, 0, 0, 0, 16, 2, 0, 0, 1, 4, 16, 64, 0, 3, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 16, 64, 0, 0, 0, 0, 0, 16, 2, 16, 2, 64, 32, 0, 129, 64, 36,
	2, 0, 8, 64, 0, 2, 18, 0, 0, 128, 0, 1, 8, 16, 0, 0, 0, 0, 0, 4, 0, 32, 0, 0,
	132, 16, 0, 0, 0, 1, 0, 1, 0, 0, 18, 0, 0, 17, 17, 17, 17, 17, 17, 17, 1, 0, 0, 16,
	0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 12, 24, 0, 0, 0, 0, 1, 0, 32, 0, 0, 0, 0, 0,
	1, 0, 0, 0, 0, 0, 0, 0, 2, 64, 0, 8, 0, 64, 0, 0, 16, 0, 0, 4, 0, 0, 0, 1,
	0, 0, 0, 16, 66, 16, 17, 17, 17, 17, 17, 17, 17, 17, 0, 0, 0, 0, 0, 0, 0, 128, 0, 16,
	0, 4, 32, 1, 72, 0, 18, 0, 128, 0, 0, 32, 0, 64, 8, 0, 0, 0, 1, 32, 0, 5, 160, 0,
	21, 0, 0, 0, 0, 0, 0, 0, 0, 160, 42, 0, 0, 0, 0, 16, 32, 64, 128, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 132, 16, 0, 0, 64, 2, 144, 4, 32, 73, 72, 2, 0, 0, 1, 32, 1, 32, 1, 36,
	129, 0, 64, 0, 32, 2, 17, 129, 136, 68, 68, 0, 8, 0, 0, 2, 0, 128, 0, 1, 32, 0, 1, 0,
	1, 0, 1, 0, 1, 0, 1, 0, 0, 4, 2, 129, 32, 16, 8, 4, 131, 1, 0, 0, 0, 8, 16, 0,
	0, 0, 0, 0, 32, 0, 8, 0, 2, 128, 0, 96, 0, 24, 0, 0, 1, 0, 0, 16, 0, 0, 0, 3,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 1, 64, 0, 48, 0, 8, 0, 0, 0, 16, 64, 128, 1, 2, 12, 48, 224, 0, 0, 1, 0,
	64, 0, 32, 16, 16, 8, 4, 4, 4, 65, 16, 4, 65, 16, 4, 65, 16, 4, 65, 0, 0, 0, 0, 0,
	0, 132, 16, 66, 8, 33, 4, 0, 0, 64, 0, 8, 16, 1, 34, 64, 132, 136, 0, 0, 0, 16, 1, 128,
	136, 136, 64, 68, 68, 102, 0, 0, 0, 8, 4, 2, 1, 0, 2, 129, 64, 32, 0, 0, 0, 0, 0, 0,
	2, 0, 16, 0, 128, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 32, 32, 32, 32, 32, 33,
	33, 33, 41, 41, 41, 41, 1, 0, 0, 0, 0, 0, 16, 66, 8, 0, 0, 0, 0, 0, 0, 4, 0, 0,
	0, 8, 4, 2, 1, 16, 8, 0, 16, 128, 0, 5, 8, 80, 128, 2, 21, 168, 80, 5, 0, 0, 0, 0,
	0, 1, 0, 160, 0, 0, 21, 0, 64, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 5, 0, 0,
	1, 0, 42, 0, 80, 1, 128, 42, 0, 85, 5, 64, 0, 0, 4, 32, 64, 1, 2, 20, 168, 64, 129, 10,
	0, 0, 0, 129, 64, 32, 16, 8, 4, 66, 161, 80, 40, 0, 0, 16, 66, 8, 1, 16, 66, 8, 33, 132,
	82, 74, 1, 0, 0, 0, 0, 0, 0, 0, 4, 128, 0, 0, 0, 0, 0, 0, 1, 64, 0, 2, 144, 0,
	4, 32, 1, 73, 64, 2, 0, 0, 128, 36, 73, 146, 36, 9, 0, 128, 36, 73, 146, 0, 16, 0, 128, 4,
	0, 32, 1, 0, 73, 0, 72, 18, 64, 0, 0, 0, 0, 1, 0, 0, 0, 32, 0, 0, 0, 1, 4, 0,
	0, 16, 128, 64, 4, 34, 17, 137, 64, 36, 34, 145, 137, 0, 0, 0, 0, 0, 68, 68, 68, 0, 32, 34,
	34, 34, 34, 2, 0, 64, 0, 136, 0, 16, 17, 32, 34, 64, 68, 140, 136, 24, 0, 0, 0, 16, 0, 4,
	8, 1, 66, 132, 16, 33, 70, 136, 1, 0, 0, 66, 8, 33, 132, 16, 132, 16, 66, 8, 33, 132, 49, 0,
	32, 0, 64, 0, 130, 48, 4, 97, 8, 195, 24, 134, 49, 12, 0, 0, 0, 2, 0, 0, 4, 1, 0, 8,
	2, 0, 16, 4, 1, 0, 0, 0, 16, 8, 4, 2, 129, 64, 32, 16, 24, 12, 6, 3, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 8, 0, 64, 128, 0, 2, 4, 24, 32, 192, 128, 1,
	6, 12, 0, 0, 0, 0, 0, 0, 2, 16, 0, 0, 0, 0, 0, 0, 0, 0, 2, 128, 0, 32, 0, 12,
	0, 7, 192, 1, 120, 0, 30, 128, 7, 128, 0, 0, 2, 0, 8, 0, 112, 0, 192, 1, 0, 7, 0, 28,
	0, 0, 0, 0, 0, 2, 0, 0, 12, 0, 0, 24, 0, 0, 112, 0, 0, 0, 64, 0, 0, 0, 0, 0,
	3, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	2, 0, 0, 0, 0, 16, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 24, 0, 0, 96, 0, 0, 128, 1,
	0, 0, 0, 0, 4, 0, 16, 0, 192, 0, 0, 6, 0, 24, 0, 224, 0, 0, 0, 0, 1, 64, 0, 48,
	0, 28, 0, 6, 128, 3, 224, 1, 120, 0, 32, 0, 2, 32, 0, 3, 48, 128, 3, 56, 128, 3, 60, 192,
	3, 60, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 4, 0, 0, 0, 2, 8, 32, 0, 0, 0, 0, 8,
	16, 32, 64, 128, 0, 1, 3, 6, 12, 24, 48, 112, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 0, 128, 64, 32, 0, 0, 8, 4, 2, 129, 192, 96, 32, 16, 8, 12, 6, 0,
	0, 64, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 4, 128, 0, 32, 8, 130, 32, 8, 130, 32, 8,
	130, 32, 8, 130, 32, 8, 130, 32, 12, 3, 0, 16, 0, 0, 0, 1, 8, 64, 16, 128, 0, 4, 33, 8,
	64, 16, 130, 0, 0, 33, 0, 0, 132, 16, 194, 24, 66, 8, 99, 140, 113, 140, 49, 198, 57, 1, 0, 132,
	0, 0, 128, 16, 66, 8, 17, 66, 8, 33, 198, 24, 33, 198, 24, 0, 0, 1, 0, 128, 0, 33, 64, 128,
	16, 33, 64, 136, 16, 35, 68, 136, 17, 0, 0, 0, 1, 32, 0, 4, 128, 0, 17, 32, 2, 68, 128, 8,
	17, 33, 2, 0, 0, 0, 0, 1, 0, 0, 32, 2, 0, 0, 68, 0, 0, 128, 136, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 16, 17, 0, 0, 0, 0, 0, 0, 136, 136, 8, 0, 0, 0, 64, 0, 0, 0, 0,
	0, 128, 0, 64, 0, 0, 0, 0, 1, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 64, 0, 0,
	1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 64, 0, 0, 0, 0, 16, 8, 4, 0, 0, 0,
	4, 16, 64, 0, 1, 4, 16, 64, 0, 1, 4, 16, 64, 0, 1, 36, 144, 64, 2, 16, 0, 16, 0, 16,
	0, 18, 0, 18, 0, 18, 0, 18, 64, 18, 64, 18, 64, 2, 0, 32, 0, 0, 0, 144, 4, 0, 0, 73,
	146, 0, 128, 36, 73, 18, 64, 146, 4, 0, 0, 0, 0, 0, 0, 0, 32, 73, 146, 36, 73, 146, 36, 73,
	146, 36, 73, 18, 0, 16, 0, 0, 72, 18, 0, 36, 73, 18, 146, 36, 73, 75, 146, 164, 109, 75, 146, 2,
	0, 0, 0, 0, 1, 0, 0, 128, 0, 32, 0, 64, 0, 16, 0, 36, 0, 8, 0, 0, 32, 0, 1, 0,
	8, 64, 64, 2, 18, 16, 144, 128, 4, 36, 36, 33, 33, 9, 1, 0, 0, 0, 16, 16, 16, 16, 16, 18,
	18, 18, 82, 82, 82, 82, 90, 90, 90, 90, 0, 0, 128, 0, 0, 0, 0, 0, 8, 0, 1, 0, 4, 128,
	0, 16, 2, 64, 0, 8, 0, 0, 0, 32, 132, 16, 66, 8, 1, 0, 132, 16, 66, 8, 33, 132, 144, 82,
	74, 41, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 128, 0,
	8, 128, 0, 8, 128, 0, 8, 132, 64, 8, 132, 64, 8, 132, 66, 40, 132, 66, 0, 0, 0, 64, 32, 16,
	8, 4, 10, 133, 82, 169, 84, 42, 149, 74, 165, 86, 171, 213, 42, 64, 0, 64, 0, 64, 32, 64, 32, 80,
	32, 80, 32, 80, 40, 80, 40, 84, 40, 84, 40, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 16, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 2, 16, 128, 2, 20, 160, 0, 21, 168, 64, 5, 170,
	80, 133, 42, 84, 1, 0, 8, 0, 0, 128, 0, 0, 0, 8, 0, 5, 128, 0, 80, 0, 40, 0, 5, 128,
	2, 0, 0, 0, 1, 0, 40, 0, 80, 21, 128, 170, 2, 84, 85, 160, 170, 74, 85, 85, 171, 170, 10, 0,
	0, 0, 21, 0, 0, 160, 10, 0, 0, 85, 21, 0, 160, 170, 10, 0, 85, 85, 21, 0, 0, 0, 0, 0,
	0, 0, 128, 42, 0, 0, 0, 0, 0, 64, 85, 21, 0, 0, 0, 0, 0, 85, 85, 85, 85, 85, 85, 85,
	85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 1, 0, 0, 0, 0, 64, 85, 5, 0, 0,
	0, 170, 170, 170, 10, 0, 84, 85, 85, 85, 85, 53, 0, 0, 0, 5, 0, 0, 168, 0, 0, 80, 21, 0,
	160, 170, 0, 64, 85, 21, 0, 170, 170, 2, 0, 0, 0, 0, 1, 0, 8, 0, 64, 0, 128, 10, 0, 84,
	0, 168, 2, 64, 21, 0, 170, 0, 0, 0, 64, 0, 0, 0, 4, 0, 2, 0, 1, 32, 0, 16, 0, 10,
	0, 5, 128, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
	0, 8, 0, 0, 0, 8, 16, 160, 64, 129, 2, 21, 40, 80, 161, 66, 133, 42, 85, 170, 84, 173, 90, 245,
	234, 1, 2, 0, 2, 4, 10, 4, 10, 20, 10, 20, 42, 84, 42, 84, 170, 84, 170, 84, 171, 86, 171, 6,
	0, 0, 2, 129, 64, 32, 80, 40, 16, 8, 20, 10, 133, 66, 161, 82, 169, 84, 42, 213, 106, 53, 0, 8,
	0, 64, 32, 16, 8, 129, 64, 40, 20, 66, 161, 80, 40, 133, 66, 169, 84, 106, 165, 82, 1, 1, 16, 0,
	33, 16, 2, 33, 20, 66, 33, 20, 66, 41, 148, 66, 41, 149, 82, 41, 181, 82, 43, 0, 128, 0, 0, 32,
	132, 0, 8, 33, 132, 66, 8, 161, 148, 66, 40, 165, 148, 74, 41, 165, 214, 10, 0, 0, 0, 0, 0, 0,
	0, 32, 132, 16, 66, 41, 165, 148, 82, 74, 41, 165, 148, 82, 74, 41, 5, 0, 4, 0, 16, 66, 0, 8,
	33, 132, 132, 16, 82, 74, 8, 41, 165, 148, 148, 82, 90, 75, 41, 13, 0, 0, 0, 132, 128, 16, 16, 18,
	66, 66, 72, 9, 41, 41, 37, 165, 164, 148, 148, 214, 210, 90, 26, 2, 2, 2, 2, 66, 66, 66, 66, 66,
	74, 74, 74, 74, 74, 75, 75, 75, 75, 107, 107, 107, 107, 107, 0, 0, 64, 64, 2, 2, 18, 146, 144, 144,
	148, 148, 164, 164, 165, 37, 45, 45, 109, 109, 107, 107, 123, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 4, 32, 0, 1, 8, 64, 0, 2, 0, 0, 0, 0, 0, 0, 4, 0, 1, 64, 0,
	144, 0, 32, 0, 72, 0, 18, 128, 4, 32, 9, 72, 2, 0, 0, 0, 16, 0, 0, 9, 0, 128, 4, 0,
	72, 2, 128, 36, 9, 64, 146, 4, 36, 73, 66, 146, 0, 0, 144, 4, 0, 0, 0, 36, 73, 18, 0, 0,
	73, 146, 36, 73, 66, 146, 36, 73, 146, 180, 45, 73, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	146, 36, 73, 146, 109, 219, 182, 109, 219, 182, 109, 219, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
	1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 18, 0, 0, 32,
	1, 0, 64, 18, 0, 128, 36, 1, 0, 73, 18, 0, 2, 8, 0, 8, 0, 72, 0, 72, 0, 72, 2, 72,
	18, 72, 18, 72, 146, 72, 146, 72, 146, 76, 146, 76, 18, 0, 0, 1, 32, 128, 4, 144, 64, 18, 72, 2,
	73, 36, 137, 36, 147, 100, 146, 77, 178, 201, 54, 217, 102, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 16, 64, 0, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 32, 0, 64, 0, 128,
	64, 0, 129, 4, 2, 137, 4, 18, 9, 36, 18, 72, 36, 146, 8, 0, 0, 0, 64, 32, 16, 8, 4, 2,
	129, 64, 32, 145, 72, 36, 50, 153, 76, 38, 147, 205, 102, 179, 217, 12, 0, 16, 0, 0, 0, 16, 0, 0,
	0, 16, 0, 0, 0, 16, 0, 0, 0, 16, 0, 0, 0, 16, 0, 0, 0, 0, 0, 1, 8, 64, 0, 2,
	17, 8, 64, 0, 2, 17, 136, 64, 4, 34, 17, 137, 72, 68, 34, 19, 153, 8, 0, 0, 0, 34, 0, 17,
	136, 8, 68, 4, 34, 50, 17, 153, 200, 76, 100, 38, 50, 179, 153, 217, 204, 110, 102, 0, 0, 16, 0, 0,
	0, 0, 64, 0, 0, 2, 0, 16, 1, 0, 136, 0, 64, 4, 0, 34, 2, 0, 17, 0, 0, 0, 0, 0,
	0, 136, 136, 136, 0, 0, 64, 68, 68, 68, 68, 100, 38, 34, 34, 34, 34, 51, 51, 51, 19, 17, 17, 17,
	17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 1,
	0, 0, 0, 64, 4, 0, 0, 136, 136, 8, 0, 16, 17, 17, 17, 32, 34, 34, 34, 98, 68, 68, 68, 204,
	204, 0, 0, 16, 0, 34, 2, 68, 68, 136, 136, 24, 17, 51, 35, 102, 70, 204, 204, 152, 153, 59, 51, 119,
	103, 238, 238, 0, 0, 0, 0, 0, 2, 64, 0, 8, 0, 1, 32, 0, 68, 128, 8, 17, 33, 34, 68, 132,
	136, 24, 17, 35, 98, 0, 0, 16, 32, 64, 128, 8, 17, 34, 68, 140, 24, 49, 99, 198, 140, 153, 49, 99,
	198, 204, 153, 51, 103, 238, 220, 1, 0, 2, 4, 0, 0, 2, 4, 8, 16, 2, 4, 8, 16, 34, 68, 8,
	16, 34, 68, 136, 16, 35, 68, 136, 16, 3, 4, 0, 33, 64, 8, 17, 66, 140, 16, 35, 196, 24, 49, 198,
	140, 49, 103, 204, 57, 115, 206, 157, 115, 239, 220, 59, 0, 4, 0, 0, 132, 0, 0, 132, 16, 0, 132, 16,
	2, 132, 16, 66, 132, 16, 66, 132, 16, 66, 140, 16, 66, 140, 1, 0, 0, 0, 128, 16, 66, 8, 33, 132,
	16, 66, 8, 49, 198, 24, 231, 156, 115, 206, 57, 231, 220, 123, 239, 189, 119, 0, 0, 64, 8, 1, 0, 0,
	128, 16, 66, 8, 33, 132, 32, 132, 16, 66, 8, 97, 140, 49, 198, 16, 194, 24, 99, 12, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 32, 0, 0, 128, 0, 0, 16, 0, 0, 64, 0, 0, 0,
	128, 0, 128, 0, 4, 32, 4, 33, 4, 33, 8, 97, 8, 99, 24, 67, 24, 195, 24, 199, 56, 198, 56, 198,
	57, 14, 0, 0, 32, 0, 1, 0, 0, 16, 128, 0, 4, 32, 0, 65, 0, 2, 16, 128, 32, 4, 33, 8,
	65, 16, 130, 16, 4, 0, 0, 130, 32, 0, 65, 16, 134, 32, 8, 195, 48, 134, 97, 24, 199, 48, 142, 227,
	56, 199, 113, 158, 231, 56, 207, 115, 0, 0, 0, 0, 0, 0, 128, 32, 8, 130, 32, 8, 130, 48, 12, 195,
	16, 4, 65, 16, 132, 97, 24, 134, 97, 24, 134, 1, 0, 0, 0, 0, 0, 0, 0, 4, 1, 0, 0, 0,
	0, 0, 0, 32, 8, 2, 0, 0, 0, 0, 0, 4, 65, 16, 4, 0, 64, 16, 0, 130, 64, 16, 4, 131,
	96, 24, 4, 195, 112, 24, 134, 195, 112, 28, 135, 227, 120, 28, 199, 243, 120, 158, 7, 0, 0, 0, 128, 0,
	16, 0, 2, 64, 32, 8, 4, 129, 32, 16, 12, 130, 65, 48, 8, 6, 193, 96, 24, 12, 131, 97, 0, 0,
	0, 0, 64, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 8, 0, 0, 64, 0, 0, 4, 2, 0,
	32, 0, 0, 0, 0, 0, 129, 64, 32, 16, 8, 4, 2, 129, 193, 96, 56, 28, 14, 135, 195, 225, 241, 120,
	60, 30, 143, 199, 227, 241, 0, 0, 0, 0, 0, 129, 0, 64, 32, 16, 16, 8, 4, 6, 3, 129, 193, 96,
	32, 48, 24, 12, 12, 6, 131, 195, 193, 224, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 128, 0, 64,
	0, 32, 0, 16, 0, 8, 0, 4, 0, 2, 2, 1, 129, 128, 128, 128, 128, 128, 128, 192, 192, 192, 192, 192,
	224, 224, 224, 224, 240, 240, 240, 240, 240, 248, 248, 248, 248, 248, 252, 252, 252, 252, 60, 0, 0, 0, 0, 8,
	8, 8, 8, 24, 16, 16, 16, 48, 48, 48, 112, 112, 112, 112, 224, 224, 224, 224, 224, 225, 225, 225, 225, 3,
	0, 0, 0, 0, 1, 0, 2, 4, 4, 8, 8, 16, 16, 48, 32, 96, 64, 192, 128, 128, 1, 1, 3, 7,
	6, 14, 12, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 64, 128, 0, 0, 0, 0,
	4, 8, 0, 0, 0, 64, 128, 0, 1, 0, 8, 16, 64, 128, 0, 3, 6, 28, 48, 224, 192, 129, 7, 15,
	60, 120, 240, 224, 195, 7, 31, 62, 252, 248, 241, 199, 143, 15, 0, 0, 0, 64, 0, 1, 6, 24, 32, 192,
	0, 3, 12, 56, 224, 192, 1, 7, 28, 120, 224, 129, 7, 31, 60, 248, 224, 131, 15, 0, 0, 0, 0, 0,
	4, 16, 64, 0, 1, 12, 48, 192, 0, 3, 24, 96, 128, 1, 6, 24, 224, 128, 3, 14, 56, 224, 129, 7,
	0, 32, 0, 0, 0, 32, 0, 0, 4, 32, 0, 0, 4, 32, 128, 0, 4, 48, 128, 0, 4, 48, 128, 0,
	6, 48, 128, 0, 6, 0, 0, 1, 24, 192, 0, 12, 224, 0, 7, 120, 192, 3, 62, 240, 3, 31, 248, 193,
	31, 254, 240, 143, 255, 252, 199, 127, 254, 243, 3, 1, 16, 0, 1, 16, 128, 1, 56, 128, 3, 56, 192, 3,
	60, 192, 7, 124, 224, 7, 126, 224, 7, 126, 240, 15, 255, 240, 15, 63, 0, 0, 2, 64, 0, 4, 192, 0,
	24, 128, 3, 112, 0, 7, 240, 0, 30, 224, 3, 124, 192, 7, 248, 128, 31, 248, 3, 127, 240, 7, 0, 128,
	0, 16, 0, 4, 128, 0, 48, 0, 6, 192, 1, 56, 0, 14, 192, 1, 56, 0, 15, 224, 1, 124, 0, 15,
	224, 3, 124, 0, 1, 64, 0, 16, 0, 4, 0, 3, 192, 0, 48, 0, 12, 0, 3, 192, 1, 112, 0, 28,
	0, 7, 192, 3, 240, 0, 60, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	128, 1, 192, 0, 96, 0, 48, 0, 24, 0, 12, 0, 6, 0, 3, 0, 1, 0, 1, 0, 1, 0, 1, 0,
	1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 4, 0,
	24, 0, 96, 0, 192, 3, 128, 15, 0, 63, 0, 254, 0, 248, 7, 240, 31, 224, 127, 192, 255, 131, 255, 15,
	254, 63, 252, 7, 0, 0, 128, 1, 0, 28, 0, 224, 0, 128, 15, 0, 252, 0, 240, 15, 128, 127, 0, 252,
	7, 240, 127, 128, 255, 3, 252, 63, 240, 63, 0, 0, 0, 96, 0, 0, 14, 0, 224, 1, 0, 124, 0, 192,
	15, 0, 252, 1, 192, 127, 0, 248, 15, 128, 255, 1, 248, 127, 128, 255, 3, 0, 0, 0, 16, 0, 0, 28,
	0, 0, 15, 0, 192, 7, 0, 240, 7, 0, 248, 3, 0, 254, 1, 128, 255, 0, 224, 255, 0, 248, 127, 0,
	0, 0, 0, 48, 0, 0, 224, 0, 0, 224, 1, 0, 192, 7, 0, 192, 15, 0, 128, 63, 0, 128, 255, 0,
	0, 255, 1, 0, 255, 7, 0, 8, 0, 0, 192, 0, 0, 0, 28, 0, 0, 224, 1, 0, 0, 63, 0, 0,
	240, 3, 0, 128, 63, 0, 0, 252, 7, 0, 192, 127, 0, 0, 16, 0, 0, 0, 24, 0, 0, 0, 28, 0,
	0, 0, 30, 0, 0, 128, 31, 0, 0, 192, 31, 0, 0, 224, 31, 0, 0, 240, 31, 0, 0, 64, 0, 0,
	0, 0, 4, 0, 0, 0, 224, 0, 0, 0, 0, 31, 0, 0, 0, 240, 1, 0, 0, 128, 63, 0, 0, 0,
	248, 3, 0, 0, 0, 4, 0, 0, 0, 0, 48, 0, 0, 0, 0, 224, 0, 0, 0, 0, 128, 7, 0, 0,
	0, 0, 63, 0, 0, 0, 0, 252, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0,
	0, 240, 0, 0, 0, 0, 0, 192, 7, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 4, 0, 0,
	0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 128, 7, 0, 0, 0, 0, 0, 0, 192, 7, 0, 0,
	0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0,
]);

export class BitmapData extends ASObject implements IBitmapDrawable, IAssetAdapter {
	private _adaptee: SceneImage2D;
	private _owners: IBitmapDataOwner[] = [];

	// for AVM1:
	public compare(other: BitmapData): boolean {
		return true;
	}

	public get adaptee(): SceneImage2D {
		return this._adaptee;
	}

	public set adaptee(value: SceneImage2D) {
		this._adaptee = value;
	}

	static loadBitmap(id: string): BitmapData {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'loadBitmap', '');
		return null;
	}

	public setPixels(rect: Rectangle, inputByteArray: ByteArray): void {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'setPixels', '');
	}

	public getPixels(rect: Rectangle): ByteArray {
		const pixels = this.adaptee.getPixels(rect.adaptee);
		// Lazy decoding/readback can change the pixel representation.
		const isPMA = !this.adaptee.unpackPMA;
		const buffer = new Uint8Array(pixels.length);

		for (let i = 0; i < pixels.length; i += 4) {
			const alpha = pixels[i + 3];
			const row = alpha * (alpha + 1) / 2;
			buffer[i] = alpha;

			for (let channel = 0; channel < 3; channel++) {
				let value = pixels[i + channel];
				if (isPMA) {
					if (alpha) {
						value = Math.min(value, alpha);
						const index = row + value;
						const correction = (PIXEL_ROUNDING_CORRECTIONS[index >> 3] >> (index & 7)) & 1;
						value = Math.floor((value * 255 + (alpha >> 1)) / alpha) - correction;
					} else {
						value = 0;
					}
				}
				buffer[i + channel + 1] = value;
			}
		}

		const arr = new (<SecurityDomain> this.sec).flash.utils.ByteArray();
		// @ts-ignore
		arr.setArrayBuffer(buffer.buffer);
		return arr;
	}

	public copyPixelsToByteArray(rect: Rectangle, data: ByteArray): void {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'copyPixelsToByteArray', '');
	}

	public getVector(rect: Rectangle): Uint32Vector {
		const u8 = this.adaptee.getPixels(rect.adaptee);
		// construct small buffer
		const vector = new this.sec.Uint32Vector(0, true);
		const u32 = new Uint32Array(u8.buffer);

		// flash use ARGB view, we have ABGR and PMA
		for (let i = 0; i < u32.length; i++) {
			const a = u8[i * 4 + 3];
			const r = u8[i * 4 + 0];
			const g = u8[i * 4 + 1];
			const b = u8[i * 4 + 2];

			const factor = (a / 0xff) || 1;

			u32[i] =
					(a << 24) |
					((r / factor) << 16) |
					((g / factor) << 8) |
					(b	/ factor);
		}

		// replace a buffer for avoid coping
		//@ts-ignore
		vector._buffer = u32;
		// remap size
		//@ts-ignore
		vector._length = u32.length;

		return vector;
	}

	public setVector(rect: Rectangle, inputVector: Uint32Vector): void {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'setVector', '');
	}

	public histogram(hRect: Rectangle = null): GenericVector {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'histogram', '');
		return;
	}

	public encode(rect: Rectangle, compressor: ASObject, byteArray: ByteArray = null): ByteArray {
		// @todo
		Debug.throwPIR('playerglobals/display/BitmapData', 'encode', '');
		return;
	}

	public drawWithQuality(
		source: any,
		matrix: Matrix = null,
		colorTransform: ColorTransform = null,
		blendMode: string = null,
		clipRect: Rectangle = null,
		smoothing: boolean = false,
		quality: string = null
	): void {
		this._adaptee.draw(
			source.adaptee,
			matrix?.adaptee,
			colorTransform?.adaptee,
			blendMode,
			clipRect?.adaptee,
			smoothing
		);
	}

	constructor(width: number | SceneImage2D | BitmapImage2D,
		height?: number, transparent: boolean = true, fillColor: number = 0xffffffff) {
		super();

		if (typeof width === 'number') {

			if (!this._adaptee) {
				this._adaptee =	SceneImage2D.getImage(width, height, transparent, fillColor, false,
					StageManager.getInstance().getStageAt(0));

				// we construct a SceneImage2D direct, use weak, that call dispose after garbaging
				this._adaptee.useWeakRef();
			}

		} else {
			this._adaptee = <any>width;
		}

		this._adaptee.adapter = this;
	}

	public get transparent(): boolean {
		return this._adaptee.transparent;
	}

	public set transparent(value: boolean) {
		this._adaptee.transparent = value;
	}

	public get width(): number {
		return this._adaptee.width;
	}

	public set width(value: number) {
		this._adaptee.width = value;
	}

	public get height(): number {
		return this._adaptee.height;
	}

	public set height(value: number) {
		this._adaptee.height = value;
	}

	public clone(): BitmapData {
		const clone: BitmapData = new (<SecurityDomain> this.sec).flash.display.BitmapData(
			this._adaptee.width,
			this._adaptee.height,
			this._adaptee.transparent,
			null
		);

		// refclone
		if (this._adaptee.copyTo) {
			this._adaptee.copyTo(clone._adaptee);
		} else {
			clone.copyPixels(this, this.rect, new (<SecurityDomain> this.sec).flash.geom.Point());
		}

		return clone;
	}

	public get rect(): Rectangle {
		return new (<SecurityDomain> this.sec).flash.geom.Rectangle(this._adaptee.rect.clone());
	}

	public getPixel(x: number, y: number): number {
		return this._adaptee.getPixel(x, y);
	}

	public getPixel32(x: number, y: number): number {
		return this._adaptee.getPixel32(x, y);
	}

	public setPixel(x: number, y: number, color: number) {
		this._adaptee.setPixel(x, y, color);
	}

	public setPixel32(x: number, y: number, color: number) {
		this._adaptee.setPixel32(x, y, color);
	}

	public applyFilter(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		filter: BitmapFilter
	): void {

		if (this._adaptee.applyFilter(
			sourceBitmap.adaptee,
			sourceRect.adaptee,
			destPoint.adaptee,
			filter.toAwayObject()
		)) {
			return;
		}

		Debug.throwPIR('playerglobals/display/BitmapData', 'applyFilter', filter.axClassName);

	}

	public colorTransform(rect: Rectangle, colorTransform: ColorTransform) {
		this._adaptee.colorTransform(rect.adaptee, colorTransform.adaptee);
	}

	public copyChannel(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		sourceChannel: number,
		destChannel: number
	) {
		this._adaptee.copyChannel(
			sourceBitmap.adaptee,
			sourceRect.adaptee,
			destPoint.adaptee,
			sourceChannel,
			destChannel
		);
	}

	public copyPixels(
		sourceBitmap: any,
		sourceRect: Rectangle,
		destPoint: Point,
		alphaBitmapData: BitmapData = null,
		alphaPoint: Point = null,
		mergeAlpha: boolean = false
	) {
		this._adaptee.copyPixels(
			sourceBitmap.adaptee,
			sourceRect.adaptee,
			destPoint.adaptee,
			alphaBitmapData ? alphaBitmapData.adaptee : null,
			alphaPoint ? alphaPoint.adaptee : null,
			mergeAlpha
		);
	}

	public dispose() {
		// already disposed or not setted
		if (!this._adaptee)
			return;

		//remove all owners
		this._owners = [];

		if (this._adaptee.canUnload) {
			this._adaptee.dispose();
		}
		this._adaptee = null;
	}

	public draw(
		source: any,
		matrix: Matrix,
		colorTransform: ColorTransform = null,
		blendMode: any = '',
		clipRect: Rectangle = null,
		smoothing: boolean = false
	) {
		this._adaptee.draw(
			source.adaptee,
			matrix?.adaptee,
			colorTransform?.adaptee,
			blendMode,
			clipRect?.adaptee,
			smoothing
		);
	}

	public fillRect(rect: Rectangle, color: number) {
		// var colorArr = ColorUtils.float32ColorToARGB(color);
		// color = ColorUtils.ARGBtoFloat32(colorArr[0], colorArr[3], colorArr[2], colorArr[1]);
		this._adaptee.fillRect(rect.adaptee, color);
	}

	public floodFill(x: number, y: number, color: number) {
		ALERT_ONCE('floodFill:' + this._adaptee.id, 'Unsage implementation!');
		this._adaptee.floodFill(x, y, color);
	}

	public generateFilterRect(sourceRect: Rectangle, filter: BitmapFilter): Rectangle {
		Debug.throwPIR('playerglobals/display/BitmapData', 'generateFilterRect', '');
		return null;
	}

	public getColorBoundsRect(mask: number, color: number, findColor: boolean): Rectangle {
		Debug.throwPIR('playerglobals/display/BitmapData', 'getColorBoundsRect', '');
		return  new (<SecurityDomain> this.sec).flash.geom.Rectangle(
			this._adaptee.getColorBoundsRect(mask, color, findColor));
	}

	public hitTest(
		firstPoint: Point,
		firstAlphaThreshold: number,
		secondObject: any,
		secondBitmapPoint: Point,
		secondAlphaThreshold: number = 0
	): boolean {
		Debug.throwPIR('playerglobals/display/BitmapData', 'hitTest', '');
		return this._adaptee.hitTest(
			firstPoint.adaptee,
			firstAlphaThreshold,
			secondObject?.adaptee,
			secondBitmapPoint?.adaptee,
			secondAlphaThreshold
		);
	}

	public lock(): void {
		this._adaptee.lock();
	}

	public merge(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		redMult: number,
		greenMult: number,
		blueMult: number,
		alphaMult: number
	) {
		this._adaptee.merge(
			sourceBitmap.adaptee,
			sourceBitmap.rect.adaptee,
			destPoint.adaptee,
			redMult,
			greenMult,
			blueMult,
			alphaMult
		);
	}

	public noise(randomSeed: number, low: number, high: number, channelOptions: number, grayScale: boolean) {
		this._adaptee.noise(randomSeed, low, high, channelOptions, grayScale);
	}

	public paletteMap(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		redArray: any[],
		greenArray: any[],
		blueArray: any[],
		alphaArray: any[]
	) {
		Debug.throwPIR('playerglobals/display/BitmapData', 'paletteMap', '');
	}

	public perlinNoise(
		baseX: number,
		baseY: number,
		numOctaves: number,
		randomSeed: number,
		stitch: boolean,
		fractalNoise: boolean,
		channelOptions: number,
		grayScale: boolean,
		offsets: ASArray = null
	) {
		const map_offsets: Array<number> = offsets ? [] : null;

		if (offsets) {
			const value = offsets.value;
			const len = value.length;

			// this is VERY strange, some games use [1, 1] and then push Point to offsets, map to [x, y, x, y]
			for (let i = 0; i < len; i++) {
				if (typeof value[i] === 'number') {
					map_offsets.push(value[i]);
				} else if (typeof value[i].x === 'number') {
					map_offsets.push(value[i].x, value[i].y);
				}
			}
		}
		//@ts-ignore
		this._adaptee.perlinNoise(baseX, baseY, numOctaves, randomSeed, stitch, fractalNoise, channelOptions, grayScale, map_offsets);
		Debug.throwPIR('playerglobals/display/BitmapData', 'perlinNoise', 'Unsafe implementation, results not equal!');
	}

	public pixelDissolve(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		randomSeed: number,
		numberOfPixels: number,
		fillColor: number
	): number {
		Debug.throwPIR('playerglobals/display/BitmapData', 'pixelDissolve', '');
		return 0;
	}

	public scroll(x: number, y: number) {
		x = x | 0;
		y = y | 0;

		// 0, 0 scroll - is not scroll
		if (!x && !y) return;

		this._adaptee.copyPixels(
			this._adaptee, this._adaptee.rect, new APoint(x,y) , null, null, false);
		//console.log('scroll not implemented yet in flash/BitmapData');
	}

	public threshold(
		sourceBitmap: BitmapData,
		sourceRect: Rectangle,
		destPoint: Point,
		operation: string,
		threshold: number,
		color: number,
		mask: number,
		copySource: boolean
	): number {
		this._adaptee.threshold(
			sourceBitmap.adaptee,
			sourceRect.adaptee,
			destPoint.adaptee,
			operation,
			threshold,
			color,
			mask,
			copySource
		);

		return 0; //number of pixels is not implemented
	}

	public unlock(): void {
		this._adaptee.unlock();
	}

	public _addOwner(owner: IBitmapDataOwner) {
		//if (this._owners.indexOf(owner) == -1) this._owners.push(owner);
	}

	public _removeOwner(owner: IBitmapDataOwner) {
		// const index: number = this._owners.indexOf(owner);

		// if (index != -1) {
		// 	this._owners.splice(index, 1);

		// 	if (this._owners.length === 0)
		// 		this._adaptee.clear();
		// }
	}
}
