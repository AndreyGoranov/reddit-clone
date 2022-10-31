import { Box, Button, FormLabel } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";

interface postLayoutProps {
  title: string;
  body: string;
}

const PostLayout: React.FC<postLayoutProps> = ({ title, body }) => {
  return (
    <Box>
      <h1>{title}</h1>
      <p>{body}</p>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(PostLayout);
