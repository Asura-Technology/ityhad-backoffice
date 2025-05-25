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
import { REPORT_QUERY_ONE } from "@queries/reports";
import { Protected } from "@permissions/layout";

const { Title, Text } = Typography;

export default function ReportShow() {
  const { queryResult } = useShow({
    meta: {
      gqlQuery: REPORT_QUERY_ONE,
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;
  const latestStatus = record?.report_statuses?.length
    ? [...record.report_statuses].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0]
    : null;

  return (
    <Protected
      action="read"
      subject="report"
      fallback={
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Text type="danger">
            Vous n&apos;avez pas la permission d&apos;accéder à cette page.
          </Text>
        </div>
      }
    >
      <Show isLoading={isLoading} title="Détails du Rapport">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Space align="center">
                  <FileTextOutlined
                    style={{ fontSize: 24, color: "#ff4d4f" }}
                  />
                  <Title level={4} style={{ margin: 0, color: "#ff4d4f" }}>
                    Détails du Rapport
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">ID du Rapport</Text>
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
                    État du Rapport
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
              </Col>
              <Col xs={24} md={8}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">État</Text>
                  <Tag color="gray">{latestStatus?.status?.name}</Tag>
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
                  <Text type="secondary">Date du statut</Text>
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
                    Paramètres du Rapport
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

          <Card>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Space align="center">
                  <SafetyOutlined style={{ fontSize: 24, color: "#ff4d4f" }} />
                  <Title level={4} style={{ margin: 0, color: "#ff4d4f" }}>
                    Classification et Impact
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Divider style={{ margin: "12px 0", borderColor: "#ffccc7" }} />
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Criticité</Text>
                  <Space>
                    <Tag color="orange">{record?.criticity?.name || "N/A"}</Tag>
                    <Text type="secondary">({record?.criticity?.code || "N/A"})</Text>
                  </Space>
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Groupe d&apos;âge</Text>
                  <Space>
                    <Text>{record?.age_group?.name || "N/A"}</Text>
                    <Text type="secondary">({record?.age_group?.code || "N/A"})</Text>
                  </Space>
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Orientation</Text>
                  <Space>
                    <Text>{record?.referral?.name || "N/A"}</Text>
                    <Text type="secondary">({record?.referral?.code || "N/A"})</Text>
                  </Space>
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">Impact</Text>
                  <Space>
                    <Tag color="purple">{record?.impact?.name || "N/A"}</Tag>
                    <Text type="secondary">({record?.impact?.code || "N/A"})</Text>
                  </Space>
                </Space>
              </Col>
              <Col xs={24}>
                <Space direction="vertical" size={4}>
                  <Text type="secondary">ID École</Text>
                  <Text>{record?.student?.school_id || "N/A"}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Space>
      </Show>
    </Protected>
  );
}
