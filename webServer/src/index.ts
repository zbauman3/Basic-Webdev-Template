import app from "./express/app";
import config from "../../shared/dist/config";

app.listen(config.ports.webServer, '0.0.0.0', ()=>{

	console.log(`Webserver Listening on port ${config.ports.webServer}. ${config.env.WEBPACK_DEV_SERVER}=${process.env[config.env.WEBPACK_DEV_SERVER]}`);

});