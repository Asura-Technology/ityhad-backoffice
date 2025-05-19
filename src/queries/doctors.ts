import gql from "graphql-tag";

export const DOCTORS_QUERY = gql`
  query GetDoctors(
    $offset: Int!
    $limit: Int!
    $order_by: [doctor_order_by!]
    $where: doctor_bool_exp
  ) {
    doctor(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {
      id
      user {
        displayName
        email
      }
      address {
        address1
      }
      created_at
    }
    doctor_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const DOCTOR_QUERY_ONE = gql`
  query GetDoctorById($id: Int!) {
    doctor_by_pk(id: $id) {
      id
      user {
        displayName
        email
      }
      address {
        address1
      }
      created_at
    }
  }
`;

export const DELETE_DOCTOR = gql`
  mutation DeleteDoctor($id: Int!) {
    delete_doctor_by_pk(id: $id) {
      id
    }
  }
`;
