import { gql } from "@apollo/client";

export const GET_USER_POSTS = gql`
  query GetUserPosts($userId: ID!) {
    getUserPosts(userId: $userId) {
      id
      title
      content
      createdAt
      updatedAt
      userId
      image
      stats {
        totalLikes
        totalComments
        totalShares
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($getPost: ID!) {
    getPost(id: $getPost) {
      id
      title
      content
      userId {
        id
        firstName
        lastName
        username
        profileImage
      }
      likes
      stats {
        totalLikes
        totalComments
        totalShares
      }
      image
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts($filters: PostFilter) {
    getAllPosts(filters: $filters) {
      id
      title
      content
      createdAt
      updatedAt
      image
      userId {
        id
        firstName
        lastName
        username
        profileImage
      }
      likes
      stats {
        totalLikes
        totalComments
        totalShares
      }
    }
  }
`;
