import { Stage } from './display/Stage';
import { DisplayObject } from './display/DisplayObject';
import { UncaughtErrorEvents } from './events/UncaughtErrorEvents';

export interface ILoader
{
	activeStage: Stage;

	stage: Stage;

	content: DisplayObject;

	uncaughtErrorEvents: UncaughtErrorEvents;
}