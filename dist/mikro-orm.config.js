"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { __prod__ } = require("./default");
const Post_1 = require("./entities/Post");
const path_1 = __importDefault(require("path"));
exports.default = {
    entities: [Post_1.Post],
    dbName: "lireddit",
    debug: !__prod__,
    type: "postgresql",
    password: "amb093",
    allowGlobalContext: true,
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pathTs: "src/migrations",
        glob: "!(*.d).{js,ts}",
    },
};
//# sourceMappingURL=mikro-orm.config.js.map