import type { EndpointHandler } from "./createEndpointHandler";

import pingHandler from "../api/ping";

/** all of the handlers from the `api` folder */
const allEndpointHandlers: EndpointHandler[] = [
	pingHandler
];

export default allEndpointHandlers;