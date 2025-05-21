// /permissions/roles.ts
export enum Role {
  ADMIN = "super-admin",
  DOCTOR = "doctor",
  SCHOOL = "school",
}

// /permissions/actions.ts
export type Action = "create" | "read" | "update" | "delete" | "manage";

// /permissions/subjects.ts
export type Subject =
  | "report"
  | "testimony"
  | "student"
  | "doctor"
  | "school"
  | "all";
