# Basic-Webdev-Template
A basic template for starting a web development project.

## Structure
The package is divided into multiple directories: `webServer`, `webApp`, `mgmt`, and `shared`. The names for `webServer`, `webApp`, `shared` describe the code they contain, `mgmt` contains management scripts for the package.

## Management Scripts
`npm run <SCRIPT> -- [OPTS] [ARGS]`

### `tsc`
the `tsc` script will compile the TypeScript for all directories. Optionally you can pass a single argument of `shared`, `webApp`, or `webServer` to work with only those directories. Last, you can pass the `-f`/`--force` option and the `-w`/`--watch` option.

### `docker`
The `docker` script is for interacting with the Docker web server. It takes one argument of `start` or `stop`.

### `pm2`
The `pm2` script is for interacting with the Docker's [PM2](https://pm2.keymetrics.io/) process. It has two arguments that control how the web server serves the web app bundle. `use-webpack-serve` will make the web server use the [Webpack dev server](https://webpack.js.org/configuration/dev-server/) bundle. `use-webpack-bundle` will make the web server use Webpack's output bundle. If neither of those arguments are passed, then all options and arguments are passed on to the PM2 process running inside the Docker.

### `webpack`
The `webpack` script is for interacting with Webpack. With no arguments, it will build the web app bundle. With a single argument of `serve`, it will start the Webpack dev server and run `npm run pm2 -- use-webpack-serve`.