// src/components/AuthPage.tsx
"use client";
import { AuthPage as BaseAuthPage } from "@refinedev/antd";
import type { AuthPageProps } from "@refinedev/core";
import { useCallback } from "react";
import { useLogin, useNavigation } from "@refinedev/core";

export const AuthPage = (props: AuthPageProps) => {
  // grab the async version
  const { mutateAsync: login, isLoading } = useLogin<{
    email: string;
    password: string;
    remember: boolean;
  }>();
  const { push } = useNavigation();

  const handleSubmit = useCallback(
    async (values) => {
      // now this returns the AuthActionResponse object
      const { success, redirectTo, error } = await login({
        email: values.email,
        password: values.password,
        remember: values.remember,
      });

      if (success && redirectTo) {
        push(redirectTo);
      }
      // you can also show `error` in a toast here
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
      submitButtonProps={{ loading: isLoading }}
    />
  );
};
