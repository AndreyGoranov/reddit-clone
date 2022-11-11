import { PostFilterEnum } from "../enums/postFilter.enum";

export const mapQueryWhereData = (filter: PostFilterEnum) => {
  if (!filter || filter === PostFilterEnum.ALL_POSTS) {
    return {};
  }

  if (filter === PostFilterEnum.MOST_LIKED) {
    return { likes: { $gt: 0 } };
  }

  if (filter === PostFilterEnum.MOST_DISLIKED) {
    return { dislikes: { $gt: 0 } };
  }

  return {};
};
