"use client";

import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, LogicalFilter } from "@refinedev/core";
import { Space, Table, Input, DatePicker } from "antd";
import React, { useState } from "react";
import { DOCTORS_QUERY } from "@queries/doctors";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function DoctorList() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = React.useState<[string | undefined, string | undefined]>([undefined, undefined]);
  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
    meta: {
      fields: DOCTORS_QUERY,
    },
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    const filters: LogicalFilter[] = [
      {
        field: "user.displayName",
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
        field: "user.displayName",
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

  return (
    <List
      headerButtons={[
        <Input.Search
          key="search"
          placeholder="Rechercher un nom..."
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
      <Table {...tableProps} rowKey="id">
        <Table.Column 
          dataIndex="id" 
          title={"ID"} 
          sorter
        />
        <Table.Column 
          dataIndex={["user", "displayName"]} 
          title={"Nom"} 
          sorter
        />
        <Table.Column 
          dataIndex={["user", "email"]} 
          title={"Email"} 
          sorter
        />
        <Table.Column 
          dataIndex={["address", "address1"]} 
          title={"Adresse"} 
          sorter
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
