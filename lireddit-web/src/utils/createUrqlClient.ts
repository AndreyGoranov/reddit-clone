import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange, ssrExchange } from "urql";
import {
  LoginMutation,
  LogoutMutation,
  MeQuery,
  MeDocument,
  RegisterMutation,
} from "../generated/graphql";
import { updateQuery } from "./updateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  // url: "http://44.204.188.109:4000/graphql",
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
    headers: {
      "X-Forwarded-Proto": "https",
    },
  },
  // Updating the cache
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result: LoginMutation, args, cache, info) => {
            updateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result: LoginMutation, args, cache, info) => {
            updateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  console.log(result.login.errors);
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result: RegisterMutation, args, cache, info) => {
            updateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
