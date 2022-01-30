import app from "./express/app";
import config from "../../shared/dist/config";

app.listen(config.ports.webServer, '0.0.0.0', ()=>{

	console.log(`Webserver Listening on port ${config.ports.webServer}...`);

});