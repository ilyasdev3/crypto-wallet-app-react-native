import { gql } from "@apollo/client";

export const TRANSFER_FUNDS = gql`
  mutation TransferFunds($transferFunds: TransferFundsInput!) {
    transferFunds(transferFunds: $transferFunds) {
      message
    }
  }
`;
