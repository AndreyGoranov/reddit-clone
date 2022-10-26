import Navbar from "../components/navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useQuery } from "urql";
import { PostsDocument } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useQuery({ query: PostsDocument });
  console.log(data, "data");
  return <Navbar />;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
