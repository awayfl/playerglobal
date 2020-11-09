import { ASObject } from '@awayfl/avm2';

export class ShaderParameterType extends ASObject {

	// Called whenever the class is initialized.
	public static classInitializer: any = null;

	// List of static symbols to link.
	public static classSymbols: string [] = null; // [];

	// List of instance symbols to link.
	public static instanceSymbols: string [] = null; // [];

	constructor () {
		super();
	}

	// JS -> AS Bindings
	public static FLOAT: string = 'float';
	public static FLOAT2: string = 'float2';
	public static FLOAT3: string = 'float3';
	public static FLOAT4: string = 'float4';
	public static INT: string = 'int';
	public static INT2: string = 'int2';
	public static INT3: string = 'int3';
	public static INT4: string = 'int4';
	public static BOOL: string = 'bool';
	public static BOOL2: string = 'bool2';
	public static BOOL3: string = 'bool3';
	public static BOOL4: string = 'bool4';
	public static MATRIX2X2: string = 'matrix2x2';
	public static MATRIX3X3: string = 'matrix3x3';
	public static MATRIX4X4: string = 'matrix4x4';

	// AS -> JS Bindings

}