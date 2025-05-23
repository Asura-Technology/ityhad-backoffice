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
import { Space, Table, Input, DatePicker, Typography } from "antd";
import React, { useState } from "react";
import { SCHOOLS_QUERY, DELETE_SCHOOL } from "@queries/schools";
import dayjs from "dayjs";
import { Protected } from "@permissions/layout";
import { useAbility } from "@hooks/useAbility";

const { RangePicker } = DatePicker;
const { Text } = Typography;

export default function SchoolList() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = React.useState<
    [string | undefined, string | undefined]
  >([undefined, undefined]);
  const ability = useAbility();
  const isAdmin = ability.can("manage", "all");
  const { tableProps, setFilters } = useTable({
    syncWithLocation: true,
    meta: {
      gqlQuery: SCHOOLS_QUERY,
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
        field: "name",
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
    <Protected
      action="read"
      subject="school"
      fallback={
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Text type="danger">
            Vous n&apos;avez pas la permission d&apos;accéder à cette page.
          </Text>
        </div>
      }
    >
      <List headerButtons={[]}>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title={"ID"} sorter />
          <Table.Column
            dataIndex="name"
            title={"Nom de l'école"}
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
            dataIndex={["user", "displayName"]}
            title={"Nom du contact"}
            sorter
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input
                  placeholder="Rechercher Nom du Contact"
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
            title={"Email du contact"}
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
                {isAdmin && (
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                    title="Supprimer"
                    meta={{
                      gqlMutation: DELETE_SCHOOL,
                    }}
                  />
                )}
              </Space>
            )}
          />
        </Table>
      </List>
    </Protected>
  );
}
