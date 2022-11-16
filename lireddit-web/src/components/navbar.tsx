import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import { MeDocument, User } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { FeedsEnum, OthersEnum } from "../enums/navigationEnum";
import NavMenu from "./navMenu";
import { getIcon } from "../utils/getNavigationIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface NavbarProps {
  clickable: boolean;
  selected: FeedsEnum & OthersEnum;
  handleChoice: Function;
  handleLogout: Function;
  handleNavigationTools: Function;
}

const Navbar: React.FC<NavbarProps> = ({
  clickable,
  selected,
  handleLogout,
  handleChoice,
  handleNavigationTools,
}) => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [pause, setPause] = useState(false);
  const [{ data, fetching }] = useQuery({
    query: MeDocument,
    pause,
  });
  let body = null;

  useEffect(() => {
    if (data) {
      setUser(data?.me as unknown as User);
      setIsFetching(fetching);
    }

    setPause(isServer());
  });

  // data loading
  if (isFetching) {
    body = <Box>Loading...</Box>;
  } else if (!user) {
    body = (
      <Box>
        <Link href="/login" mr={3}>
          Login
        </Link>
        <Link href="/register">Register</Link>
      </Box>
    );
    //user not logged in
  } else {
    body = (
      <Box className="navbar">
        <FontAwesomeIcon className="home" icon={getIcon(FeedsEnum.HOME)} />
        <span>reddit</span>
        <NavMenu
          clickable={clickable}
          isSideNav={false}
          selected={selected}
          handleNavigationTools={handleNavigationTools}
          handleChoice={handleChoice}
        />
        <Box ml="auto" mr={2} color="blue">
          {user.username}
        </Box>
        {/* <Button
          variant="link"
          color="black"
          onClick={() => {
            console.log("log out clicked");
            handleLogout();
          }}
        >
          Logout
          WILL MOVE IT TO DROPDOWN MENU OF PROFILE
        </Button> */}
      </Box>
    );
    // user is logged in
  }
  return <Box className="navbarWrap">{body}</Box>;
};

export default Navbar;
