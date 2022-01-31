import React from 'react';
import ReactDOM from 'react-dom';
import QueryClientProvider from "./providers/QueryClientProvider";
import DeviceInfoProvider from "./providers/DeviceInfoProvider";
import ThemeProvider from "./providers/ThemeProvider";


/** TMP COMPONENT */
import { usePing } from "./api/ping";
import { useDeviceInfoContext } from "./providers/DeviceInfoProvider";
const TMP: React.FC = ()=>{

	const pingQuery = usePing();
	const deviceInfo = useDeviceInfoContext();

	return (
		<>
			<div>
				PING:{"\u00A0"}
				{(pingQuery.isLoading
					? 'Loading...'
					: pingQuery.isError
						? JSON.stringify(pingQuery.error)
						: pingQuery.data
				)}
			</div>
			<div>
				Device type: {deviceInfo.mobile ? 'mobile': 'not mobile'}
			</div>
			<div>
				Theme mode: {deviceInfo.themeMode}
			</div>
		</>
	);

};
/** TMP COMPONENT */


const App: React.FC = ()=>{

	return (
		<QueryClientProvider>
			<DeviceInfoProvider>
				<ThemeProvider>
					Basic Webdev Template
					<TMP />
				</ThemeProvider>
			</DeviceInfoProvider>
		</QueryClientProvider>
	);

};
App.displayName = 'App';

ReactDOM.render(<App />, document.getElementById('root'));