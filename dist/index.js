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
const ioredis_1 = __importDefault(require("ioredis"));
const sendEmail_1 = require("./utils/sendEmail");
const { port, redisDependencies, __prod__ } = require("./default");
const main = async () => {
    await (0, sendEmail_1.sendEmail)("Sup", "agoranovreff@gmail.com");
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const EntityManager = orm.em.fork({});
    const app = (0, express_1.default)();
    app.set("trust proxy", true);
    const RedisStore = require("connect-redis")(express_session_1.default);
    const redisClient = new ioredis_1.default();
    app.use((0, express_session_1.default)({
        name: "ambo",
        store: new RedisStore({ client: redisClient, disableToch: true }),
        saveUninitialized: false,
        secret: redisDependencies.secret,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "none",
            secure: true || __prod__,
        },
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver, hello_1.HelloResolver, post_1.PostResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            em: EntityManager,
            req,
            res,
            redisClient,
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: [
                "https://studio.apollographql.com",
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "http://0.0.0.0:3000",
            ],
            methods: "GET,PUT,POST,DELETE",
        },
    });
    app.get("/", (req, res) => {
        req.session.testProp = "test my cookie";
        res.send("Home page");
    });
    app.listen(4000, () => {
        console.log(`server started on port ${port}`);
    });
};
main();
//# sourceMappingURL=index.js.map