import Navbar from "../components/navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box } from "@chakra-ui/layout";
import Posts from "./post/posts";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import { LogoutDocument, MeDocument } from "../generated/graphql";
import SubNavbar from "../components/subNavbar";
import { SubNavbarEnum } from "../enums/subNavbar.enum";
import Router from "next/router";

const Index = () => {
  const [user, setUser] = useState(null);
  const [postFilter, setPostFilter] = useState(SubNavbarEnum.ALL_POSTS);

  const handleSubNavClick = (arg: SubNavbarEnum) => {
    if (arg === SubNavbarEnum.COINS) {
      Router.push("/coins");
      return;
    }

    if (arg === SubNavbarEnum.CREATE_POST) {
      Router.push("/post/createPost");
      return;
    }

    setPostFilter(arg);
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
    console.log("INDEX");
    if (!fetching) {
      setUser(data.me);
    }
  }, [fetching, postFilter]);

  return (
    <Box>
      {fetching ? <span>Loading...</span> : null}
      <Navbar handleLogout={handleLogout} />
      {user ? <SubNavbar handleChoice={handleSubNavClick} /> : null}
      <Box>
        {user ? <Posts pageProps={null} postFilter={postFilter} /> : null}
      </Box>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
