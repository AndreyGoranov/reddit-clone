import { Box, IconButton } from "@chakra-ui/react";
import { Post } from "../generated/graphql";
import {
  ArrowRightIcon,
  ChatIcon,
  MoonIcon,
  SunIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";

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
  post: Post;
}) => {
  console.log(post.likes);
  return (
    <Box padding={2} mb={5} className="post-interaction">
      <IconButton
        aria-label="like"
        title="Like"
        className="interaction-icon"
        icon={<SunIcon />}
        onClick={() => interact?.like(post.id)}
      >
        Like
      </IconButton>
      <span>{post.likes}</span>
      <IconButton
        title="Dislike"
        className="interaction-icon"
        aria-label="dislike"
        icon={<MoonIcon />}
        onClick={() => interact.dislike()}
      >
        Dislike
      </IconButton>
      <span>0</span>
      <IconButton
        title="Emotes"
        className="interaction-icon"
        aria-label="react"
        icon={<ChatIcon />}
        onClick={() => interact.emote()}
      >
        React
      </IconButton>
      <IconButton
        aria-label="share"
        className="interaction-icon"
        icon={<ArrowRightIcon />}
        onClick={() => interact.share()}
      >
        share
      </IconButton>
      <IconButton
        aria-label="report"
        className="interaction-icon"
        icon={<WarningTwoIcon />}
        onClick={() => interact.report()}
        title="Report"
      >
        Report
      </IconButton>
    </Box>
  );
};

export default PostInteractionBar;
