import Navbar from "../components/navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useQuery } from "urql";
import { PostsDocument } from "../generated/graphql";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const Index = () => {
  const [{ data }] = useQuery({ query: PostsDocument });
  console.log(data, "data");
  return (
    <Box>
      <Navbar />
      <Link href="post/createPost">Create Post</Link>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
