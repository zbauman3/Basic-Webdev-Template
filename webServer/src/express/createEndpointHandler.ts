import type { Endpoint, InferEndpoint } from "../../../shared/dist/api/endpoints";
import type { Request, Response } from "express";

/** Takes an endpoint and handler function, returns a handler object for use with Express  */
export default function createEndpointHandler<EP extends Endpoint>(
	endpoint: EP,
	handler: (req: { input: InferEndpoint<EP>['request'] })=>Promise<InferEndpoint<EP>['response']['body']>
):{
	path: EP['path'],
	method: Lowercase<EP['method']>,
	handler: (request: Request, response: Response)=>void
};
export default function createEndpointHandler<EP extends Endpoint>(
	endpoint: EP,
	handler: (req: { input: InferEndpoint<EP>['request'] })=>Promise<InferEndpoint<EP>['response']['body']>
){

	return {
		path: endpoint.path,
		method: endpoint.method.toLowerCase(),
		handler: async (request: Request, response: Response)=>{

			let queryData: InferEndpoint<EP>['request']['query'] = undefined;
			let bodyData: InferEndpoint<EP>['request']['body'] = undefined;
	
			//validate the request query data
			if(endpoint.request.query !== undefined){
	
				const parsedQuery = endpoint.request.query.safeParse(request.query);

				if(!parsedQuery.success){
	
					response
					.status(400)
					.json('Request query data was not valid.')
					.end();
	
					return;
	
				}

				queryData = parsedQuery.data;
	
			}
	
			//validate the request body data
			if(endpoint.request.body !== undefined){
		
				const parsedRequestBody = endpoint.request.body.safeParse(request.body);

				if(!parsedRequestBody.success){
	
					response
					.status(400)
					.json('Request body data was not valid.')
					.end();
					return;
	
				}

				bodyData = parsedRequestBody.data;
		
			}
	
			try{
	
				//await the handler
				const result = await handler({
					input: {
						query: queryData,
						body: bodyData
					}
				});
	
				//send the response
				response.status(endpoint.response.code).json(result).end();
	
			}catch(e){
	
				response
				.status(500)
				.json(e instanceof Error
					? e.message
					: 'System error'
				)
				.end();
	
			}
	
		}
	};

};

export type EndpointHandler = ReturnType<typeof createEndpointHandler>;