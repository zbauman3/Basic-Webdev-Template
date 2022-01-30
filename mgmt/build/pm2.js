"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zx_1 = require("zx");
const shared_1 = require("./shared");
const child_process_1 = require("child_process");
(async () => {
    (0, zx_1.cd)(shared_1.rootPath);
    let [, argument] = zx_1.argv._;
    if (argument === 'use-webpack-serve') {
        await (0, zx_1.$) `docker exec ${(process.stdout.isTTY ? '-ti' : '-i')} nodeWebServer npx pm2 trigger webServer use-webpack-serve`;
        process.exit(0);
    }
    if (argument === 'use-webpack-bundle') {
        await (0, zx_1.$) `docker exec ${(process.stdout.isTTY ? '-ti' : '-i')} nodeWebServer npx pm2 trigger webServer use-webpack-bundle`;
        process.exit(0);
    }
    //mimic `zx` logging
    console.log(`$ ${zx_1.chalk.green('docker')} exec ${(process.stdout.isTTY ? '-ti' : '-i')} nodeWebServer npx pm2 ${process.argv.slice(3).join(' ')}`);
    //using spawn sync so that we can 'inherit' stdio. zx doesnt allow this currently.
    const { status, signal, error } = (0, child_process_1.spawnSync)(`docker`, [
        'exec',
        (process.stdout.isTTY ? '-ti' : '-i'),
        'nodeWebServer',
        'npx',
        'pm2',
        ...process.argv.slice(3)
    ], { stdio: 'inherit' });
    if (!!error) {
        throw error;
    }
    if (!!signal) {
        throw new Error(signal);
    }
    process.exit(typeof status !== 'number' ? 0 : status);
})();
