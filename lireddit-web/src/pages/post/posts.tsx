import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useMutation, useQuery } from "urql";
import Wrapper from "../../components/wrapper";
import {
  DislikePostDocument,
  LikePostDocument,
  MyPostsDocument,
  PostsDocument,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useEffect, useState } from "react";
import PostLayout from "../../components/postLayout";
import PostInteractionBar from "../../components/postInteractionsBar";
import { FeedsEnum } from "../../enums/navigationEnum";
interface PostsProps {
  postFilter: FeedsEnum;
}

const Posts: React.FC<PostsProps> = ({ postFilter }) => {
  const [posts, setPosts] = useState([]);
  const [pagePostLimit, setPagePostLimit] = useState(500);
  const [{ data, fetching, error }, reexecutePostsQuery] = useQuery({
    query: PostsDocument,
    variables: {
      limit: pagePostLimit,
      filter: postFilter,
    },
  });
  const [{ data: myPosts, fetching: myPostsFetching, error: myPostsError }] =
    useQuery({
      query: MyPostsDocument,
    });
  const [, likePost] = useMutation(LikePostDocument);
  const [, dislikePost] = useMutation(DislikePostDocument);

  const handlePostLike = async (postId: number) => {
    const { error } = await likePost({ postId });
    if (!error) {
      reexecutePostsQuery({ requestPolicy: "network-only" });
    }
  };

  const handlePostDislike = async (postId: number) => {
    const { error } = await dislikePost({ postId });
    if (!error) {
      reexecutePostsQuery({ requestPolicy: "network-only" });
    }
  };

  const sharePost = () => {
    return console.log("share");
  };

  const reactToPost = () => {
    return console.log("react");
  };

  const reportPost = () => {
    return console.log("report post");
  };

  const postInteractions = {
    like: handlePostLike,
    dislike: handlePostDislike,
    share: sharePost,
    emote: reactToPost,
    report: reportPost,
  };

  useEffect(() => {
    if (error) {
      throw new Error(error.message);
    }
    if (!fetching && postFilter !== FeedsEnum.MY_POSTS) {
      setPosts(data?.posts);
    }

    if (!myPostsFetching && postFilter === FeedsEnum.MY_POSTS) {
      setPosts(myPosts?.myPosts);
    }
  }, [fetching, myPostsFetching, postFilter]);

  return (
    <Wrapper variant="small">
      <Box>
        {posts?.map((post) => (
          <Box key={post.id}>
            <PostLayout {...post} />
            <PostInteractionBar interact={postInteractions} post={post} />
          </Box>
        ))}
      </Box>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Posts);
