import React from 'react';
import ReactDOM from 'react-dom';
import DeviceInfoProvider from "./providers/DeviceInfoProvider";
import ThemeProvider from "./providers/ThemeProvider";

const App: React.FC = ()=>{

	return (
		<DeviceInfoProvider>
			<ThemeProvider>
				Basic Webdev Template
			</ThemeProvider>
		</DeviceInfoProvider>
	);

};
App.displayName = 'App';

ReactDOM.render(<App />, document.getElementById('root'));