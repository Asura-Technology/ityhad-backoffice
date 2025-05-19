// src/providers/auth-provider/auth-provider.client.ts
"use client";
import type { AuthBindings } from "@refinedev/core";
import Cookies from "js-cookie";
import axiosClient from "@utils/axiosClient";
import type { LoginResponse } from "@/types/auth";

export const authProviderClient: AuthBindings = {
  login: async ({ email, password, remember }) => {
    try {
      const res = await axiosClient.post("/signin/email-password", {
        email,
        password,
      });
      const data: LoginResponse = res.data;
      Cookies.set(
        "auth",
        JSON.stringify({
          ...data.session,
          accessTokenExpiresAt: Date.now() + data.session.accessTokenExpiresIn,
        }),
        {
          expires: remember ? 30 : undefined,
          path: "/",
        }
      );
      return { success: true, redirectTo: "/" };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  },

  logout: async () => {
    Cookies.remove("auth", { path: "/" });
    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      return { authenticated: true };
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
        const { roles } = JSON.parse(auth);
        return roles as string[];
      } catch {
        return null;
      }
    }
    return null;
  },

  getIdentity: async () => {
    const auth = Cookies.get("auth");
    if (auth) {
      try {
        return JSON.parse(auth);
      } catch {
        return null;
      }
    }
    return null;
  },

  onError: async (error) => {
    if (error.response?.status === 401) {
      return { logout: true, redirectTo: "/login" };
    }
    return { error };
  },
};
