"use client";

import {
  DateField,
  DeleteButton,
  FilterDropdown,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Space, Table, Tag, Input, DatePicker, Button } from "antd";
import React, { useState } from "react";
import { REPORTS_QUERY, DELETE_REPORT } from "@queries/reports";
import dayjs from "dayjs";
import { CrudFilter, LogicalFilter } from "@refinedev/core";

const { RangePicker } = DatePicker;

export default function ReportList() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = React.useState<
    [string | undefined, string | undefined]
  >([undefined, undefined]);
  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
    meta: {
      gqlQuery: REPORTS_QUERY,
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

  return (
    <List headerButtons={[]}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} sorter />
        <Table.Column
          dataIndex="description"
          title={"Description"}
          sorter
          render={(value: string) =>
            value?.slice(0, 100) + (value?.length > 100 ? "..." : "")
          }
          filterDropdown={(props) => (
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
          )}
        />
        <Table.Column
          dataIndex="recommendation"
          title={"Recommendation"}
          sorter
          render={(value: string) =>
            value?.slice(0, 100) + (value?.length > 100 ? "..." : "")
          }
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input
                placeholder="Rechercher Recommandation"
                allowClear
                onPressEnter={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  handleSearch(value, "recommendation");
                }}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="is_dangerous"
          title={"Dangerous"}
          sorter
          render={(value: boolean) => (
            <Tag color={value ? "red" : "green"}>{value ? "Yes" : "No"}</Tag>
          )}
        />
        <Table.Column
          dataIndex="is_private"
          title={"Private"}
          sorter
          render={(value: boolean) => (
            <Tag color={value ? "blue" : "default"}>{value ? "Yes" : "No"}</Tag>
          )}
        />
        <Table.Column
          dataIndex={["report_statuses", 0, "status", "name"]}
          title={"Latest Status"}
          sorter
        />
        <Table.Column
          dataIndex={["report_statuses", 0, "status", "name"]}
          title={"Last Updated"}
          sorter
          render={(value: string) => <DateField value={value} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                meta={{
                  gqlMutation: DELETE_REPORT,
                }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
