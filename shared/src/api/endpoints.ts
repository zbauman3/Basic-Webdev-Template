import { z } from "zod";

export type Path = `/${string}`;
export type Methods = 'GET' | 'DELETE' | 'POST' | 'PATCH';
export type Request = {
	query?: z.SomeZodObject,
	body?: z.ZodTypeAny
};
export type Response = (
	{
		code: 200,
		body: z.ZodTypeAny
	}|{
		code: 204,
		body?: undefined
	}
);

/** Just a typing function */
function createEndpoint<
	TP extends Path = Path,
	TM extends Methods = Methods,
	TI extends Request = Request,
	TR extends Response = Response,
>(endpoint: { path: TP, method: TM, request: TI, response: TR }):{ path: TP, method: TM, request: TI, response: TR };
function createEndpoint(endpoint: { path: Path, method: Methods, request: Request, response: Response }){ return endpoint; };

export type Endpoint = ReturnType<typeof createEndpoint>;

/** Infers the types of an Endpoint */
export type InferEndpoint<EP extends Endpoint> = {
	path: EP['path'],
	method: EP['method'],
	request: {
		query: EP['request']['query'] extends z.SomeZodObject ? z.infer<EP['request']['query']> : undefined
		body: EP['request']['body'] extends z.ZodTypeAny ? z.infer<EP['request']['body']> : undefined
	},
	response: {
		code: EP['response']['code'],
		body: EP['response']['code'] extends 204 ? undefined : EP['response']['body'] extends z.ZodTypeAny ? z.infer<EP['response']['body']> : undefined
	}
};

/** Infers the types of all Endpoints */
export type InferAllEndpoints<T extends Record<string, Endpoint>> = { [K in keyof T]: InferEndpoint<T[K]> };

/** All API endpoints, by name keys */
const endpoints = {
	ping: createEndpoint({
		path: '/ping',
		method: 'GET',
		request: {},
		response: {
			code: 200,
			body: z.literal('PONG')
		}
	})
} as const;

/** All API endpoints, by name keys */
export default endpoints;

/** All API endpoints, by name keys */
export type Endpoints = InferAllEndpoints<typeof endpoints>;