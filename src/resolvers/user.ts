import {
  Resolver,
  Mutation,
  Ctx,
  Arg,
  InputType,
  Field,
  ObjectType,
  Query,
} from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../entities/User";
import argon2 from "argon2";
import { ErrorConstraint } from "../helpers/enums/errorConstraint";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    const userId = req.session.userId;
    if (!userId) {
      return null;
    }

    const user = await em.findOne(User, { id: userId });
 
    return { ...user }; // spread here handles return null for non-nullable field error
  }
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "username cannot be less than 3 characters",
          },
        ],
      };
    }
    if (options.password.length < 8) {
      return {
        errors: [
          {
            field: "password",
            message: "password cannot be less than 8 characters",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    } as User);
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.constraint === ErrorConstraint.UsernameUnique) {
        return {
          errors: [
            {
              field: "username",
              message: "Username already exists",
            },
          ],
        };
      }
    }
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "That username doesnt't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Invalid Credentials",
          },
        ],
      };
    }
 
    req.session.userId = user.id;
    await em.persistAndFlush(user);
    return { user };
  }
}