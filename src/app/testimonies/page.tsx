"use client";

import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Space, Table, Tag, Input } from "antd";
import React, { useState } from "react";
import { TESTIMONIES_QUERY } from "@queries/testimonies";

export default function TestimonyList() {
  const [search, setSearch] = useState("");
  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
    meta: {
      fields: TESTIMONIES_QUERY,
    },
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setFilters(
      [
        {
          field: "description",
          operator: "contains",
          value,
        },
      ],
      "replace"
    );
  };

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
      title: "Lieu",
      dataIndex: "place",
      key: "place",
    },
    {
      title: "Élève",
      dataIndex: ["student", "user", "displayName"],
      key: "student",
    },
    {
      title: "Dernier statut",
      dataIndex: ["testimony_statuses", 0, "status", "name"],
      key: "latest_status",
    },
    {
      title: "Dernière mise à jour",
      dataIndex: ["testimony_statuses", 0, "date"],
      key: "last_updated",
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
          placeholder="Rechercher une description..."
          allowClear
          onSearch={handleSearch}
          style={{ width: 300 }}
        />,
      ]}
    >
      <Table {...tableProps} columns={columns} rowKey="id" />
    </List>
  );
}
