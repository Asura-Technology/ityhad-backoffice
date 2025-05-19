"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Card, Row, Col, Divider, Space } from "antd";
import { UserOutlined, MailOutlined, BankOutlined } from "@ant-design/icons";
import React from "react";
import { STUDENT_QUERY_ONE } from "@queries/students";

const { Title, Text } = Typography;

export default function StudentShow() {
  const { queryResult } = useShow({
    meta: {
      gqlQuery: STUDENT_QUERY_ONE,
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
                <UserOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
                <Title level={4} style={{ margin: 0, color: "#ff4d4f" }}>
                  Student Information
                </Title>
              </Space>
            </Col>
            <Col span={24}>
              <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Student ID</Text>
                <TextField value={record?.id} />
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Name</Text>
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
                  Contact Information
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
                <Text type="secondary">School</Text>
                <Space>
                  <BankOutlined style={{ color: "#ff4d4f" }} />
                  <TextField value={record?.school?.name} />
                </Space>
              </Space>
            </Col>
          </Row>
        </Card>
      </Space>
    </Show>
  );
}
