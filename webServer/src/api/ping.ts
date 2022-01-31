import endpoints from "../../../shared/dist/api/endpoints";
import createEndpointHandler from "../express/createEndpointHandler";

export default createEndpointHandler(
	endpoints.ping,
	async ()=>'PONG' as 'PONG'
);