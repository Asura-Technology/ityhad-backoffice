"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import React from "react";
import { STUDENTS_QUERY } from "@queries/students";

export default function StudentEdit() {
  const { formProps, saveButtonProps } = useForm({
    meta: {
      fields: STUDENTS_QUERY,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Name"}
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
          label={"Email"}
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

        <Form.Item
          label={"School"}
          name={["school", "name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
}
