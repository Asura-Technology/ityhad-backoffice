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
import dayjs from "dayjs";
import { CrudFilter, LogicalFilter } from "@refinedev/core";

const { RangePicker } = DatePicker;

export default function DashboardPage() {
  const [searchText, setSearchText] = React.useState<string>("");
  const [dateRange, setDateRange] = React.useState<[string | undefined, string | undefined]>([undefined, undefined]);
  
  // Table data
  const { tableProps, setFilters } = useTable({
    resource: "report",
    meta: { fields: REPORTS_QUERY },
  });

  // Stats data
  const { data: reportsList } = useList({
    resource: "report",
    meta: { fields: REPORTS_QUERY },
    pagination: { pageSize: 1000 },
  });
  const reports = reportsList?.data || [];

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
      "Recommendation",
      "Dangerous",
      "Private",
      "Latest Status",
      "Last Updated"
    ];

    // Convert data to CSV rows
    const csvRows = data.map((report: any) => [
      report.id,
      report.description?.replace(/"/g, '""') || "", // Escape quotes in text
      report.recommendation?.replace(/"/g, '""') || "",
      report.is_dangerous ? "Yes" : "No",
      report.is_private ? "Yes" : "No",
      report.report_statuses?.[0]?.status?.name || "",
      report.report_statuses?.[0]?.date ? 
        dayjs(report.report_statuses[0].date).format("DD/MM/YYYY HH:mm") : ""
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `reports_export_${dayjs().format("YYYY-MM-DD_HH-mm")}.csv`);
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
          <RangePicker 
            onChange={handleDateRangeChange}
            allowClear
          />
        </Col>
        <Col>
          <Input.Search 
            placeholder="Recherche..." 
            style={{ width: 200 }}
            onSearch={handleSearch}
            allowClear
          />
        </Col>
        <Col>
          <Button 
            type="primary" 
            onClick={handleExport}
            icon={<FileTextOutlined />}
          >
            Export
          </Button>
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
