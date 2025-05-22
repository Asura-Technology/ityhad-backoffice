import gql from "graphql-tag";

export const STUDENTS_QUERY = gql`
  query GetStudents(
    $offset: Int!
    $limit: Int!
    $order_by: [student_order_by!]
    $where: student_bool_exp
  ) {
    student(
      offset: $offset
      limit: $limit
      order_by: $order_by
      where: $where
    ) {
      id
      user {
        displayName
        email
      }
      school {
        name
      }
      birth_date
      created_at
    }
    student_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const STUDENT_QUERY_ONE = gql`
  query GetStudentById($id: Int!) {
    student_by_pk(id: $id) {
      id
      user {
        displayName
        email
      }
      school {
        name
      }
      birth_date
      created_at
    }
  }
`;

export const CREATE_STUDENT = gql`
  mutation CreateStudent($object: student_insert_input!) {
    insert_student_one(object: $object) {
      id
      user {
        displayName
        email
      }
      school {
        name
      }
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: Int!) {
    delete_student_by_pk(id: $id) {
      id
    }
  }
`;
