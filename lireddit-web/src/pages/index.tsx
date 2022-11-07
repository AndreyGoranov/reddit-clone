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

  const handleSubNavClick = (arg: boolean) => {
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
    console.log(showMyPosts, "showMyposts in index");
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
          <span onClick={() => handleSubNavClick(false)}>All Posts</span>
          <span onClick={() => handleSubNavClick(true)}>My Posts</span>
        </div>
      ) : null}
      <Box>
        {user ? <Posts pageProps={null} showMyPosts={showMyPosts} /> : null}
      </Box>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
