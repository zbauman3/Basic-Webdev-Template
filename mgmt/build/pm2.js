"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zx_1 = require("zx");
const shared_1 = require("./shared");
(async () => {
    (0, zx_1.cd)(shared_1.rootPath);
    let [, argument] = zx_1.argv._;
    if (argument === 'use-webpack-serve') {
        await (0, zx_1.$) `docker exec ${(process.stdout.isTTY ? '-ti' : '-i')} -e ${shared_1.config.env.WEBPACK_DEV_SERVER}=true nodeWebServer npx pm2 restart -a webServer`;
        process.exit(0);
    }
    if (argument === 'use-webpack-bundle') {
        await (0, zx_1.$) `docker exec ${(process.stdout.isTTY ? '-ti' : '-i')} -e ${shared_1.config.env.WEBPACK_DEV_SERVER}=false nodeWebServer npx pm2 restart -a webServer`;
        process.exit(0);
    }
    const { _: [, ...args], ...rest } = zx_1.argv;
    const parsedArgs = Object.entries(rest).map(([k, v]) => (`${k.length > 1 ? '--' : '-'}${k}${v !== undefined && typeof v !== 'boolean' && (typeof v !== 'string' || v.length > 0) ? `=${v}` : ''}`));
    await (0, zx_1.$) `docker exec ${(process.stdout.isTTY ? '-ti' : '-i')} nodeWebServer npx pm2 ${parsedArgs} ${args}`;
    process.exit(0);
})();
