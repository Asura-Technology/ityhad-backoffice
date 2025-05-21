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
import { Space, Table, Tag, Input, DatePicker, Button, Typography } from "antd";
import React, { useState } from "react";
import { REPORTS_QUERY, DELETE_REPORT } from "@queries/reports";
import dayjs from "dayjs";
import { CrudFilter, LogicalFilter } from "@refinedev/core";
import { Protected } from "@permissions/layout";

const { RangePicker } = DatePicker;
const { Text } = Typography;

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
    <Protected
      action="read"
      subject="report"
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
            title={"Recommandation"}
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
            title={"Dangereux"}
            sorter
            render={(value: boolean) => (
              <Tag color={value ? "red" : "green"}>{value ? "Oui" : "Non"}</Tag>
            )}
          />
          <Table.Column
            dataIndex="is_private"
            title={"Privé"}
            sorter
            render={(value: boolean) => (
              <Tag color={value ? "blue" : "default"}>
                {value ? "Oui" : "Non"}
              </Tag>
            )}
          />
          <Table.Column
            dataIndex="report_statuses"
            title={"Statut"}
            sorter={(a, b) => {
              const aStatuses = a.report_statuses || [];
              const bStatuses = b.report_statuses || [];
              const aLatest = [...aStatuses].sort(
                (x, y) =>
                  new Date(y.date).getTime() - new Date(x.date).getTime()
              )[0];
              const bLatest = [...bStatuses].sort(
                (x, y) =>
                  new Date(y.date).getTime() - new Date(x.date).getTime()
              )[0];
              return (aLatest?.status?.name || "").localeCompare(
                bLatest?.status?.name || ""
              );
            }}
            render={(statuses: any[]) => {
              if (!statuses || statuses.length === 0) return "N/A";
              const sortedStatuses = [...statuses].sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              );
              return sortedStatuses[0]?.status?.name || "N/A";
            }}
          />
          <Table.Column
            dataIndex="report_statuses"
            title={"Date du statut"}
            sorter
            render={(statuses: any[]) => {
              if (!statuses || statuses.length === 0) return "N/A";
              const sortedStatuses = [...statuses].sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              );
              return (
                <DateField
                  value={sortedStatuses[0]?.date}
                  format="DD/MM/YYYY HH:mm"
                  locales="fr-FR"
                />
              );
            }}
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
                    gqlMutation: DELETE_REPORT,
                  }}
                />
              </Space>
            )}
          />
        </Table>
      </List>
    </Protected>
  );
}
