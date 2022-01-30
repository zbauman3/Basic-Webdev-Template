import * as path from "path";

export = {
	apps : [
		{
			name: 'webServer',
			autorestart: true,
			script: path.resolve(__dirname, './index.js'),
			cwd: path.resolve(__dirname),
			instances: 1,
			exec_mode: 'fork',
			interpreter_args: [],
			env: {
				"NODE_ENV": process.env.NODE_ENV
			}
		}
	]
};