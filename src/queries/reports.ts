import gql from "graphql-tag";

export const REPORTS_QUERY = gql`
  query GetReports(
    $offset: Int!
    $limit: Int!
    $order_by: [report_order_by!]
    $where: report_bool_exp
  ) {
    report(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {
      id
      description
      recommendation
      is_dangerous
      is_private
      report_statuses {
        id
        status {
          id
          code
          name
        }
        date
      }
    }
    report_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const REPORT_QUERY_ONE = gql`
  query GetReportById($id: Int!) {
    report_by_pk(id: $id) {
      id
      description
      recommendation
      is_dangerous
      is_private
      report_statuses {
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

export const DELETE_REPORT = gql`
  mutation DeleteReport($id: Int!) {
    delete_report_by_pk(id: $id) {
      id
    }
  }
`;
