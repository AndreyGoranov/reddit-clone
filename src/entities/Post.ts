import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";
import { User } from "./User";

// Field is used to expose whatever you want to the graphql schema or hide it if ommit

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey()
  id: number;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.likedPosts, { owner: true })
  likedBy = new Collection<User>(this) as Collection<User>;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.dislikedPosts, { owner: true })
  dislikedBy = new Collection<User>(this) as Collection<User>;

  @Field()
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

  @Field(() => Int, { defaultValue: 0, nullable: true })
  @Property({ type: "int" })
  likes: number;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  @Property({ type: "int" })
  dislikes: number;
}
