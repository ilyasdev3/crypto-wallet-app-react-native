import { gql } from "@apollo/client";

export const GET_WALLET = gql`
  query GetWallet {
    getWallet {
      balance
      address
      createdAt
      userId
    }
  }
`;
