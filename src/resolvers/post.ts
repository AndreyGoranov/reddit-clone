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
import { isAuthenticated } from "../middleware/isAuthenticated";
import { mapQueryOrderData } from "../utils/mapQueryOrderData";
import { User } from "../entities/User";

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
  posts(
    @Arg("limit") limit: number,
    @Ctx() { em, req }: MyContext
  ): Promise<Post[]> {
    isAuthenticated(req);

    return em.find(Post, {}, { orderBy: mapQueryOrderData("ASC"), limit });
  }

  @Query(() => [Post], { nullable: true })
  myPosts(@Ctx() { em, req }: MyContext): Promise<Post[]> {
    isAuthenticated(req);
    return em.find(Post, { creator: req.session.userId });
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
      likes: 0,
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

  @Mutation(() => Boolean)
  async likePost(
    @Arg("postId") postId: number,
    @Ctx() { em, req }: MyContext
  ): Promise<boolean> {
    isAuthenticated(req);
    const post = await em.findOne(Post, { id: postId });
    await post?.likedBy.init();
    const user = await em.findOne(User, { id: req.session.userId });
    await user?.likedPosts.init();

    if (!post) {
      throw new Error("Can't find post");
    }

    if (
      [...post.likedBy]
        .map((el) => el.id)
        ?.includes(req.session.userId as number)
    ) {
      throw new Error("You already liked that post");
    } else {
      if (user) {
        post.likedBy.add(user);
        post.likes++;
        await em.persistAndFlush(post);
      }
    }
    return true;
  }

  @Mutation(() => Boolean)
  async dislikePost(
    @Arg("postId") postId: number,
    @Ctx() { em, req }: MyContext
  ): Promise<boolean> {
    isAuthenticated(req);
    const post = await em.findOne(Post, { id: postId });
    await post?.likedBy.init();
    const user = await em.findOne(User, { id: req.session.userId });
    await user?.likedPosts.init();

    if (!post) {
      throw new Error("Can't find post");
    }

    if (!user) {
      throw new Error("Not Authenticated");
    }

    if (
      [...post.likedBy]
        .map((el) => el.id)
        ?.includes(req.session.userId as number)
    ) {
      post.likedBy.remove(user);
      post.likes--;
      await em.persistAndFlush(post);
    } else {
      post.likedBy.add(user);
      post.likes++;
      await em.persistAndFlush(post);
    }
    return true;
  }
}
