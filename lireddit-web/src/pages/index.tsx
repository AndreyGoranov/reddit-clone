import Navbar from "../components/navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box } from "@chakra-ui/layout";
import Link from "next/link";
import Posts from "./post/posts";
import { useAuthGuard } from "../utils/authGuard";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  const isAuthenticated = useAuthGuard();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  });
  return (
    <Box>
      <Navbar />
      <Link href="post/createPost">Create Post</Link>
      <Box>
        <Posts pageProps={{}} />
      </Box>
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
