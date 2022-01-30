"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zx_1 = require("zx");
const shared_1 = require("./shared");
(async () => {
    (0, zx_1.cd)(shared_1.rootPath);
    let [, argument] = zx_1.argv._;
    let didOne = false;
    if (!argument) {
        argument = 'all';
    }
    const force = (!!zx_1.argv['f'] || !!zx_1.argv['force'] ? '--force' : '');
    const watch = (argument !== 'all' && (!!zx_1.argv['w'] || !!zx_1.argv['watch']) ? '--watch' : '');
    if (argument === 'shared' || argument === 'all') {
        await (0, zx_1.$) `npx tsc -b ${force} ${watch} ./shared/`;
        didOne = true;
    }
    if (argument === 'webApp' || argument === 'all') {
        await (0, zx_1.$) `npx tsc -b ${force} ${watch} ./webApp/`;
        didOne = true;
    }
    if (argument === 'webServer' || argument === 'all') {
        await (0, zx_1.$) `npx tsc -b ${force} ${watch} ./webServer/`;
        didOne = true;
    }
    if (didOne) {
        process.exit(0);
    }
    console.warn(zx_1.chalk.red('The argument must be must be "shared", "webApp", "webServer" or "all".'));
    process.exit(1);
})();
