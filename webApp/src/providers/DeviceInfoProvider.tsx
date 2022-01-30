import React from "react";
import { isMobile, getThemeMode, listenForThemeModeChange } from "../util/deviceInfo";
import type { DeviceInfo } from "../types/theme";

const initValue = {
	themeMode: getThemeMode(),
	mobile: isMobile()
};

export const DeviceInfoContext = React.createContext<DeviceInfo>(initValue);
export const useDeviceInfoContext = ()=>React.useContext(DeviceInfoContext);

const DeviceInfoProvider: React.FC = ({children})=>{

	//state for the context
	const [deviceInfo, setDeviceInfo] = React.useState(initValue);

	React.useEffect(()=>{

		//listenForThemeModeChange returns a cleanup function. Return that here
		//to cleanup on dismount. The callback updates the themeMode.
		return listenForThemeModeChange((themeMode)=>{

			setDeviceInfo((current)=>({
				...current,
				themeMode: themeMode
			}));

		});

	}, []);

	return (
		<DeviceInfoContext.Provider value={deviceInfo}>
			{children}
		</DeviceInfoContext.Provider>
	);

};
DeviceInfoProvider.displayName = 'DeviceInfoProvider';

export default DeviceInfoProvider;