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
import { REPORTS_QUERY } from "@queries/reports";

export default function ReportList() {
  const [search, setSearch] = useState("");
  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
    meta: {
      fields: REPORTS_QUERY,
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
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column
          dataIndex="description"
          title={"Description"}
          render={(value: string) =>
            value?.slice(0, 100) + (value?.length > 100 ? "..." : "")
          }
        />
        <Table.Column
          dataIndex="recommendation"
          title={"Recommendation"}
          render={(value: string) =>
            value?.slice(0, 100) + (value?.length > 100 ? "..." : "")
          }
        />
        <Table.Column
          dataIndex="is_dangerous"
          title={"Dangerous"}
          render={(value: boolean) => (
            <Tag color={value ? "red" : "green"}>{value ? "Yes" : "No"}</Tag>
          )}
        />
        <Table.Column
          dataIndex="is_private"
          title={"Private"}
          render={(value: boolean) => (
            <Tag color={value ? "blue" : "default"}>{value ? "Yes" : "No"}</Tag>
          )}
        />
        <Table.Column
          dataIndex={["report_statuses", 0, "status", "name"]}
          title={"Latest Status"}
        />
        <Table.Column
          dataIndex={["report_statuses", 0, "date"]}
          title={"Last Updated"}
          render={(value: string) => <DateField value={value} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
