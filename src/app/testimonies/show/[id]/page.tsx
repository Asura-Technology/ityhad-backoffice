"use client";

import { DateField, Show, TextField, BooleanField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Card, Row, Col, Divider, Space, Tag } from "antd";
import {
  FileTextOutlined,
  SafetyOutlined,
  ClockCircleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import React from "react";
import { TESTIMONY_QUERY_ONE } from "@queries/testimonies";

const { Title, Text } = Typography;

export default function TestimonyShow() {
  const { queryResult } = useShow({
    meta: {
      gqlMutation: TESTIMONY_QUERY_ONE,
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;
  const latestStatus = record?.testimony_statuses?.[0];

  return (
    <Show isLoading={isLoading}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space align="center">
                <FileTextOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
                <Title level={4} style={{ margin: 0, color: "#ff4d4f" }}>
                  Testimony Details
                </Title>
              </Space>
            </Col>
            <Col span={24}>
              <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Testimony ID</Text>
                <TextField value={record?.id} />
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Description</Text>
                <TextField value={record?.description} />
              </Space>
            </Col>
            <Col xs={24}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Recommendation</Text>
                <TextField value={record?.recommendation} />
              </Space>
            </Col>
          </Row>
        </Card>

        <Card>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space align="center">
                <SafetyOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
                <Title level={4} style={{ margin: 0, color: "#ff4d4f" }}>
                  Testimony Status
                </Title>
              </Space>
            </Col>
            <Col span={24}>
              <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
            </Col>
            <Col xs={24} md={8}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Status</Text>
                <Tag color="red">{latestStatus?.status?.name}</Tag>
              </Space>
            </Col>
            <Col xs={24} md={8}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Status Code</Text>
                <TextField value={latestStatus?.status?.code} />
              </Space>
            </Col>
            <Col xs={24} md={8}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Last Updated</Text>
                <Space>
                  <ClockCircleOutlined style={{ color: "#ff4d4f" }} />
                  <DateField value={latestStatus?.date} />
                </Space>
              </Space>
            </Col>
          </Row>
        </Card>

        <Card>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space align="center">
                <LockOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
                <Title level={4} style={{ margin: 0, color: "#ff4d4f" }}>
                  Testimony Settings
                </Title>
              </Space>
            </Col>
            <Col span={24}>
              <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Dangerous</Text>
                <BooleanField value={record?.is_dangerous} />
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={4}>
                <Text type="secondary">Private</Text>
                <BooleanField value={record?.is_private} />
              </Space>
            </Col>
          </Row>
        </Card>
      </Space>
    </Show>
  );
}
