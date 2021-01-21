import { ActivityEvent } from './ActivityEvent';
export class FullScreenEvent extends ActivityEvent {

	static classInitializer: any = null;

	static classSymbols: string [] = null;
	static instanceSymbols: string [] = null;

	fullScreen: boolean;
	interactive: boolean;

	constructor(type: string, bubbles: boolean = false, cancelable: boolean = false,
		fullScreen: boolean = false, interactive: boolean = false) {
		super(type, bubbles, cancelable);
		this.fullScreen = !!fullScreen;
		this.interactive = !!interactive;
	}

	// JS -> AS Bindings
	static FULL_SCREEN: string = 'fullScreen';
	static FULL_SCREEN_INTERACTIVE_ACCEPTED: string = 'fullScreenInteractiveAccepted';
}