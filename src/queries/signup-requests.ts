import { gql } from "graphql-tag";

export const SIGNUP_REQUESTS_QUERY = gql`
  query GetSignupRequests(
    $limit: Int
    $offset: Int
    $order_by: [signup_request_order_by!]
    $where: signup_request_bool_exp
  ) {
    signup_request(
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      id
      role
      first_name
      last_name
      email
      phone
      address
      receive_resources
      created_at
    }
    signup_request_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const APPROVE_SIGNUP_REQUEST = gql`
  mutation ApproveSignupRequest($id: uuid!) {
    update_signup_request_by_pk(
      pk_columns: { id: $id }
      _set: { receive_resources: true }
    ) {
      id
      receive_resources
    }
  }
`;

export const REJECT_SIGNUP_REQUEST = gql`
  mutation RejectSignupRequest($id: uuid!) {
    delete_signup_request_by_pk(id: $id) {
      id
    }
  }
`; 