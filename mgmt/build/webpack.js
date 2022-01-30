"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zx_1 = require("zx");
const shared_1 = require("./shared");
(async () => {
    (0, zx_1.cd)(shared_1.rootPath);
    let [, argument] = zx_1.argv._;
    if (argument === 'serve') {
        await (0, zx_1.$) `npm run pm2 -- use-webpack-serve`;
        console.log(`\r\nDon't forget to run ${zx_1.chalk.blue('npm run pm2 -- use-webpack-bundle')} to switch back to using the Webpack bundle.\r\n`);
        process.env[shared_1.config.env.WEBPACK_DEV_SERVER] = "true";
        await (0, zx_1.$) `npx webpack serve --color --config ./webApp/webpack.config.js`;
        process.exit(0);
    }
    await (0, zx_1.$) `npx webpack --color --config ./webApp/webpack.config.js`;
    process.exit(0);
})();
