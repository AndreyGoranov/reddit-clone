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
interface postsProps {
  showMyPosts: boolean;
}

const Posts: React.FC<postsProps> = ({ showMyPosts }) => {
  const [posts, setPosts] = useState([]);
  const [pagePostLimit, setPagePostLimit] = useState(500);
  const [{ data, fetching, error }] = useQuery({
    query: PostsDocument,
    variables: {
      limit: pagePostLimit,
    },
  });
  const [
    { data: myPosts, fetching: myPostsFetching, error: myPostsError },
    reexecutePostsQuery,
  ] = useQuery({
    query: MyPostsDocument,
  });
  const [, likePost] = useMutation(LikePostDocument);
  const [, dislikePost] = useMutation(DislikePostDocument);

  const handlePostLike = async (postId: number) => {
    const { data, error } = await likePost({ postId });
    if (!error) {
      reexecutePostsQuery({ requestPolicy: "network-only" });
    }
  };

  const handlePostDislike = async (postId: number) => {
    const { data, error } = await dislikePost({ postId });
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
    console.log("posts rerender");
    if (error) {
      throw new Error(error.message);
    }
    if (!fetching && !showMyPosts) {
      setPosts(data?.posts);
    }

    if (showMyPosts && !myPostsFetching) {
      setPosts(myPosts?.myPosts);
    }
  }, [fetching, myPostsFetching, showMyPosts]);

  console.log(posts);

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
