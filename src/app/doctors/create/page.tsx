"use client";

import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import React from "react";
import { DOCTORS_QUERY } from "@queries/doctors";

export default function DoctorCreate() {
  const { formProps, saveButtonProps } = useForm({
    meta: {
      fields: DOCTORS_QUERY,
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
          label={"Address"}
          name={["address", "address1"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
}
