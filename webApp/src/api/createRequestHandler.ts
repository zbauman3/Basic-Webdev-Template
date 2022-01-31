import type { Endpoint, InferEndpoint } from "../../../shared/dist/api/endpoints";
import config from "../../../shared/dist/config";
import type { QueryFunction } from "react-query";

type PartialFetchOpts = Partial<Omit<Exclude<Parameters<typeof fetch>[1], undefined>, 'method' | 'body'>>

/** Takes an object and converts it to a query string */
const objectToQueryString = (data?: Record<string, any>)=>{

	let stringRes = '';

	//can't do anything with these
	if(data === undefined || typeof data !== 'object' || data === null){
		return stringRes;
	}

	//add the key/values to the string
	for(const [k, v] of Object.entries(data)){

		//get a string version of whatever value this is
		const parsedV = (v === undefined
			? ''
			: JSON.stringify(v)
		);

		stringRes += `${stringRes.length > 0 ? '&' : ''}${encodeURIComponent(k)}=${encodeURIComponent(parsedV)}`;

	}

	return stringRes;

};

/** Takes an endpoint, returns a handler function for use with React-Query  */
export default function createRequestHandler<EP extends Endpoint>(endpoint: EP, opts?: PartialFetchOpts):QueryFunction<InferEndpoint<EP>['response']['body'], [any, InferEndpoint<EP>['request']]>;
export default function createRequestHandler<EP extends Endpoint>(endpoint: EP, opts?: PartialFetchOpts){

	//using a variable instead of direct return so that I can type the function as a whole
	const queryFn: QueryFunction<InferEndpoint<EP>['response']['body'], [any, InferEndpoint<EP>['request']]> = async ({ queryKey: [_, request] })=>{

		let queryData: string | undefined = undefined;
		let bodyData: string | undefined = undefined;

		//pre-check the data to stop a request early that doesn't need to be sent
		if(endpoint.request.query !== undefined){

			const parsedQuery = endpoint.request.query.safeParse(request.query);

			if(!parsedQuery.success){
				throw parsedQuery.error;
			}

			queryData = objectToQueryString(parsedQuery.data);

			if(queryData.length > 0){
				queryData = '?'+queryData;
			}

		}

		//pre-check the data to stop a request early that doesn't need to be sent
		if(endpoint.request.body !== undefined){
	
			const parsedRequestBody = endpoint.request.body.safeParse(request.body);

			if(!parsedRequestBody.success){
				throw parsedRequestBody.error;
			}

			bodyData = JSON.stringify(parsedRequestBody.data);
	
		}

		//await the request
		const result = await fetch(`${config.proto}://${config.host}:${config.ports.webServer}${endpoint.path}${queryData || ''}`, {
			...opts,
			method: endpoint.method,
			body: bodyData,
			headers: {
				...opts?.headers,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		});

		//throw the error text
		if(!result.ok){
			throw new Error(result.statusText);
		}

		//if the status code does not match the expected result.
		if(result.status !== endpoint.response.code){
			throw new Error(`Status code ${result.status} does not equal ${endpoint.response.code}.`);
		}

		//if no response was expected, exit early
		if(endpoint.response.body === undefined){
			return;
		}

		//parse the result data
		const parsedData = endpoint.response.body.safeParse( await result.json() );

		if(!parsedData.success){
			throw parsedData.error;
		}

		return parsedData.data;

	};

	return queryFn;

};

export type RequestHandler = ReturnType<typeof createRequestHandler>;