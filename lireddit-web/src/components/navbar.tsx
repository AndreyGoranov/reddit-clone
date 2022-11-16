import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import { MeDocument, User } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { FeedsEnum, OthersEnum } from "../enums/navigationEnum";
import NavSelect from "./navSelect";
import { getIcon } from "../utils/getIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface NavbarProps {
  handleLogout: Function;
}

const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [selected, setSelected] = useState("");
  const [pause, setPause] = useState(false);
  const [{ data, fetching }] = useQuery({
    query: MeDocument,
    pause,
  });
  let body = null;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target, "e target");
    event.preventDefault();
    setSelected(event.target.value as FeedsEnum | OthersEnum);
    console.log(selected, "selected");
  };

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
        <NavSelect handleChoice={handleSelectChange} />
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
