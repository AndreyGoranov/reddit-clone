import { Post } from "../entities/Post";
import {
  Resolver,
  Query,
  Mutation,
  Ctx,
  Arg,
  InputType,
  Field,
} from "type-graphql";
import { MyContext } from "src/types";
import { wrap } from "@mikro-orm/core";
import { isAuthenticated } from "../middleware/isAuthenticated";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  body: string;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  posts(@Ctx() { em, req }: MyContext): Promise<Post[]> {
    isAuthenticated(req);
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id") id: number,
    @Ctx() { em, req }: MyContext
  ): Promise<Post | null> {
    isAuthenticated(req);
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("options") options: PostInput,
    @Ctx() { em, req }: MyContext
  ): Promise<Post> {
    isAuthenticated(req);

    const post = em.create(Post, {
      creator: req.session.userId,
      ...options,
    } as unknown as Post);

    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em, req }: MyContext
  ): Promise<Post | null> {
    isAuthenticated(req);
    const post = await em.findOne(Post, { id });
    if (!post) {
      return null;
    }

    if ((!!title && typeof title === "string") || title === null) {
      post.title = title;
      await em.persistAndFlush(post);
    }

    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em, req }: MyContext
  ): Promise<boolean> {
    isAuthenticated(req);
    await em.nativeDelete(Post, { id });
    return true;
  }
}
