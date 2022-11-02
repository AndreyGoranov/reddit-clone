import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import { MeDocument, User } from "../generated/graphql";
import { isServer } from "../utils/isServer";
interface NavbarProps {
  handleLogout: Function;
}

const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
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
      <Box>
        <Box mr={2} color="white">
          {user.username}
        </Box>
        <Button
          variant="link"
          color="black"
          onClick={() => {
            console.log("log out clicked");
            handleLogout();
          }}
        >
          Logout
        </Button>
      </Box>
    );
    // user is logged in
  }
  return (
    <Flex bg="tomato" p={5}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default Navbar;
