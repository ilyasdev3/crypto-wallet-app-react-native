import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query me {
    me {
      id
      username
      profileImage
    }
  }
`;
