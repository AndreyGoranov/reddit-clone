import { QueryOrder } from "@mikro-orm/core";
import { PostFilterEnum } from "../enums/postFilter.enum";

export const mapQueryOrderData = (filter: PostFilterEnum) => {
  if (!filter || filter === PostFilterEnum.ALL_POSTS) {
    return { createdAt: QueryOrder.ASC };
  }

  if (filter === PostFilterEnum.MOST_LIKED) {
    return { likes: QueryOrder.DESC };
  }

  if (filter === PostFilterEnum.MOST_DISLIKED) {
    return { likes: QueryOrder.ASC };
  }

  if (filter === PostFilterEnum.POPULAR) {
    return {};
  }

  return {};
};
