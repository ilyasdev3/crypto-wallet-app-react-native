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
