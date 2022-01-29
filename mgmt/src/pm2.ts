import { $, argv, cd } from 'zx';
import { rootPath, config } from "./shared";

(async ()=>{

	cd(rootPath);

	let [, argument] = argv._;

	if(argument === 'use-webpack-serve'){

		await $`docker exec ${(process.stdout.isTTY ? '-ti' : '-i')} -e ${config.env.WEBPACK_DEV_SERVER}=true nodeWebServer npx pm2 restart -a webServer`;
		process.exit(0);

	}

	if(argument === 'use-webpack-bundle'){

		await $`docker exec ${(process.stdout.isTTY ? '-ti' : '-i')} -e ${config.env.WEBPACK_DEV_SERVER}=false nodeWebServer npx pm2 restart -a webServer`;
		process.exit(0);

	}

	const {_: [, ...args], ...rest} = argv;

	const parsedArgs = Object.entries(rest).map(([k,v])=>(
		`${k.length > 1 ? '--' : '-'}${k}${v !== undefined && typeof v !== 'boolean' && (typeof v !== 'string' || v.length > 0) ? `=${v}` : ''}`
	));

	await $`docker exec ${(process.stdout.isTTY ? '-ti' : '-i')} nodeWebServer npx pm2 ${parsedArgs} ${args}`;
	process.exit(0);

})();