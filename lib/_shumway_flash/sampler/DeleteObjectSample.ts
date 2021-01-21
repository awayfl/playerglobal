import { Sample } from '../../sampler/Sample';

export class DeleteObjectSample extends Sample {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string[] = null; // [];

	constructor() {
		super();
	}

	id: number = undefined;
	size: number = undefined;
}
