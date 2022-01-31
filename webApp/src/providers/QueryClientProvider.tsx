import React from "react";
import { QueryClientProvider as RQQueryClientProvider } from 'react-query';
import QueryClient from "../api/QueryClient";

const QueryClientProvider: React.FC = ({children})=>{

	return (
		<RQQueryClientProvider client={QueryClient}>
			{children}
		</RQQueryClientProvider>
	);

};
QueryClientProvider.displayName = 'QueryClientProvider';

export default QueryClientProvider;