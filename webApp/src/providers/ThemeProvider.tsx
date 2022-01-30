import React from "react";
import type { MainTheme } from "../types/theme";
import { ThemeProvider as JSSThemeProvider, createUseStyles } from 'react-jss';
import { useDeviceInfoContext } from "./DeviceInfoProvider";

const useGlobalStyles = createUseStyles({
	"@global": {
		body: {
			margin: 0,
			fontFamily: "'Roboto', sans-serif",
			boxSizing: 'border-box',
			'& *': {
				fontFamily: "'Roboto', sans-serif",
				boxSizing: 'border-box',
			}
		}
	}
});

const ThemeProvider: React.FC = ({children})=>{

	useGlobalStyles();

	const deviceInfo = useDeviceInfoContext();

	const theme = React.useMemo<MainTheme>(()=>({
		deviceInfo: deviceInfo
	}), [deviceInfo]);

	//adds the Roboto font. removes it on unmount
	React.useLayoutEffect(()=>{

		const fontLink = document.createElement('link');
		fontLink.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
		fontLink.rel = "stylesheet";

		document.head.appendChild(fontLink);

		return ()=>{
			fontLink.remove();
		};

	}, []);

	return (
		<JSSThemeProvider theme={theme}>
			{children}
		</JSSThemeProvider>
	);

};
ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;