"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const { port, redis, __prod__ } = require("./default");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const EntityManager = orm.em.fork({});
    const app = (0, express_1.default)();
    const RedisStore = require("connect-redis")(express_session_1.default);
    const redisClient = (0, redis_1.createClient)({ legacyMode: true });
    redisClient.connect().then(() => console.log('connected to redis')).catch(console.error);
    app.use((0, express_session_1.default)({
        name: 'ambo',
        store: new RedisStore({ client: redisClient, disableToch: true }),
        saveUninitialized: false,
        secret: redis.secret,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'lax',
            secure: __prod__,
        },
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver, hello_1.HelloResolver, post_1.PostResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: EntityManager, req, res }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.get("/", (req, res) => {
        req.session.testProp = 'test my cookie';
        res.send("Home page");
    });
    app.listen(4000, () => {
        console.log(`server started on port ${port}`);
    });
};
main();
//# sourceMappingURL=index.js.map