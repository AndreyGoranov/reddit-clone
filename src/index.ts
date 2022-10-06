import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
// import { Post } from "./entities/Post";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import { createClient } from "redis";
import { MyContext } from "./types";
declare module 'express-session' {
  export interface SessionData {
    userId: number;
    testProp: string;
  }
}
const { port, redis, __prod__ } = require("./default");

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const EntityManager = orm.em.fork({});
  // const post = EntityManager.create(Post, { title: "my first page" } as Post);
  // EntityManager.persistAndFlush(post);

  const app = express();
  
  
  const RedisStore = require("connect-redis")(session);
  const redisClient = createClient({ legacyMode: true });
  redisClient.connect().then(() => console.log('connected to redis')).catch(console.error);
  
  app.use(
    session({
      name: 'ambo',
      store: new RedisStore({ client: redisClient, disableToch: true }),
      saveUninitialized: false,
      secret: redis.secret,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // ten years,
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, HelloResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: EntityManager, req, res }),
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
