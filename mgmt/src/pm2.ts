import { $, argv, cd, chalk } from 'zx';
import { rootPath } from "./shared";
import { spawnSync } from "child_process";

(async ()=>{

	cd(rootPath);

	let [, argument] = argv._;

	if(argument === 'use-webpack-serve'){

		await $`docker exec ${(process.stdout.isTTY ? '-ti' : '-i')} nodeWebServer npx pm2 trigger webServer use-webpack-serve`;
		process.exit(0);

	}

	if(argument === 'use-webpack-bundle'){

		await $`docker exec ${(process.stdout.isTTY ? '-ti' : '-i')} nodeWebServer npx pm2 trigger webServer use-webpack-bundle`;
		process.exit(0);

	}

	//mimic `zx` logging
	console.log(`$ ${chalk.green('docker')} exec ${(process.stdout.isTTY ? '-ti' : '-i')} nodeWebServer npx pm2 ${process.argv.slice(3).join(' ')}`);

	//using spawn sync so that we can 'inherit' stdio. zx doesnt allow this currently.
	const {status, signal, error} = spawnSync(`docker`, [
		'exec',
		(process.stdout.isTTY ? '-ti' : '-i'),
		'nodeWebServer',
		'npx',
		'pm2',
		...process.argv.slice(3)
	], { stdio: 'inherit' });

	if(!!error){
		throw error;
	}

	if(!!signal){
		throw new Error(signal);
	}

	process.exit(typeof status !== 'number' ? 0 : status);

})();