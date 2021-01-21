import { ASClass, ASObject } from '@awayfl/avm2';
export class ClassFactory extends ASObject {

	// Called whenever the class is initialized.
	static classInitializer: any = null;

	// List of static symbols to link.
	static classSymbols: string[] = null; // [];

	// List of instance symbols to link.
	static instanceSymbols: string[] = null; // [];

	constructor() {
		super();
	}

	// JS -> AS Bindings
	static StackFrameClass: ASClass = undefined;
	static SampleClass: ASClass = undefined;
	static DeleteObjectSampleClass: ASClass = undefined;
	static NewObjectSampleClass: ASClass = undefined;
}
