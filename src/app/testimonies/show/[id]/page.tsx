"use client";

import { DateField, Show, TextField, BooleanField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag } from "antd";
import React from "react";
import { REPORTS_QUERY } from "@queries/reports";

const { Title } = Typography;

export default function ReportShow() {
  const { queryResult } = useShow({
    meta: {
      fields: REPORTS_QUERY,
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;
  const latestStatus = record?.report_statuses?.[0];

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />

      <Title level={5}>{"Description"}</Title>
      <TextField value={record?.description} />

      <Title level={5}>{"Recommendation"}</Title>
      <TextField value={record?.recommendation} />

      <Title level={5}>{"Dangerous"}</Title>
      <BooleanField value={record?.is_dangerous} />

      <Title level={5}>{"Private"}</Title>
      <BooleanField value={record?.is_private} />

      <Title level={5}>{"Latest Status"}</Title>
      <TextField value={latestStatus?.status?.name} />

      <Title level={5}>{"Status Code"}</Title>
      <TextField value={latestStatus?.status?.code} />

      <Title level={5}>{"Last Updated"}</Title>
      <DateField value={latestStatus?.date} />
    </Show>
  );
}
