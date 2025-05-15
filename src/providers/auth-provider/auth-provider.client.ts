"use client";

import type { AuthProvider } from "@refinedev/core";
import Cookies from "js-cookie";

type UserRole = "admin" | "school" | "doctor" | "student";

interface User {
  name: string;
  email: string;
  roles: UserRole[];
  avatar: string;
}

const mockUsers: User[] = [
  {
    name: "Admin User",
    email: "admin@user.com",
    roles: ["admin"],
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "School Admin",
    email: "school@user.com",
    roles: ["school"],
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Doctor User",
    email: "doctor@user.com",
    roles: ["doctor"],
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Student User",
    email: "student@user.com",
    roles: ["student"],
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

export const authProviderClient: AuthProvider = {
  login: async ({ email, username, password, remember }) => {
    const user = mockUsers.find((u) => u.email === email);

    if (user) {
      const userData = JSON.stringify(user);
      Cookies.set("auth", userData, {
        expires: remember ? 30 : undefined,
        path: "/",
      });

      window.location.href = "/dashboard";

      return {
        success: true,
        redirectTo: "/dashboard",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid email or password",
      },
    };
  },
  logout: async () => {
    Cookies.remove("auth", { path: "/" });
    window.location.href = "/login";

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const auth = Cookies.get("auth");

    if (auth) {
      try {
        const user = JSON.parse(auth) as User;
        if (user.roles && user.roles.length > 0) {
          return {
            authenticated: true,
            redirectTo: "/dashboard",
          };
        }
      } catch (error) {
        return {
          authenticated: false,
          logout: true,
          redirectTo: "/login",
        };
      }
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    const auth = Cookies.get("auth");

    if (auth) {
      try {
        const user = JSON.parse(auth) as User;
        return user.roles;
      } catch (error) {
        return null;
      }
    }
    return null;
  },
  getIdentity: async () => {
    const auth = Cookies.get("auth");

    if (auth) {
      try {
        const user = JSON.parse(auth) as User;
        return user;
      } catch (error) {
        return null;
      }
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
