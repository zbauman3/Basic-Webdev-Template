import endpoints from "../../../shared/dist/api/endpoints";
import createRequestHandler from "./createRequestHandler";
import { useQuery } from "react-query";

export const requestHandler = createRequestHandler(endpoints.ping);

export const usePing = ()=>useQuery(['search', { query: undefined, body: undefined }], requestHandler);