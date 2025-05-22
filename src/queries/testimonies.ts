import gql from "graphql-tag";

export const TESTIMONIES_QUERY = gql`
  query GetTestimonies(
    $offset: Int!
    $limit: Int!
    $order_by: [testimony_order_by!]
    $where: testimony_bool_exp
  ) {
    testimony(
      offset: $offset
      limit: $limit
      order_by: $order_by
      where: $where
    ) {
      id
      description
      place
      victim
      testimony_statuses {
        id
        status {
          id
          code
          name
        }
        date
      }
    }
    testimony_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const TESTIMONY_QUERY_ONE = gql`
  query GetTestimonyById($id: Int!) {
    testimony_by_pk(id: $id) {
      id
      description
      testimony_statuses {
        id
        status {
          id
          code
          name
        }
        date
      }
    }
  }
`;

export const DELETE_TESTIMONY = gql`
  mutation DeleteTestimony($id: Int!) {
    delete_testimony_by_pk(id: $id) {
      id
    }
  }
`;
