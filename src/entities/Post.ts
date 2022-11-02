import {
  Entity,
  ManyToOne,
  // OptionalProps,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";
import { User } from "./User";

// Field is used to expose whatever you want to the graphql schema or hide it if ommit

@ObjectType()
@Entity()
export class Post {
  // [OptionalProps]?: "title" | "updatedAt" | "createdAt"| "body";

  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @ManyToOne()
  creator: User;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => String!)
  @Property({ type: "text" })
  title: string;

  @Field(() => String!)
  @Property({ type: "text" })
  body: string;
}
