"use client";

import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";
import React from "react";
import { DOCTORS_QUERY } from "@queries/doctors";

const { Title } = Typography;

export default function DoctorShow() {
  const { queryResult } = useShow({
    meta: {
      fields: DOCTORS_QUERY,
    },
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <TextField value={record?.id} />

      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.user?.displayName} />

      <Title level={5}>{"Email"}</Title>
      <TextField value={record?.user?.email} />

      <Title level={5}>{"Address"}</Title>
      <TextField value={record?.address?.address1} />
    </Show>
  );
}
