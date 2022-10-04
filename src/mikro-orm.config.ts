const { __prod__ } = require("./default");
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import { TSMigrationGenerator } from "@mikro-orm/migrations";
import { User } from "./entities/User";

//Parameters retunrs Array so we use the first item
export default {
  entities: [Post, User],
  dbName: "lireddit",
  debug: !__prod__,
  type: "postgresql",
  password: "amb093",
  allowGlobalContext: true,
  migrations: {
    tableName: 'myschema.mikro_orm_migrations',
    path: "dist/migrations",
    pathTs: "src/migrations",
    transactional: true,
    generator: TSMigrationGenerator,
    snapshot: true,

  },
} as Parameters<typeof MikroORM.init>[0];
