import { Box, Button } from "@chakra-ui/react";
import { Post } from "../generated/graphql";

interface PostInteractions {
  like: Function | null;
  dislike: Function | null;
  emote: Function | null;
  share: Function | null;
  report: Function | null;
}

const PostInteractionBar: React.FC<any> = ({
  interact,
  post,
}: {
  interact: PostInteractions;
  post: any;
}) => {
  console.log(interact, "Interact in interaction");
  console.log(post, "post in interaction");
  return (
    <Box padding={5} mb={5} bgColor="orange">
      {interact ? (
        <Button onClick={() => interact?.like(post.id)}>Like</Button>
      ) : null}
      <Button onClick={() => interact.dislike()}>Dislike</Button>
      <Button onClick={() => interact.emote()}>React</Button>
      <Button onClick={() => interact.share()}>Share</Button>
      <Button onClick={() => interact.report()}>Report</Button>
    </Box>
  );
};

export default PostInteractionBar;
