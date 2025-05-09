"use client";

import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Space, Table, Input, DatePicker } from "antd";
import React, { useState } from "react";
import { SCHOOLS_QUERY } from "@queries/schools";

export default function SchoolList() {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<string | undefined>(undefined);
  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
    meta: {
      fields: SCHOOLS_QUERY,
    },
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    const filters = [
      {
        field: "name",
        operator: "contains" as const,
        value,
      },
    ];
    if (date) {
      filters.push({
        field: "created_at",
        operator: "contains" as const,
        value: date,
      });
    }
    setFilters(filters, "replace");
  };

  const handleDateChange = (value: any, dateString: string | string[]) => {
    const dateVal = Array.isArray(dateString) ? dateString[0] : dateString;
    setDate(dateVal);
    const filters = [
      {
        field: "name",
        operator: "contains" as const,
        value: search,
      },
    ];
    if (dateVal) {
      filters.push({
        field: "created_at",
        operator: "contains" as const,
        value: dateVal,
      });
    }
    setFilters(filters, "replace");
  };

  return (
    <List
      headerButtons={[
        <Input.Search
          key="search"
          placeholder="Rechercher une école..."
          allowClear
          onSearch={handleSearch}
          style={{ width: 200, marginRight: 8 }}
        />,
        <DatePicker
          key="date"
          onChange={handleDateChange}
          style={{ marginRight: 8 }}
          placeholder="Date de création"
        />,
      ]}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Nom de l'école"} />
        <Table.Column
          dataIndex={["user", "displayName"]}
          title={"Nom du contact"}
        />
        <Table.Column
          dataIndex={["user", "email"]}
          title={"Email du contact"}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.id}
                title="Modifier"
              />
              <ShowButton
                hideText
                size="small"
                recordItemId={record.id}
                title="Afficher"
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                title="Supprimer"
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
