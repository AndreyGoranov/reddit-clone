"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const default_1 = require("./default");
const Post_1 = require("./entities/Post");
const main = async () => {
    const orm = await core_1.MikroORM.init({
        entities: [Post_1.Post],
        dbName: 'postgres',
        debug: !default_1.__prod__,
        type: 'postgresql',
        password: 'amb093',
    });
    const post = orm.em.fork({}).create(Post_1.Post, { title: 'my first page' });
};
main();
console.log('asd12345');
//# sourceMappingURL=index.js.map