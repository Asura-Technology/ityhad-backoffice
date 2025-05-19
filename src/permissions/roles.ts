// /permissions/roles.ts
export enum Role {
  ADMIN = "admin",
  DOCTOR = "doctor",
  SCHOOL = "school",
}

// /permissions/actions.ts
export type Action = "create" | "read" | "update" | "delete" | "manage";

// /permissions/subjects.ts
export type Subject = "report" | "testimony" | "all";
