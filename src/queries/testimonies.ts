export const TESTIMONIES_QUERY = [
  "id",
  "description",
  "place",
  {
    student: [
      {
        user: ["displayName"],
      },
    ],
  },
  {
    testimony_statuses: [
      "id",
      "date",
      {
        status: ["id", "code", "name"],
      },
    ],
  },
];
