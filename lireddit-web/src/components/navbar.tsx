import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useMutation, useQuery } from "urql";
import { LogoutDocument, MeDocument, User } from "../generated/graphql";

interface NavbarProps {}

const isServer = () => typeof window === "undefined";

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [{ fetching: logoutFetching }, logout] = useMutation(LogoutDocument);
  const [pause, setPause] = useState(false);
  const [{ data, fetching }] = useQuery({
    query: MeDocument,
    pause,
  });
  let body = null;

  useEffect(() => {
    setUser(data?.me as unknown as User);
    setIsFetching(fetching);
    setPause(isServer());
  });

  // data loading
  // if (isFetching) {
  //   body = <Box>Loading...</Box>;
  // } else if (!user) {
  //   body = (
  //     <>
  //       <NextLink href="/login">
  //         <Link mr={3}>Login</Link>
  //       </NextLink>
  //       <NextLink href="/register">
  //         <Link>Register</Link>
  //       </NextLink>
  //     </>
  //   );
  //   //user not logged in
  // } else {
  //   body = (
  //     <>
  //       <Box mr={2} color="white">
  //         {user.username}
  //       </Box>
  //       <Button
  //         variant="link"
  //         color="black"
  //         onClick={() => {
  //           console.log("log out clicked");
  //           logout({});
  //         }}
  //         isLoading={logoutFetching}
  //       >
  //         Logout
  //       </Button>
  //     </>
  //   );
  //   // user is logged in
  // }
  return (
    <Flex bg="tomato" p={5}>
      <Box ml="auto">Navbar stuff</Box>
    </Flex>
  );
};

export default Navbar;
