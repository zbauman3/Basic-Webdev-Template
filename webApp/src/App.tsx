import React from 'react';
import ReactDOM from 'react-dom';
import QueryClientProvider from "./providers/QueryClientProvider";
import DeviceInfoProvider from "./providers/DeviceInfoProvider";
import ThemeProvider from "./providers/ThemeProvider";


/** TMP COMPONENT */
import { usePing } from "./api/ping";
const TMP: React.FC = ()=>{

	const pingQuery = usePing();

	return (
		<div>
			PING:{"\u00A0"}
			{(pingQuery.isLoading
				? 'Loading...'
				: pingQuery.isError
					? JSON.stringify(pingQuery.error)
					: pingQuery.data
			)}
		</div>
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