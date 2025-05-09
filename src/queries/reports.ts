export const REPORTS_QUERY = [
  "id",
  "description",
  "recommendation",
  "is_dangerous",
  "is_private",
  {
    report_statuses: [
      "id",
      "date",
      {
        status: ["id", "code", "name"],
      },
    ],
  },
];
