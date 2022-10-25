const { __prod__, database } = require("./default");
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import { TSMigrationGenerator } from "@mikro-orm/migrations";
import { User } from "./entities/User";

//Parameters retunrs Array so we use the first item
export default {
  entities: [Post, User],
  dbName: "reddit",
  host: 'database-1.coxpeg2fsoy1.us-east-1.rds.amazonaws.com',
  debug: !__prod__,
  portt: 5432,
  type: "postgresql",
  password: database.password,
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
