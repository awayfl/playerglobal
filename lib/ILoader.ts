import { Stage } from './display/Stage';
import { DisplayObject } from './display/DisplayObject';

export interface ILoader
{
	stage: Stage;

	content: DisplayObject;
}