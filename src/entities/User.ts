import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int} from "type-graphql";

// Field is used to expose whatever you want to the graphql schema or hide it if ommit

@ObjectType()
@Entity()
export class User {

  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field(() => String!)
  @Property({ type: "text", unique: true })
  username!: string;

  @Property({ type: "text" })
  password!: string; 
}