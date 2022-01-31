import { $, cd, argv, chalk } from 'zx';
import { rootPath } from "./shared";

(async ()=>{

	cd(rootPath);

	let [, argument] = argv._;

	if(argument === 'serve'){

		await $`npm run pm2 -- use-webpack-serve`;
		console.log(`\r\nDon't forget to run ${chalk.blue('npm run pm2 -- use-webpack-bundle')} to switch back to using the Webpack bundle.\r\n`);
		await $`npx webpack serve --color --config ./webApp/webpack.config.js`;
		process.exit(0);

	}

	await $`npx webpack --color --config ./webApp/webpack.config.js`;
	process.exit(0);

})();