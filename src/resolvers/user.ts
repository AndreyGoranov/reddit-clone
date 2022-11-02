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
import {
  validateRegister,
  validateResetPassword,
} from "../validation/user/registerValidation";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";

const { redisDependencies } = require("../default");
@InputType()
export class RegisterInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}
@InputType()
export class LoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  newPassword: string;
  @Field()
  confirmPassword: string;
  @Field()
  token: string;
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
    const userId = req?.session?.userId;
    if (userId) {
      const user = await em.findOne(User, { id: userId });
      return user;
    } else {
      return null;
    }
  }
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors.length) {
      return { errors };
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
      email: options.email,
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
      return err;
    }

    req.session.userId = user?.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "That username doesn't exist",
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

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          resolve(false);
          throw new Error(err);
        } else {
          res.clearCookie("ambo");
          resolve(true);
        }
      })
    );
  }
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { em, redisClient }: MyContext
  ) {
    const currentUser = await em.findOne(User, { email });
    console.log(email, "email passed");

    if (currentUser) {
      const token = v4();
      await redisClient.set(
        redisDependencies.forgetPasswordPrefix + token,
        currentUser.id,
        "EX",
        1000 * 60 * 60 * 24 * 3
      );

      await sendEmail(
        "Haha you forgot your password",
        email,
        `<a href="http://localhost:3000/changePassword/${token}">reset password</a>`
      );

      return true;
    }

    return false;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("options") options: ResetPasswordInput,
    @Ctx() { em, redisClient, req }: MyContext
  ) {
    console.log("change password hit");
    const { newPassword, confirmPassword, token } = options;

    const redisKey = redisDependencies.forgetPasswordPrefix + token;

    const userId = await redisClient.get(redisKey);

    const errors = validateResetPassword({
      newPassword,
      confirmPassword,
      token,
      userId,
    });

    console.log(errors, "erros in resolver");

    if (errors.length) {
      console.log("just before returning errors");
      return { errors };
    }

    const user = await em.findOne(User, { id: parseInt(userId as string) });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "User no longer exists",
          },
        ],
      };
    }

    user.password = await argon2.hash(newPassword);
    try {
      await em.persistAndFlush(user);
      req.session.userId = user.id;
      redisClient.del(redisKey);
    } catch (err) {
      console.log(err, "ERROR");
    }

    return { user };
  }
}
