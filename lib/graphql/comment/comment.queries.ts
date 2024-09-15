import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query GetComments($getCommentsId: ID!) {
    getComments(id: $getCommentsId) {
      content
      createdAt
      id
      postId
      updatedAt
      user {
        profileImage
        firstName
        lastName
      }
    }
  }
`;
