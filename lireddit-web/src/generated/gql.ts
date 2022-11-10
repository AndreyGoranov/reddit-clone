/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "fragment RegularUser on User {\n  id\n  username\n  email\n}": types.RegularUserFragmentDoc,
    "mutation ChangePassword($token: String!, $newPassword: String!, $confirmPassword: String!) {\n  changePassword(\n    options: {token: $token, newPassword: $newPassword, confirmPassword: $confirmPassword}\n  ) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}": types.ChangePasswordDocument,
    "mutation CreatePost($options: PostInput!) {\n  createPost(options: $options) {\n    title\n    body\n  }\n}": types.CreatePostDocument,
    "mutation DislikePost($postId: Float!) {\n  dislikePost(postId: $postId)\n}": types.DislikePostDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation LikePost($postId: Float!) {\n  likePost(postId: $postId)\n}": types.LikePostDocument,
    "mutation Login($username: String!, $password: String!) {\n  login(options: {username: $username, password: $password}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($username: String!, $password: String!, $email: String!) {\n  register(options: {username: $username, password: $password, email: $email}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}": types.RegisterDocument,
    "query Me {\n  me {\n    ...RegularUser\n  }\n}": types.MeDocument,
    "query MyPosts {\n  myPosts {\n    id\n    createdAt\n    updatedAt\n    title\n    body\n    likes\n    dislikes\n  }\n}": types.MyPostsDocument,
    "query Posts($limit: Float!) {\n  posts(limit: $limit) {\n    id\n    createdAt\n    updatedAt\n    title\n    body\n    likes\n    dislikes\n  }\n}": types.PostsDocument,
};

export function graphql(source: "fragment RegularUser on User {\n  id\n  username\n  email\n}"): (typeof documents)["fragment RegularUser on User {\n  id\n  username\n  email\n}"];
export function graphql(source: "mutation ChangePassword($token: String!, $newPassword: String!, $confirmPassword: String!) {\n  changePassword(\n    options: {token: $token, newPassword: $newPassword, confirmPassword: $confirmPassword}\n  ) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"): (typeof documents)["mutation ChangePassword($token: String!, $newPassword: String!, $confirmPassword: String!) {\n  changePassword(\n    options: {token: $token, newPassword: $newPassword, confirmPassword: $confirmPassword}\n  ) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"];
export function graphql(source: "mutation CreatePost($options: PostInput!) {\n  createPost(options: $options) {\n    title\n    body\n  }\n}"): (typeof documents)["mutation CreatePost($options: PostInput!) {\n  createPost(options: $options) {\n    title\n    body\n  }\n}"];
export function graphql(source: "mutation DislikePost($postId: Float!) {\n  dislikePost(postId: $postId)\n}"): (typeof documents)["mutation DislikePost($postId: Float!) {\n  dislikePost(postId: $postId)\n}"];
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
export function graphql(source: "mutation LikePost($postId: Float!) {\n  likePost(postId: $postId)\n}"): (typeof documents)["mutation LikePost($postId: Float!) {\n  likePost(postId: $postId)\n}"];
export function graphql(source: "mutation Login($username: String!, $password: String!) {\n  login(options: {username: $username, password: $password}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"): (typeof documents)["mutation Login($username: String!, $password: String!) {\n  login(options: {username: $username, password: $password}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"];
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
export function graphql(source: "mutation Register($username: String!, $password: String!, $email: String!) {\n  register(options: {username: $username, password: $password, email: $email}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"): (typeof documents)["mutation Register($username: String!, $password: String!, $email: String!) {\n  register(options: {username: $username, password: $password, email: $email}) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}"];
export function graphql(source: "query Me {\n  me {\n    ...RegularUser\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...RegularUser\n  }\n}"];
export function graphql(source: "query MyPosts {\n  myPosts {\n    id\n    createdAt\n    updatedAt\n    title\n    body\n    likes\n    dislikes\n  }\n}"): (typeof documents)["query MyPosts {\n  myPosts {\n    id\n    createdAt\n    updatedAt\n    title\n    body\n    likes\n    dislikes\n  }\n}"];
export function graphql(source: "query Posts($limit: Float!) {\n  posts(limit: $limit) {\n    id\n    createdAt\n    updatedAt\n    title\n    body\n    likes\n    dislikes\n  }\n}"): (typeof documents)["query Posts($limit: Float!) {\n  posts(limit: $limit) {\n    id\n    createdAt\n    updatedAt\n    title\n    body\n    likes\n    dislikes\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;