"use client";

import React from "react";
import {
  Card,
  Col,
  Row,
  Statistic,
  Tag,
  DatePicker,
  Input,
  Button,
  Table,
  Space,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useTable } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { REPORTS_QUERY } from "@queries/reports";
import { DateField } from "@refinedev/antd";

const { RangePicker } = DatePicker;

export default function DashboardPage() {
  // Table data
  const { tableProps } = useTable({
    resource: "report",
    meta: { fields: REPORTS_QUERY },
    pagination: { pageSize: 8 },
  });

  // Stats data
  const { data: reportsList } = useList({
    resource: "report",
    meta: { fields: REPORTS_QUERY },
    pagination: { pageSize: 1000 },
  });
  const reports = reportsList?.data || [];

  // Calculate stats
  const totalReports = reports.length;
  const processedReports = reports.filter(
    (r: any) => r.report_statuses?.[0]?.status?.code === "COMPLETED"
  ).length;
  const unprocessedReports = totalReports - processedReports;
  // Example: professionals online (mocked, replace with real query if available)
  const professionalsOnline = 4;

  const stats = [
    {
      title: "Total des signalements",
      value: totalReports,
      icon: <FileTextOutlined />,
      color: "#ff4d4f",
    },
    {
      title: "Signalements non traités",
      value: unprocessedReports,
      icon: <FileTextOutlined />,
      color: "#ff4d4f",
    },
    {
      title: "Signalements traités",
      value: processedReports,
      icon: <FileTextOutlined />,
      color: "#52c41a",
    },
    {
      title: "Délai moyen de réponse",
      value: "-",
      icon: <ArrowUpOutlined />,
      color: "#52c41a",
    },
    {
      title: "Professionnels en ligne",
      value: professionalsOnline,
      icon: <UserOutlined />,
      color: "#faad14",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (value: string) =>
        value?.slice(0, 100) + (value?.length > 100 ? "..." : ""),
    },
    {
      title: "Recommendation",
      dataIndex: "recommendation",
      key: "recommendation",
      render: (value: string) =>
        value?.slice(0, 100) + (value?.length > 100 ? "..." : ""),
    },
    {
      title: "Dangerous",
      dataIndex: "is_dangerous",
      key: "is_dangerous",
      render: (value: boolean) => (
        <Tag color={value ? "red" : "green"}>{value ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Private",
      dataIndex: "is_private",
      key: "is_private",
      render: (value: boolean) => (
        <Tag color={value ? "blue" : "default"}>{value ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Latest Status",
      dataIndex: ["report_statuses", 0, "status", "name"],
      key: "latest_status",
    },
    {
      title: "Last Updated",
      dataIndex: ["report_statuses", 0, "date"],
      key: "last_updated",
      render: (value: string) => (
        <DateField value={value} format="DD/MM/YYYY HH:mm" locales="fr-FR" />
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* Filter Bar */}
      <Row gutter={16} style={{ marginBottom: 24 }} align="middle">
        <Col>
          <RangePicker />
        </Col>
        <Col>
          <Input.Search placeholder="Recherche..." style={{ width: 200 }} />
        </Col>
        <Col>
          <Button type="primary">Filtrer</Button>
        </Col>
        <Col>
          <Button>Export</Button>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {stats.map((stat, idx) => (
          <Col span={4} key={idx}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={{ color: stat.color }}
                prefix={stat.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Table */}
      <Card title="Signalements récents">
        <Table {...tableProps} columns={columns} rowKey="id" />
      </Card>
    </div>
  );
}
