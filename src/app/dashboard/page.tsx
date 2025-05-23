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
  Typography,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  FileTextOutlined,
  TeamOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useTable } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { REPORTS_QUERY, DELETE_REPORT } from "@queries/reports";
import { TESTIMONIES_QUERY } from "@queries/testimonies";
import { DateField } from "@refinedev/antd";
import dayjs from "dayjs";
import { CrudFilter, LogicalFilter } from "@refinedev/core";
import { useAbility } from "@hooks/useAbility";
import { Role } from "@permissions/roles";
import { Protected } from "@permissions/layout";
import { ShowButton, DeleteButton } from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";

const { RangePicker } = DatePicker;
const { Text } = Typography;

export default function DashboardPage() {
  const [searchText, setSearchText] = React.useState<string>("");
  const [dateRange, setDateRange] = React.useState<
    [string | undefined, string | undefined]
  >([undefined, undefined]);
  const ability = useAbility();
  const isAdmin = ability.can("manage", "all");

  // Table data
  const { tableProps, setFilters } = useTable({
    resource: "report",
    meta: { gqlQuery: REPORTS_QUERY },
  });

  // Stats data
  const { data: reportsList } = useList({
    resource: "report",
    meta: { gqlQuery: REPORTS_QUERY },
    pagination: { pageSize: 1000 },
  });
  const { data: testimoniesList } = useList({
    resource: "testimony",
    meta: { gqlQuery: TESTIMONIES_QUERY },
    pagination: { pageSize: 1000 },
  });
  const reports = reportsList?.data || [];
  const testimonies = testimoniesList?.data || [];

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filters: LogicalFilter[] = [
      {
        field: "description",
        operator: "contains",
        value,
      },
    ];
    if (dateRange[0] && dateRange[1]) {
      filters.push({
        field: "report_statuses.date",
        operator: "gte",
        value: dateRange[0],
      } as LogicalFilter);
      filters.push({
        field: "report_statuses.date",
        operator: "lte",
        value: dateRange[1],
      } as LogicalFilter);
    }
    setFilters(filters, "replace");
  };

  const handleDateRangeChange = (_: any, dateStrings: [string, string]) => {
    setDateRange(dateStrings);
    const filters: LogicalFilter[] = [
      {
        field: "description",
        operator: "contains",
        value: searchText,
      },
    ];
    if (dateStrings[0] && dateStrings[1]) {
      filters.push({
        field: "report_statuses.date",
        operator: "gte",
        value: dateStrings[0],
      } as LogicalFilter);
      filters.push({
        field: "report_statuses.date",
        operator: "lte",
        value: dateStrings[1],
      } as LogicalFilter);
    }
    setFilters(filters, "replace");
  };

  const handleExport = () => {
    // Get the current filtered data
    const data = tableProps.dataSource || [];

    // Define CSV headers
    const headers = [
      "ID",
      "Description",
      "Recommandation",
      "Dangereux",
      "Privé",
      "Dernier Statut",
      "Dernière Mise à Jour",
    ];

    // Convert data to CSV rows
    const csvRows = data.map((report: any) => [
      report.id,
      report.description?.replace(/"/g, '""') || "", // Escape quotes in text
      report.recommendation?.replace(/"/g, '""') || "",
      report.is_dangerous ? "Oui" : "Non",
      report.is_private ? "Oui" : "Non",
      report.report_statuses?.[0]?.status?.name || "",
      report.report_statuses?.[0]?.date
        ? dayjs(report.report_statuses[0].date).format("DD/MM/YYYY HH:mm")
        : "",
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `reports_export_${dayjs().format("YYYY-MM-DD_HH-mm")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate stats using the filtered reports from the API
  const totalReports = reports.length;
  const processedReports = reports.filter(
    (r: any) => r.report_statuses?.[0]?.status?.code === "COMPLETED"
  ).length;
  const unprocessedReports = totalReports - processedReports;

  const totalTestimonies = testimonies.length;

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
      title: "Total des témoignages",
      value: totalTestimonies,
      icon: <MessageOutlined />,
      color: "#1890ff",
    },
    ...(isAdmin
      ? [
          {
            title: "Professionnels en ligne",
            value: professionalsOnline,
            icon: <UserOutlined />,
            color: "#faad14",
          },
        ]
      : []),
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: true,
      render: (value: string) =>
        value?.slice(0, 100) + (value?.length > 100 ? "..." : ""),
    },
    {
      title: "Recommandation",
      dataIndex: "recommendation",
      key: "recommendation",
      sorter: true,
      render: (value: string) =>
        value?.slice(0, 100) + (value?.length > 100 ? "..." : ""),
    },
    {
      title: "Dangereux",
      dataIndex: "is_dangerous",
      key: "is_dangerous",
      sorter: true,
      render: (value: boolean) => (
        <Tag color={value ? "red" : "green"}>{value ? "Oui" : "Non"}</Tag>
      ),
    },
    {
      title: "Privé",
      dataIndex: "is_private",
      key: "is_private",
      sorter: true,
      render: (value: boolean) => (
        <Tag color={value ? "blue" : "default"}>{value ? "Oui" : "Non"}</Tag>
      ),
    },
    {
      title: "Criticité",
      dataIndex: ["criticity", "name"],
      key: "criticity",
      sorter: true,
      render: (_: any, record: any) => (
        <Tag color="orange">{record.criticity?.name || "N/A"}</Tag>
      ),
    },
    {
      title: "Groupe d'âge",
      dataIndex: ["age_group", "name"],
      key: "age_group",
      sorter: true,
      render: (_: any, record: any) => record.age_group?.name || "N/A",
    },
    {
      title: "Orientation",
      dataIndex: ["referral", "name"],
      key: "referral",
      sorter: true,
      render: (_: any, record: any) => record.referral?.name || "N/A",
    },
    {
      title: "Impact",
      dataIndex: ["impact", "name"],
      key: "impact",
      sorter: true,
      render: (_: any, record: any) => (
        <Tag color="purple">{record.impact?.name || "N/A"}</Tag>
      ),
    },
    {
      title: "ID École",
      dataIndex: ["student", "school_id"],
      key: "school_id",
      sorter: true,
      render: (_: any, record: any) => record.student?.school_id || "N/A",
    },
    {
      title: "Statut",
      dataIndex: ["report_statuses"],
      key: "latest_status",
      sorter: true,
      render: (statuses: any[]) => {
        if (!statuses || statuses.length === 0) return "N/A";
        const sortedStatuses = [...statuses].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return sortedStatuses[0]?.status?.name || "N/A";
      },
    },
    {
      title: "Date du statut",
      dataIndex: ["report_statuses"],
      key: "last_updated",
      sorter: true,
      render: (statuses: any[]) => {
        if (!statuses || statuses.length === 0) return "N/A";
        const sortedStatuses = [...statuses].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return (
          <DateField
            value={sortedStatuses[0]?.date}
            format="DD/MM/YYYY HH:mm"
            locales="fr-FR"
          />
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: BaseRecord) => (
        <Space>
          <ShowButton
            hideText
            size="small"
            recordItemId={record.id}
            title="Afficher"
          />
          {isAdmin && (
            <DeleteButton
              hideText
              size="small"
              recordItemId={record.id}
              title="Supprimer"
              meta={{
                gqlMutation: DELETE_REPORT,
              }}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <Protected
      action="read"
      subject="dashboard"
      fallback={
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Text type="danger">
            Vous n&apos;avez pas la permission d&apos;accéder à cette page.
          </Text>
        </div>
      }
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <RangePicker
              onChange={handleDateRangeChange}
              allowClear
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input.Search
              placeholder="Recherche..."
              style={{ width: "100%" }}
              onSearch={handleSearch}
              allowClear
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={6}>
            <Button
              type="primary"
              onClick={handleExport}
              icon={<FileTextOutlined />}
              style={{ width: "100%" }}
            >
              Export
            </Button>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {stats.map((stat, idx) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={idx}>
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

        <Card title="Derniers Signalements">
          <Table
            {...tableProps}
            columns={columns}
            rowKey="id"
            pagination={{
              ...tableProps.pagination,
              pageSize: 10,
            }}
          />
        </Card>
      </Space>
    </Protected>
  );
}
