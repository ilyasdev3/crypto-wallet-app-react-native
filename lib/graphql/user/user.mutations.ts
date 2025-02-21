import { gql } from "@apollo/client";

export const CHECK_USERNAME = gql`
  mutation CheckUsername($username: String!) {
    checkUsername(username: $username)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      message
      token
    }
  }
`;
export const USER_LOGIN = gql`
  mutation LoginUser($user: UserInput!) {
    loginUser(user: $user) {
      token
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($user: UpdateUserInput!) {
    updateUser(user: $user)
  }
`;

export const FOLLOW_USER_UNFOLLOW_USER = gql`
  mutation Mutation($userId: ID!) {
    followUnfollowUser(userId: $userId)
  }
`;
