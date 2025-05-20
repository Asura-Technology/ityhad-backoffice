"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Card, Row, Col, Divider, Space } from "antd";
import {
  UserOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import React from "react";
import { DOCTOR_QUERY_ONE } from "@queries/doctors";
import { Protected } from "@permissions/layout";

const { Title, Text } = Typography;

export default function DoctorShow() {
  const { queryResult } = useShow({
    meta: {
      gqlQuery: DOCTOR_QUERY_ONE,
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Protected
      action="read"
      subject="doctor"
      fallback={
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Text type="danger">
            Vous n&apos;avez pas la permission d&apos;accéder à cette page.
          </Text>
        </div>
      }
    >
      <Show isLoading={isLoading} title="Détails du Médecin">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Space align="center">
                  <UserOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
                  <Title level={4} style={{ margin: 0, color: "#ff4d4f" }}>
                    Informations du Médecin
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">ID du Médecin</Text>
                  <TextField value={record?.id} />
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Nom</Text>
                  <TextField value={record?.user?.displayName} />
                </Space>
              </Col>
            </Row>
          </Card>

          <Card>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Space align="center">
                  <MailOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
                  <Title level={4} style={{ margin: 0, color: "#ff4d4f" }}>
                    Informations de Contact
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Email</Text>
                  <Space>
                    <MailOutlined style={{ color: "#ff4d4f" }} />
                    <TextField value={record?.user?.email} />
                  </Space>
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Adresse</Text>
                  <Space>
                    <EnvironmentOutlined style={{ color: "#ff4d4f" }} />
                    <TextField value={record?.address?.address1} />
                  </Space>
                </Space>
              </Col>
            </Row>
          </Card>
        </Space>
      </Show>
    </Protected>
  );
}
