import React from "react";
import { Layout } from "@components/layout";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const data = await getData();
  console.log("Dashboard layout data:", { data });
  if (!data.authenticated) {
    return redirect(data?.redirectTo || "/login");
  }

  return <Layout>{children}</Layout>;
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
  };
}
