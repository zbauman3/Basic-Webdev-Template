"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootPath = exports.config = void 0;
const zx_1 = require("zx");
const config_1 = __importDefault(require("../../shared/dist/config"));
exports.config = config_1.default;
exports.rootPath = zx_1.path.resolve(__dirname, '../../');
