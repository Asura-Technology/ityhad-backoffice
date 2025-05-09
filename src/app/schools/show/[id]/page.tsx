"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";
import React from "react";
import { SCHOOLS_QUERY } from "@queries/schools";

const { Title } = Typography;

export default function SchoolShow() {
  const { queryResult } = useShow({
    meta: {
      fields: SCHOOLS_QUERY,
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />

      <Title level={5}>{"School Name"}</Title>
      <TextField value={record?.name} />

      <Title level={5}>{"Contact Name"}</Title>
      <TextField value={record?.user?.displayName} />

      <Title level={5}>{"Contact Email"}</Title>
      <TextField value={record?.user?.email} />
    </Show>
  );
}
