import { defineAbilitiesFor } from "@permissions/policies";
import { getAuthCookie } from "@utils/tokenManager";
import { useEffect, useState } from "react";

export function useAbility() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuthCookie();
    if (auth?.user?.roles?.[0]) {
      setRole(auth.user.roles[0]);
    }
  }, []);

  return defineAbilitiesFor(role as any);
}
