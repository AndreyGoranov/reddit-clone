/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "fragment RegularUser on User {\n  id\n  username\n  email\n}": types.RegularUserFragmentDoc,
    "mutation ChangePassword($token: String!, $newPassword: String!, $confirmPassword: String!) {\n  changePassword(\n    options: {token: $token, newPassword: $newPassword, confirmPassword: $confirmPassword}\n  ) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($username: String!, $password: String!) {\n  login(options: {username: $username, password: $password}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($username: String!, $password: String!, $email: String!) {\n  register(options: {username: $username, password: $password, email: $email}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}": types.RegisterDocument,
    "query Me {\n  me {\n    ...RegularUser\n  }\n}": types.MeDocument,
    "query Posts {\n  posts {\n    id\n    createdAt\n    updatedAt\n    title\n  }\n}": types.PostsDocument,
};

export function graphql(source: "fragment RegularUser on User {\n  id\n  username\n  email\n}"): (typeof documents)["fragment RegularUser on User {\n  id\n  username\n  email\n}"];
export function graphql(source: "mutation ChangePassword($token: String!, $newPassword: String!, $confirmPassword: String!) {\n  changePassword(\n    options: {token: $token, newPassword: $newPassword, confirmPassword: $confirmPassword}\n  ) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"): (typeof documents)["mutation ChangePassword($token: String!, $newPassword: String!, $confirmPassword: String!) {\n  changePassword(\n    options: {token: $token, newPassword: $newPassword, confirmPassword: $confirmPassword}\n  ) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"];
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
export function graphql(source: "mutation Login($username: String!, $password: String!) {\n  login(options: {username: $username, password: $password}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"): (typeof documents)["mutation Login($username: String!, $password: String!) {\n  login(options: {username: $username, password: $password}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"];
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
export function graphql(source: "mutation Register($username: String!, $password: String!, $email: String!) {\n  register(options: {username: $username, password: $password, email: $email}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"): (typeof documents)["mutation Register($username: String!, $password: String!, $email: String!) {\n  register(options: {username: $username, password: $password, email: $email}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"];
export function graphql(source: "query Me {\n  me {\n    ...RegularUser\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...RegularUser\n  }\n}"];
export function graphql(source: "query Posts {\n  posts {\n    id\n    createdAt\n    updatedAt\n    title\n  }\n}"): (typeof documents)["query Posts {\n  posts {\n    id\n    createdAt\n    updatedAt\n    title\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;