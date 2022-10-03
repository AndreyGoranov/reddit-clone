"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const Post_1 = require("./entities/Post");
const { port } = require("./default");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const EntityManager = orm.em.fork({});
    const post = EntityManager.create(Post_1.Post, { title: "my first page" });
    EntityManager.persistAndFlush(post);
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver],
            validate: false,
        }),
        context: () => ({ em: EntityManager }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    console.log(app.get("port"));
    app.get("/", (_, res) => {
        res.send("Home page");
    });
    app.listen(4000, () => {
        console.log(`server started on port ${port}`);
    });
};
main();
//# sourceMappingURL=index.js.map