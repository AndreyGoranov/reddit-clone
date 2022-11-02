import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import Redis from "ioredis";
import { MyContext } from "./types";
import { sendEmail } from "./utils/sendEmail";
declare module "express-session" {
  export interface SessionData {
    userId: number;
    testProp: string;
  }
}
const { port, redisDependencies, __prod__ } = require("./default");

const main = async () => {
  await sendEmail("Sup", "agoranovreff@gmail.com");
  const orm = await MikroORM.init(microConfig);
  // await orm.em.nativeDelete(User, {}); // use to reset User Table
  // await orm.em.nativeDelete(Post, {}); // use to reset Post Table
  await orm.getMigrator().up();
  const EntityManager = orm.em.fork({});

  const app = express();
  app.set("trust proxy", true);

  const RedisStore = require("connect-redis")(session);
  const redisClient = new Redis();

  app.use(
    session({
      name: "ambo",
      store: new RedisStore({ client: redisClient, disableToch: true }),
      saveUninitialized: false,
      secret: redisDependencies.secret,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // ten years,
        httpOnly: true,
        sameSite: "none", // lax csrf
        secure: true || __prod__, //__prod__,  cookie only works in https
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, HelloResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
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
        "http://44.204.188.109:3000",
        "*",
      ],
      methods: "GET,PUT,POST,DELETE",
    },
  });

  app.get("/", (req, res) => {
    res.send("Home page");
  });

  app.listen(4000, () => {
    console.log(`server started on port ${port}`);
  });
};

main();
