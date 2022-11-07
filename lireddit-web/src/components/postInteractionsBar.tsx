import { Box, Button, FormLabel } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";

interface PostInteractions {
  like: Function | null;
  dislike: Function | null;
  emote: Function | null;
  share: Function | null;
  report: Function | null;
}

const PostInteractionBar: React.FC<PostInteractions> = (interact) => {
  return (
    <Box padding={5} mb={5} bgColor="orange">
      <Button onClick={() => interact.like()}>Like</Button>
      <Button onClick={() => interact.dislike()}>Dislike</Button>
      <Button onClick={() => interact.emote()}>React</Button>
      <Button onClick={() => interact.share()}>Share</Button>
      <Button onClick={() => interact.report()}>Report</Button>
    </Box>
  );
};

export default PostInteractionBar;
