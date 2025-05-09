export const STUDENTS_QUERY = [
  "id",
  {
    user: ["displayName", "email"],
  },
  {
    school: ["name"],
  },
];
