import { $, cd, argv, path } from 'zx';
import { rootPath, config } from "./shared";

(async ()=>{

	cd(rootPath);

	let [, argument] = argv._;

	if(argument === 'serve'){

		await $`npx zx ${path.resolve(__dirname, './pm2.js')} use-webpack-serve`;
		await $`${config.env.WEBPACK_DEV_SERVER}=true npx webpack serve --config ./webApp/webpack.config.js`;
		process.exit(0);

	}

	await $`${config.env.WEBPACK_DEV_SERVER}=false npx webpack --config ./webApp/webpack.config.js`;
	process.exit(0);

})();