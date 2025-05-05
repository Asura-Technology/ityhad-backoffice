"use client";

import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import React from "react";
import { CATEGORIES_QUERY } from "@queries/categories";

export default function CategoryEdit() {
  const { formProps, saveButtonProps } = useForm({
    meta: {
      fields: CATEGORIES_QUERY,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Title"}
          name={["title"]}
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
