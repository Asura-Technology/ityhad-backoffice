// /permissions/policies.ts
import {
  AbilityBuilder,
  PureAbility,
  AbilityClass,
  // … other imports
} from "@casl/ability";

import { Action, Role, Subject } from "./roles";

// tell TS what our Ability looks like:
export type AppAbility = PureAbility<[Action, Subject]>;

export function defineAbilitiesFor(role: Role): AppAbility {
  // use PureAbility as the factory instead of the deprecated `Ability`
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    PureAbility as AbilityClass<AppAbility>
  );

  switch (role) {
    case Role.ADMIN:
      can("manage", "all");
      break;
    case Role.DOCTOR:
      can(["read", "update"], "report");
      can("read", "testimony");
      break;
    case Role.SCHOOL:
      can(["read", "update"], "report");
      can(["read", "update"], "testimony");
      can(["read", "create"], ["student"]);
      break;
    default:
      can("read", ["report", "testimony"]);
      break;
  }

  // build() returns a PureAbility instance
  return build();
}
