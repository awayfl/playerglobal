import { DisplayObject } from './DisplayObject';

export interface IVirtualSceneGraphItem {
	sessionID: number,
	as3DepthID: number,
	addedOnTargetFrame: boolean,
	symbolID?: number,
	child?: DisplayObject,
}