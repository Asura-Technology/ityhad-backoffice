"use client";

import {
  DateField,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, LogicalFilter } from "@refinedev/core";
import { Space, Table, Tag, Input, DatePicker, Typography } from "antd";
import React, { useState } from "react";
import { TESTIMONIES_QUERY, DELETE_TESTIMONY } from "@queries/testimonies";
import dayjs from "dayjs";
import { Protected } from "@permissions/layout";
import { useAbility } from "@hooks/useAbility";

const { RangePicker } = DatePicker;
const { Text } = Typography;

export default function TestimonyList() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = React.useState<
    [string | undefined, string | undefined]
  >([undefined, undefined]);
  const ability = useAbility();
  const isAdmin = ability.can("manage", "all");
  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
    meta: {
      gqlQuery: TESTIMONIES_QUERY,
    },
  });

  const handleSearch = (value: string, field: string) => {
    const filters: LogicalFilter[] = [
      {
        field,
        operator: "contains",
        value,
      },
    ];
    if (dateRange[0] && dateRange[1]) {
      filters.push({
        field: "created_at",
        operator: "gte",
        value: dateRange[0],
      } as LogicalFilter);
      filters.push({
        field: "created_at",
        operator: "lte",
        value: dayjs(dateRange[1]).endOf("day").toISOString(),
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
        value: search,
      },
    ];
    if (dateStrings[0] && dateStrings[1]) {
      filters.push({
        field: "created_at",
        operator: "gte",
        value: dateStrings[0],
      } as LogicalFilter);
      filters.push({
        field: "created_at",
        operator: "lte",
        value: dayjs(dateStrings[1]).endOf("day").toISOString(),
      } as LogicalFilter);
    }
    setFilters(filters, "replace");
  };

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
      filterDropdown: (props: any) => (
        <FilterDropdown {...props}>
          <Input
            placeholder="Rechercher Description"
            allowClear
            onPressEnter={(e) => {
              const value = (e.target as HTMLInputElement).value;
              handleSearch(value, "description");
            }}
          />
        </FilterDropdown>
      ),
      render: (value: string) =>
        value?.slice(0, 100) + (value?.length > 100 ? "..." : ""),
    },
    {
      title: "Lieu",
      dataIndex: "place",
      key: "place",
      sorter: true,
      filterDropdown: (props: any) => (
        <FilterDropdown {...props}>
          <Input
            placeholder="Rechercher Lieu"
            allowClear
            onPressEnter={(e) => {
              const value = (e.target as HTMLInputElement).value;
              handleSearch(value, "place");
            }}
          />
        </FilterDropdown>
      ),
    },
    {
      title: "Élève",
      dataIndex: "victim",
      key: "student",
      render: (value: string) => value || "N/A",
      sorter: true,
    },
    {
      title: "Statut",
      dataIndex: ["testimony_statuses"],
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
      dataIndex: ["testimony_statuses", 0, "date"],
      key: "last_updated",
      sorter: true,
      render: (value: string) => (
        <DateField value={value} format="DD/MM/YYYY HH:mm" locales="fr-FR" />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: unknown, record: BaseRecord) => (
        <Space>
          <ShowButton hideText size="small" recordItemId={record.id} />
          {isAdmin && (
            <DeleteButton
              hideText
              size="small"
              recordItemId={record.id}
              meta={{
                gqlMutation: DELETE_TESTIMONY,
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
      subject="testimony"
      fallback={
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Text type="danger">
            Vous n&apos;avez pas la permission d&apos;accéder à cette page.
          </Text>
        </div>
      }
    >
      <List headerButtons={[]}>
        <Table {...tableProps} columns={columns} rowKey="id" />
      </List>
    </Protected>
  );
}
