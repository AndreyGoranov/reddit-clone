import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import Wrapper from "../../components/wrapper";
import { PostsDocument } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useEffect, useState } from "react";
import PostLayout from "../../components/postLayout";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [{ data, error }] = useQuery({ query: PostsDocument });
  
  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  });
  return (
    <Wrapper variant="small">
      <Box>
        {posts.map((post) => (
          <PostLayout key={post.id} {...post} />
        ))}
      </Box>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Posts);
