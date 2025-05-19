import { defineAbilitiesFor } from "@permissions/policies";
import { useSession } from "next-auth/react";

export function useAbility() {
  const { data: session } = useSession();
  const role = session?.user?.role as any;
  return defineAbilitiesFor(role as any);
}
