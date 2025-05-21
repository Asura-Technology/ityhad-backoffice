// src/components/AuthPage.tsx
"use client";
import { AuthPage as BaseAuthPage } from "@refinedev/antd";
import type { AuthPageProps } from "@refinedev/core";
import { useCallback } from "react";
import { useLogin, useNavigation } from "@refinedev/core";
import { message } from "antd";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export const AuthPage = (props: AuthPageProps) => {
  const { mutateAsync: login } = useLogin<LoginFormValues>();
  const { push } = useNavigation();

  const handleSubmit = useCallback(
    async (values: LoginFormValues) => {
      try {
        const response = await login({
          email: values.email,
          password: values.password,
          remember: values.remember,
        });

        if (response.success) {
          push(response.redirectTo || "/");
        } else if (response.error) {
          message.error(response.error.toString());
        }
      } catch (error: any) {
        message.error(
          error?.message || "Une erreur est survenue lors de la connexion"
        );
      }
    },
    [login, push]
  );

  return (
    <BaseAuthPage
      {...props}
      formProps={{
        initialValues: {
          email: "admin@gmail.com",
          password: "123456",
          remember: false,
        },
        onFinish: handleSubmit,
      }}
    />
  );
};
