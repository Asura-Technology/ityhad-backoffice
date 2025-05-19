// src/app/login/page.tsx
import { redirect } from "next/navigation";
import { AuthPage } from "@components/auth-page";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";

export default async function LoginPage() {
  const data = await authProviderServer.check();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return <AuthPage type="login" />;
}
