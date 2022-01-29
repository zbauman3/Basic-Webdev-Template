"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zx_1 = require("zx");
const shared_1 = require("./shared");
(async () => {
    (0, zx_1.cd)(shared_1.rootPath);
    let [, argument] = zx_1.argv._;
    if (argument === 'serve') {
        await (0, zx_1.$) `npx zx ${zx_1.path.resolve(__dirname, './pm2.js')} use-webpack-serve`;
        await (0, zx_1.$) `${shared_1.config.env.WEBPACK_DEV_SERVER}=true npx webpack serve --config ./webApp/webpack.config.js`;
        process.exit(0);
    }
    await (0, zx_1.$) `${shared_1.config.env.WEBPACK_DEV_SERVER}=false npx webpack --config ./webApp/webpack.config.js`;
    process.exit(0);
})();
