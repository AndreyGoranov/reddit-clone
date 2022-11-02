import Navbar from "../components/navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box } from "@chakra-ui/layout";
import Link from "next/link";
import Posts from "./post/posts";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import { LogoutDocument, MeDocument } from "../generated/graphql";

const Index = () => {
  const [user, setUser] = useState(null);
  const [showMyPosts, setShowMyPosts] = useState(false);
  const handleClick = (arg: boolean) => {
    setShowMyPosts(arg);
  };

  const [{ data, fetching, error }] = useQuery({
    query: MeDocument,
  });
  const [, logout] = useMutation(LogoutDocument);

  const handleLogout = () => {
    logout({});
    setUser(null);
  };

  useEffect(() => {
    if (!fetching) {
      setUser(data.me);
    }
  }, [fetching]);

  return (
    <Box>
      {fetching ? <span>Loading...</span> : null}
      <Navbar handleLogout={handleLogout} />
      {user ? (
        <div className="subNav">
          <Link href="post/createPost">Create Post</Link>
          <Box onClick={() => handleClick(false)}>All Posts</Box>
          <Box onClick={() => handleClick(true)}>My Posts</Box>
        </div>
      ) : null}
      <Box>
        {user ? <Posts pageProps={null} showMyPosts={showMyPosts} /> : null}
      </Box>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
