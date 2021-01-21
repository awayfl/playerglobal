import { axCoerceString } from '@awayfl/avm2';

export interface IFSCommandListener {
	executeFSCommand(command: string, args: string);
}

export function fscommand(sec: any, command: string, args: string): void {
	command = axCoerceString(command);
	args = axCoerceString(args);
	console.log('FSCommand: ' + command + '; ' + args);
	command = command.toLowerCase();
	if (command === 'debugger') {
		/* tslint:disable */
		debugger;
		/* tslint:enable */
		return;
	}

	(<any>sec).player.executeFSCommand(command, args);
}
