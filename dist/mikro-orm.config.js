"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { __prod__, database } = require("./default");
const Post_1 = require("./entities/Post");
const migrations_1 = require("@mikro-orm/migrations");
const User_1 = require("./entities/User");
exports.default = {
    entities: [Post_1.Post, User_1.User],
    dbName: "lireddit",
    debug: !__prod__,
    type: "postgresql",
    password: database.password,
    allowGlobalContext: true,
    migrations: {
        tableName: 'myschema.mikro_orm_migrations',
        path: "dist/migrations",
        pathTs: "src/migrations",
        transactional: true,
        generator: migrations_1.TSMigrationGenerator,
        snapshot: true,
    },
};
//# sourceMappingURL=mikro-orm.config.js.map