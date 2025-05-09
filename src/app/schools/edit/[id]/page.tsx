"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import React from "react";
import { SCHOOLS_QUERY } from "@queries/schools";

export default function SchoolEdit() {
  const { formProps, saveButtonProps } = useForm({
    meta: {
      fields: SCHOOLS_QUERY,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"School Name"}
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Contact Name"}
          name={["user", "displayName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Contact Email"}
          name={["user", "email"]}
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
}
