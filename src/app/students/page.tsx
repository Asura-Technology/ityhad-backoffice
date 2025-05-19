"use client";

import {
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, LogicalFilter } from "@refinedev/core";
import { Space, Table, Input, DatePicker } from "antd";
import React, { useState } from "react";
import { STUDENTS_QUERY, DELETE_STUDENT } from "@queries/students";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function StudentList() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = React.useState<
    [string | undefined, string | undefined]
  >([undefined, undefined]);
  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
    meta: {
      gqlQuery: STUDENTS_QUERY,
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
        value: dayjs(dateStrings[1]).endOf("day").toISOString(),
      } as LogicalFilter);
    }
    setFilters(filters, "replace");
  };

  return (
    <List headerButtons={[]}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} sorter />
        <Table.Column
          dataIndex={["user", "displayName"]}
          title={"Nom"}
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                placeholder="Rechercher Nom"
                allowClear
                onPressEnter={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  handleSearch(value, "displayName");
                }}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex={["user", "email"]}
          title={"Email"}
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                placeholder="Rechercher Email"
                allowClear
                onPressEnter={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  handleSearch(value, "email");
                }}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex={["school", "name"]}
          title={"École"}
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                placeholder="Rechercher Ecole"
                allowClear
                onPressEnter={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  handleSearch(value, "name");
                }}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
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
                meta={{
                  gqlMutation: DELETE_STUDENT,
                }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
