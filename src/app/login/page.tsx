"use client";

import { AuthPage } from "@components/auth-page";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return (
    <AuthPage
      type="login"
      formProps={{
        onFinish: handleLogin,
        initialValues: { email: "admin@user.com", password: "demodemo" },
      }}
    />
  );
}
