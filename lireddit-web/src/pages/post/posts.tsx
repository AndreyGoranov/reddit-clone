import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import Wrapper from "../../components/wrapper";
import { MyPostsDocument, PostsDocument } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useEffect, useState } from "react";
import PostLayout from "../../components/postLayout";

interface postsProps {
  showMyPosts: boolean;
}

const Posts: React.FC<postsProps> = ({ showMyPosts }) => {
  const [posts, setPosts] = useState([]);
  const [{ data, error }] = useQuery({ query: PostsDocument });
  const [{ data: myPosts, error: myPostsError }] = useQuery({
    query: MyPostsDocument,
  });

  useEffect(() => {
    if (data && !showMyPosts) {
      setPosts(data.posts);
    }

    if (showMyPosts && myPosts) {
      setPosts(myPosts.myPosts);
    }
  }, [data]);

  return (
    <Wrapper variant="small">
      <Box>
        {posts?.map((post) => (
          <PostLayout key={post.id} {...post} />
        ))}
      </Box>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Posts);
