import { ASObject } from '@awayfl/avm2';

export class VertexBuffer3D extends ASObject {

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

	// AS -> JS Bindings

	uploadFromVector(data: ASVector<any>, startVertex: number /*int*/, numVertices: number /*int*/): void {
		data = data; startVertex = startVertex | 0; numVertices = numVertices | 0;
		release || notImplemented('public flash.display3D.VertexBuffer3D::uploadFromVector'); return;
	}

	uploadFromByteArray(data: flash.utils.ByteArray, byteArrayOffset: number /*int*/, startVertex: number /*int*/, numVertices: number /*int*/): void {
		data = data; byteArrayOffset = byteArrayOffset | 0; startVertex = startVertex | 0; numVertices = numVertices | 0;
		release || notImplemented('public flash.display3D.VertexBuffer3D::uploadFromByteArray'); return;
	}

	dispose(): void {
		release || notImplemented('public flash.display3D.VertexBuffer3D::dispose'); return;
	}
}
