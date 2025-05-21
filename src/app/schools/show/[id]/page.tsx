"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Card, Row, Col, Divider, Space } from "antd";
import { BankOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";
import { SCHOOL_QUERY_ONE } from "@queries/schools";
import { Protected } from "@permissions/layout";

const { Title, Text } = Typography;

export default function SchoolShow() {
  const { queryResult } = useShow({
    meta: {
      gqlQuery: SCHOOL_QUERY_ONE,
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Protected
      action="read"
      subject="school"
      fallback={
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Text type="danger">
            Vous n&apos;avez pas la permission d&apos;accéder à cette page.
          </Text>
        </div>
      }
    >
      <Show isLoading={isLoading} title="Détails de l'École">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Space align="center">
                  <BankOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
                  <Title level={4} style={{ margin: 0, color: "#ff4d4f" }}>
                    Informations de l&apos;École
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Nom de l&apos;École</Text>
                  <TextField value={record?.name} />
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">ID de l&apos;École</Text>
                  <TextField value={record?.id} />
                </Space>
              </Col>
            </Row>
          </Card>

          <Card>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Space align="center">
                  <UserOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
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
                  <Text type="secondary">Nom du Contact</Text>
                  <TextField value={record?.user?.displayName} />
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Email du Contact</Text>
                  <Space>
                    <MailOutlined style={{ color: "#ff4d4f" }} />
                    <TextField value={record?.user?.email} />
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
