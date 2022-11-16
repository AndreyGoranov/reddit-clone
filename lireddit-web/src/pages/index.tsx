import Navbar from "../components/navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box } from "@chakra-ui/layout";
import Posts from "./post/posts";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import { LogoutDocument, MeDocument } from "../generated/graphql";
import SideNavbar from "../components/sideNavbar";
import { FeedsEnum, OthersEnum } from "../enums/navigationEnum";
import Router from "next/router";

const Index = () => {
  const [user, setUser] = useState(null);
  const [postFilter, setPostFilter] = useState(FeedsEnum.ALL_POSTS);
  const [showSideNav, setShowSideNav] = useState(false);
  const [clickable, setClickable] = useState(true);
  const [selectedNavigation, setSelectedNavigation] = useState(FeedsEnum.HOME);

  const handleNavigationCLick = (arg: FeedsEnum & OthersEnum) => {
    if (arg === OthersEnum.COINS) {
      Router.push("/coins");
      return;
    }

    if (arg === OthersEnum.CREATE_POST) {
      Router.push("/post/createPost");
      return;
    }

    setPostFilter(arg as FeedsEnum & OthersEnum);
  };

  const [{ data, fetching, error }] = useQuery({
    query: MeDocument,
  });
  const [, logout] = useMutation(LogoutDocument);

  const handleLogout = () => {
    logout({});
    setUser(null);
  };

  const handleNavigationTools = () => {
    setShowSideNav(!showSideNav);
    setClickable(showSideNav);
  };

  const handleChoice = (choice: FeedsEnum & OthersEnum) => {
    setSelectedNavigation(choice);
    handleNavigationCLick(choice);
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
      <Navbar
        handleLogout={handleLogout}
        handleChoice={handleChoice}
        selected={selectedNavigation as FeedsEnum & OthersEnum}
        handleNavigationTools={handleNavigationTools}
        clickable={clickable}
      />
      {user && showSideNav ? (
        <SideNavbar
          isSideNav={true}
          selected={selectedNavigation as FeedsEnum & OthersEnum}
          handleChoice={handleChoice}
          handleNavigationTools={handleNavigationTools}
        />
      ) : null}
      <Box>
        {user ? <Posts pageProps={null} postFilter={postFilter} /> : null}
      </Box>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
