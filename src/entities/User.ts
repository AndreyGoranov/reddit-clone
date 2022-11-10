import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";
import { Post } from "./Post";

// Field is used to expose whatever you want to the graphql schema or hide it if ommit

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => [Post])
  @ManyToMany(() => Post, "likedBy")
  likedPosts = new Collection<Post>(this);

  @ManyToMany(() => Post, "dislikedBy")
  dislikedPosts = new Collection<Post>(this);

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.creator)
  posts = new Collection<Post>(this);

  @Field(() => String)
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => String!)
  @Property({ type: "text", unique: true })
  username!: string;

  @Field(() => String!)
  @Property({ type: "text", unique: true })
  email!: string;

  @Property({ type: "text" })
  password!: string;
}
