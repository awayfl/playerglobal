import { ASObject } from '@awayfl/avm2';
//import { ASFunction } from '@awayfl/avm2';
import { axCoerceString } from '@awayjs/graphics';

export class Telemetry extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string[] = null; // [];

	constructor() {
		super();
	}

	// static _spanMarker: number;
	// static _connected: boolean;
	get spanMarker(): number {
		return 0;
	}

	get connected(): boolean {
		return false;
	}

	static sendMetric(metric: string, value: any): void {
		metric = axCoerceString(metric);
	}

	static sendSpanMetric(metric: string, startSpanMarker: number, value: any = null): void {
		metric = axCoerceString(metric); startSpanMarker = +startSpanMarker;
	}

	static registerCommandHandler(commandName: string, handler: ASFunction): boolean {
		commandName = axCoerceString(commandName);
		return false;
	}

	static unregisterCommandHandler(commandName: string): boolean {
		commandName = axCoerceString(commandName);
		return false;
	}

}
