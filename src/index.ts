import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./default";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const EntityManager = orm.em.fork({});
  const post = EntityManager.create(Post, { title: "my first page" } as Post);
  EntityManager.persistAndFlush(post);
  console.log("done");
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({em: EntityManager}),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("Home page");
  });

  app.listen(4000, () => {
    console.log("server started on port 4000");
  });
};

main();

console.log("asd12345");
