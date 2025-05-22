"use client";

import { Create, useForm } from "@refinedev/antd";
import { Button, Form, Input, Typography, message, Select } from "antd";
import React, { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { Protected } from "@permissions/layout";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSelect } from "@refinedev/antd";
import { useAbility } from "@hooks/useAbility";

const { Text } = Typography;

interface StudentFormValues {
  user: {
    displayName: string;
    email: string;
  };
  password: string;
  school: {
    id?: string;
    name: string;
  };
}

export default function StudentCreate() {
  const router = useRouter();
  const { data: identity } = useGetIdentity<{
    user: { school: { id: string; name: string }; roles: string[] };
  }>();

  const [form] = Form.useForm<StudentFormValues>();
  const [loading, setLoading] = useState(false);
  const ability = useAbility();
  const isAdmin = ability.can("manage", "all");

  const { selectProps: schoolSelectProps } = useSelect({
    resource: "school",
    optionLabel: "name",
    optionValue: "id",
    meta: {
      fields: ["id", "name"],
    },
  });

  const handleFormSubmit = async (values: StudentFormValues) => {
    setLoading(true);
    try {
      const auth = Cookies.get("auth");
      if (!auth) {
        message.error("Vous devez être connecté pour créer un étudiant");
        return;
      }

      const { accessToken } = JSON.parse(auth);

      await axios.post(
        `/api/auth/signup/student-register`,
        {
          email: values.user.email,
          password: values.password,
          options: {
            schoolId: isAdmin ? values?.school?.id : identity?.user?.school,
            allowedRoles: ["student"],
            defaultRole: "student",
            displayName: values.user.displayName,
            locale: "fr",
            metadata: {},
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      message.success("Étudiant créé avec succès");
      router.push("/students");
      form.resetFields();
    } catch (error: any) {
      console.error("Error creating student:", error);
      message.error(
        error?.response?.data?.message ||
          "Erreur lors de la création de l'étudiant"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected
      action="create"
      subject="student"
      fallback={
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Text type="danger">
            Vous n&apos;avez pas la permission de créer des étudiants.
          </Text>
        </div>
      }
    >
      <Create
        isLoading={loading}
        footerButtons={() => (
          <Button
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            Créer l&apos;étudiant
          </Button>
        )}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="École"
            name={isAdmin ? ["school", "id"] : ["school"]}
            rules={[{ required: true }]}
            initialValue={isAdmin ? undefined : identity?.user?.school}
          >
            {isAdmin ? (
              <Select
                {...schoolSelectProps}
                placeholder="Sélectionnez une école"
              />
            ) : (
              <Input disabled />
            )}
          </Form.Item>
          <Form.Item
            label={"Nom complet"}
            name={["user", "displayName"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Email"}
            name={["user", "email"]}
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Mot de passe"}
            name="password"
            rules={[
              {
                required: true,
                min: 6,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Create>
    </Protected>
  );
}
