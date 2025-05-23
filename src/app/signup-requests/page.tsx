"use client";

import { List, useTable } from "@refinedev/antd";
import { Table, Tag } from "antd";
import { useState } from "react";
import { useAbility } from "@hooks/useAbility";
import { Protected } from "@permissions/layout";
import { SIGNUP_REQUESTS_QUERY } from "@queries/signup-requests";
import type { BaseRecord } from "@refinedev/core";
import type { ColumnsType } from "antd/es/table";
import type { CrudFilters } from "@refinedev/core";

interface SignupRequest extends BaseRecord {
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  receive_resources: boolean;
  created_at: string;
}

export default function SignupRequestsPage() {
  const [selectedRows, setSelectedRows] = useState<SignupRequest[]>([]);
  const ability = useAbility();
  const isAdmin = ability.can("manage", "all");

  const { tableProps } = useTable<SignupRequest>({
    resource: "signup_request",
    meta: {
      gqlQuery: SIGNUP_REQUESTS_QUERY,
    },
    onSearch: (values: unknown): CrudFilters => {
      console.log('Search values:', values);
      return [];
    },
  });

  const columns: ColumnsType<SignupRequest> = [
    {
      title: "Name",
      key: "name",
      render: (_: any, record: SignupRequest) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_: any, record: SignupRequest) => (
        <Tag color={record.role === "student" ? "blue" : "green"}>{record.role}</Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: SignupRequest) => (
        <Tag color={record.receive_resources ? "green" : "gold"}>
          {record.receive_resources ? "Approved" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (_: any, record: SignupRequest) => new Date(record.created_at).toLocaleDateString(),
    }
  ];

  return (
    <Protected
      action="manage"
      subject="all"
      fallback={
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>You don't have permission to access this page.</p>
        </div>
      }
    >
      <List>
        <Table
          {...tableProps}
          columns={columns}
          rowKey="id"
          dataSource={tableProps.dataSource as SignupRequest[]}
          rowSelection={{
            type: "checkbox",
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows as SignupRequest[]);
            },
            // getCheckboxProps: (record: BaseRecord) => ({
            //   disabled: (record as SignupRequest).receive_resources,
            // }),
          }}
        />
      </List>
    </Protected>
  );
} 