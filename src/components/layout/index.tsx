"use client";

import React from "react";
import { ThemedLayoutV2, ThemedSiderV2 } from "@refinedev/antd";
import { Header } from "@components/header";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ThemedLayoutV2 Header={Header} Sider={() => <ThemedSiderV2 fixed />}>{children}</ThemedLayoutV2>;
};
