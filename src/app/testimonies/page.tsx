"use client";

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, LogicalFilter } from "@refinedev/core";
import { Space, Table, Tag, Input, DatePicker } from "antd";
import React, { useState } from "react";
import { TESTIMONIES_QUERY } from "@queries/testimonies";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function TestimonyList() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = React.useState<[string | undefined, string | undefined]>([undefined, undefined]);
  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
    meta: {
      fields: TESTIMONIES_QUERY,
    },
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    const filters: LogicalFilter[] = [
      {
        field: "description",
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
        value: dayjs(dateRange[1]).endOf('day').toISOString(),
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
        value: dayjs(dateStrings[1]).endOf('day').toISOString(),
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
      render: (value: string) =>
        value?.slice(0, 100) + (value?.length > 100 ? "..." : ""),
    },
    {
      title: "Lieu",
      dataIndex: "place",
      key: "place",
      sorter: true,
    },
    {
      title: "Élève",
      dataIndex: ["student", "user", "displayName"],
      key: "student",
      sorter: true,
    },
    {
      title: "Dernier statut",
      dataIndex: ["testimony_statuses", 0, "status", "name"],
      key: "latest_status",
      sorter: true,
    },
    {
      title: "Dernière mise à jour",
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
      render: (_: any, record: BaseRecord) => (
        <Space>
          <ShowButton hideText size="small" recordItemId={record.id} />
          <EditButton hideText size="small" recordItemId={record.id} />
          <DeleteButton hideText size="small" recordItemId={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <List
      headerButtons={[
        <Input.Search
          key="search"
          placeholder="Rechercher un témoignage..."
          allowClear
          onSearch={handleSearch}
          style={{ width: 200, marginRight: 8 }}
        />,
        <RangePicker
          key="date-range"
          onChange={handleDateRangeChange}
          style={{ marginRight: 8 }}
          placeholder={['Début', 'Fin']}
          allowClear
        />,
      ]}
    >
      <Table {...tableProps} columns={columns} rowKey="id" />
    </List>
  );
}
