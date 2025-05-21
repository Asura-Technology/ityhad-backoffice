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
import { Protected } from "@permissions/layout";

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
    <Protected
      action="read"
      subject="testimony"
      fallback={
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Text type="danger">
            Vous n&apos;avez pas la permission d&apos;accéder à cette page.
          </Text>
        </div>
      }
    >
      <Show isLoading={isLoading} title="Détails du Témoignage">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Space align="center">
                  <FileTextOutlined
                    style={{ fontSize: 24, color: "#ff4d4f" }}
                  />
                  <Title level={4} style={{ margin: 0, color: "#ff4d4f" }}>
                    Détails du Témoignage
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">ID du Témoignage</Text>
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
                  <Text type="secondary">Recommandation</Text>
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
                    État du Témoignage
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
              </Col>
              <Col xs={24} md={8}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">État</Text>
                  <Tag color="red">{latestStatus?.status?.name}</Tag>
                </Space>
              </Col>
              <Col xs={24} md={8}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Code d&apos;État</Text>
                  <TextField value={latestStatus?.status?.code} />
                </Space>
              </Col>
              <Col xs={24} md={8}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Dernière Mise à Jour</Text>
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
                    Paramètres du Témoignage
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Dangereux</Text>
                  <BooleanField value={record?.is_dangerous} />
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Privé</Text>
                  <BooleanField value={record?.is_private} />
                </Space>
              </Col>
            </Row>
          </Card>
        </Space>
      </Show>
    </Protected>
  );
}
