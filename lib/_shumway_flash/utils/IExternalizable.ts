import { IDataInput } from '../../utils/IDataInput';
import { IDataOutput } from '../../utils/IDataOutput';

export interface IExternalizable {

	// JS -> AS Bindings

	writeExternal: (output: IDataOutput) => void;
	readExternal: (input: IDataInput) => void;

	// AS -> JS Bindings

}