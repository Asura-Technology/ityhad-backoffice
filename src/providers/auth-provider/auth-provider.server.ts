import type { AuthProvider } from "@refinedev/core";
import { cookies } from "next/headers";

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
        const user = JSON.parse(auth.value) as User;
        if (user.roles && user.roles.length > 0) {
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
