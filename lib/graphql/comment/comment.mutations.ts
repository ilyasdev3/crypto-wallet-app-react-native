import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment($comment: CommentInput!) {
    createComment(comment: $comment) {
      message
      comment {
        postId
        content
        createdAt
        id
        updatedAt
        user {
          profileImage
          firstName
          lastName
        }
      }
    }
  }
`;
