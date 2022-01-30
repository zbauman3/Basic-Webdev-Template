import { $, argv, chalk, cd } from 'zx';
import { rootPath } from "./shared";

(async ()=>{

	cd(rootPath);

	let [, argument] = argv._;
	let didOne = false;

	if(!argument){
		argument = 'all';
	}

	const force = (!!argv['f'] || !!argv['force'] ? '--force' : '');
	const watch = (argument !== 'all' && (!!argv['w'] || !!argv['watch']) ? '--watch' : '');

	if(argument === 'shared' || argument === 'all'){

		await $`npx tsc -b ${force} ${watch} ./shared/`;
		didOne = true;

	}

	if(argument === 'webApp' || argument === 'all'){

		await $`npx tsc -b ${force} ${watch} ./webApp/`;
		didOne = true;

	}

	if(argument === 'webServer' || argument === 'all'){

		await $`npx tsc -b ${force} ${watch} ./webServer/`;
		didOne = true;

	}

	if(didOne){
		process.exit(0);
	}

	console.warn( chalk.red('The argument must be must be "shared", "webApp", "webServer" or "all".') );
	process.exit(1);

})();