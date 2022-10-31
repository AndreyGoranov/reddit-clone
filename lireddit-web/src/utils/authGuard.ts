import { useQuery } from "urql";
import { MeDocument } from "../generated/graphql";

export const useAuthGuard = () => {
  const [{ data, error }] = useQuery({ query: MeDocument });
  if (!data?.me || error) {  
    return false;
  }

  return true;
};
