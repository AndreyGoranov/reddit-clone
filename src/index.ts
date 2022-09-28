import { MikroORM, RequiredEntityData } from "@mikro-orm/core";
import { __prod__ } from "./default";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: 'postgres',
    debug: !__prod__,
    type: 'postgresql',
    password: 'amb093',
    allowGlobalContext: true,
  });
  const EntityManager = orm.em.fork({});
  const post = EntityManager.create(Post, { title: 'my first page' } as Post) ;
  EntityManager.persistAndFlush(post);
  console.log('done');
}

main();


console.log('asd12345');