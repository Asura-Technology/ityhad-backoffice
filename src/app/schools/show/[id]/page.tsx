"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Card, Row, Col, Divider, Space } from "antd";
import { BankOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";
import { SCHOOL_QUERY_ONE } from "@queries/schools";

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
    <Show isLoading={isLoading}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space align="center">
                <BankOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
                <Title level={4} style={{ margin: 0, color: "#ff4d4f" }}>
                  School Information
                </Title>
              </Space>
            </Col>
            <Col span={24}>
              <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">School Name</Text>
                <TextField value={record?.name} />
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">School ID</Text>
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
                  Contact Information
                </Title>
              </Space>
            </Col>
            <Col span={24}>
              <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Contact Name</Text>
                <TextField value={record?.user?.displayName} />
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Contact Email</Text>
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
  );
}
