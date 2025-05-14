"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Switch, Select } from "antd";
import React from "react";
import { REPORTS_QUERY } from "@queries/reports";

export default function ReportCreate() {
  const { formProps, saveButtonProps } = useForm({
    meta: {
      fields: REPORTS_QUERY,
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Description"}
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label={"Recommendation"}
          name="recommendation"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label={"Dangerous"}
          name="is_dangerous"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item label={"Private"} name="is_private" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          label={"Status"}
          name={["report_statuses", 0, "status", "code"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "PENDING", label: "Pending" },
              { value: "IN_PROGRESS", label: "In Progress" },
              { value: "COMPLETED", label: "Completed" },
              { value: "REJECTED", label: "Rejected" },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
}
