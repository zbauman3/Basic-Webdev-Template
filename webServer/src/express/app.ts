import express from 'express';
import pmx from "@pm2/io";
import { resolve as resolvePath } from 'path';
import config from "../../../shared/dist/config";

const app = express();

app.disable('x-powered-by');
app.set('query parser', 'simple');

//set the default timeout to 30 seconds
app.use(function(req, res, next){

	res.setTimeout(30000, ()=>{

		if(res.headersSent === true){
			return;
		}

		const method = req.method.toUpperCase();
		if(method === 'POST' || method === 'PATCH'){
			res.sendStatus(408).end();
		}else{
			res.sendStatus(500).end();
		}

	});

	next();

});

app.locals.sendFileLocation = resolvePath(__dirname, '../../../webApp/dist/bundle.js');
app.locals.sendFileOptions = {
	dotfiles: 'deny',
	acceptRanges: false
};

app.locals.bundlePort = config.ports.webServer;

//a PM2 action to start using the webpack dev server
pmx.action('use-webpack-serve', (_: any, reply?: Function)=>{

	app.locals.bundlePort = config.ports.webpack;

	if(typeof reply === 'function'){
		reply(`Success: Using bundle on port ${app.locals.bundlePort}.`);
	}

});

//a PM2 action to start using the webpack bundle
pmx.action('use-webpack-bundle', (_: any, reply?: Function)=>{

	app.locals.bundlePort = config.ports.webServer;

	if(typeof reply === 'function'){
		reply(`Success: Using bundle on port ${app.locals.bundlePort}.`);
	}

});

//javascript files
app.all('/bundle.js', (_, res)=>{

	res.sendFile(app.locals.sendFileLocation, app.locals.sendFileOptions);

});

app.all('*', (_, res)=>{

	res
	.set('Content-Type', 'text/html')
	.status(200)
	.send(`
		<!doctype html>
		<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>Basic Webdev Template</title>
		</head>
		<body>
			<div id="root"></div>
			<script src="http://localhost:${app.locals.bundlePort}/bundle.js"></script>
		</body>
		</html>`.replace(/\t+/g, '')
	)
	.end();

});

export default app;