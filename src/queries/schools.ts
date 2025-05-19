import gql from "graphql-tag";

export const SCHOOLS_QUERY = gql`
  query GetSchools(
    $offset: Int!
    $limit: Int!
    $order_by: [school_order_by!]
    $where: school_bool_exp
  ) {
    school(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {
      id
      name
      address {
        address1
        address2
      }
      user {
        id
        displayName
        email
      }
      created_at
    }
    school_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const SCHOOL_QUERY_ONE = gql`
  query GetSchoolById($id: uuid!) {
    school_by_pk(id: $id) {
      id
      name
      address {
        id
        address1
        address2
      }
      user {
        id
        displayName
        email
      }
      created_at
    }
  }
`;

export const DELETE_SCHOOL = gql`
  mutation DeleteSchool($id: uuid!) {
    delete_school_by_pk(id: $id) {
      id
    }
  }
`;
