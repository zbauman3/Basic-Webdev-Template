"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zx_1 = require("zx");
const shared_1 = require("./shared");
(async () => {
    (0, zx_1.cd)(shared_1.rootPath);
    let [, argument] = zx_1.argv._;
    if (!argument) {
        argument = 'start';
    }
    if (argument === 'start') {
        await (0, zx_1.$) `docker compose -f ./docker/docker-compose.yml up --build -d`;
        process.exit(0);
    }
    if (argument === 'stop') {
        await (0, zx_1.$) `docker compose -f ./docker/docker-compose.yml down`;
        process.exit(0);
    }
    console.warn(zx_1.chalk.red('The argument must be must be "start" or "stop".'));
    process.exit(1);
})();
