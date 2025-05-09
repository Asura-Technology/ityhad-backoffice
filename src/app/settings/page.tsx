"use client";

import React, { useState } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { useGetIdentity } from "@refinedev/core";
import { SettingOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function SettingsPage() {
  const { data: user } = useGetIdentity();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    // TODO: Implement password change logic (API call)
    setTimeout(() => {
      setLoading(false);
      message.success("Mot de passe changé avec succès !");
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <Card
        title={
          <span>
            <SettingOutlined /> Paramètres
          </span>
        }
      >
        <Title level={4}>Mes informations</Title>
        <p>
          <b>Nom:</b> {user?.name || "-"}
        </p>
        <p>
          <b>Email:</b> {user?.email || "-"}
        </p>

        <Title level={5} style={{ marginTop: 32 }}>
          Changer le mot de passe
        </Title>
        <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 16 }}>
          <Form.Item
            label="Mot de passe actuel"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre mot de passe actuel",
              },
            ]}
          >
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Form.Item
            label="Nouveau mot de passe"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Veuillez entrer un nouveau mot de passe",
              },
            ]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            label="Confirmer le nouveau mot de passe"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Veuillez confirmer le nouveau mot de passe",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Les mots de passe ne correspondent pas")
                  );
                },
              }),
            ]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Changer le mot de passe
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
