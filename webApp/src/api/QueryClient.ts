import { QueryClient } from 'react-query';

export default new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 10*1000,
		},
	},
});