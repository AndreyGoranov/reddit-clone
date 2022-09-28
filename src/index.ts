import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./default";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(
    microConfig
  );
  await orm.getMigrator().up();
  const EntityManager = orm.em.fork({});
  const post = EntityManager.create(Post, { title: 'my first page' } as Post) ;
  EntityManager.persistAndFlush(post);
  console.log('done');
}

main();


console.log('asd12345');