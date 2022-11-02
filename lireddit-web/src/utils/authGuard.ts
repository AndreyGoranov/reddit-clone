import { useQuery } from "urql";
import { MeDocument, User } from "../generated/graphql";

export const useAuthGuard = (): boolean | User => {
  const [{ data, fetching, error }] = useQuery({
    query: MeDocument,
    requestPolicy: "cache-and-network",
  });
  if (!data?.me || error) {
    return false;
  }

  return data.me as unknown as User;
};
