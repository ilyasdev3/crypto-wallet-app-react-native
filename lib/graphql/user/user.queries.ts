import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query me {
    me {
      id
      username
      profileImage
      firstName
      lastName
      email
      bio
      createdAt
      updatedAt
      following
      followers
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      id
      username
      profileImage
      firstName
      lastName
      email
      bio
      createdAt
      updatedAt
      following
      followers
    }
  }
`;
