import { ConfigManager }  from '@awayjs/core';

export interface IPlayerGlobalSettings {

	ENABLE_FILE_PICKER: boolean;
}

export const Settings: IPlayerGlobalSettings = ConfigManager.instance.addStore<any>('playerglobal',{

	/**
	 * @description Enable experimental File Picker
	 */
	ENABLE_FILE_PICKER: true,

});