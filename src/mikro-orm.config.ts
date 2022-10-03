const { __prod__ } = require("./default");
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

//Parameters retunrs Array so we use the first item
export default {
  entities: [Post],
  dbName: "lireddit",
  debug: !__prod__,
  type: "postgresql",
  password: "amb093",
  allowGlobalContext: true,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pathTs: "src/migrations",
    glob: "!(*.d).{js,ts}",
  },
} as Parameters<typeof MikroORM.init>[0];
