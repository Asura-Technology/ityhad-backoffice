import type { AuthProvider } from "@refinedev/core";
import { cookies } from "next/headers";
import type { Session } from "@/types/auth";

type UserRole = "admin" | "school" | "doctor" | "student";

interface User {
  name: string;
  email: string;
  roles: UserRole[];
  avatar: string;
}

export const authProviderServer: Pick<AuthProvider, "check"> = {
  check: async () => {
    const cookieStore = cookies();
    const auth = cookieStore.get("auth");

    if (auth) {
      try {
        const authUser = JSON.parse(auth.value) as Session;
        if (authUser) {
          return {
            authenticated: true,
          };
        }
      } catch (error) {
        // Invalid auth cookie
      }
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
};
