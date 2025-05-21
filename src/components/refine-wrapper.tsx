"use client";

import React, { useEffect, useState } from "react";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { useNotificationProvider } from "@refinedev/antd";
import { RefineKbar } from "@refinedev/kbar";
import {
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
  BankOutlined,
  DashboardOutlined,
  SettingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { dataProvider } from "@providers/data-provider";
import { authProviderClient } from "@providers/auth-provider/auth-provider.client";
import { AppIcon } from "@components/app-icon";
import { useAbility } from "@hooks/useAbility";

// All available resources
const allResources = [
  {
    name: "dashboard",
    list: "/dashboard",
    meta: {
      label: "Tableau de bord",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "report",
    list: "/reports",
    show: "/reports/show/:id",
    meta: {
      canDelete: true,
      icon: <FileTextOutlined />,
      label: "Signalements",
    },
  },
  {
    name: "testimony",
    list: "/testimonies",
    show: "/testimonies/show/:id",
    meta: {
      canDelete: true,
      icon: <MessageOutlined />,
      label: "Témoignages",
    },
  },
  {
    name: "student",
    list: "/students",
    show: "/students/show/:id",
    meta: {
      canDelete: true,
      icon: <TeamOutlined />,
      label: "Utilisateurs / Élèves",
    },
  },
  {
    name: "doctor",
    list: "/doctors",
    show: "/doctors/show/:id",
    meta: {
      canDelete: true,
      icon: <UserOutlined />,
      label: "Professionnels Santé",
    },
  },
  {
    name: "school",
    list: "/schools",
    show: "/schools/show/:id",
    meta: {
      icon: <BankOutlined />,
      label: "Établissements",
    },
  },
  {
    name: "settings",
    list: "/settings",
    meta: {
      label: "Paramètres",
      icon: <SettingOutlined />,
    },
  },
];

export const RefineWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);
  const ability = useAbility();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter resources based on user abilities
  const allowedResources = allResources.filter((resource) => {
    // Dashboard and settings are always accessible
    if (resource.name === "dashboard" || resource.name === "settings") {
      return true;
    }
    // Check if user can manage all or read the specific resource
    return (
      ability.can("manage", "all") || ability.can("read", resource.name as any)
    );
  });

  if (!mounted) {
    return null;
  }

  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      notificationProvider={useNotificationProvider}
      authProvider={authProviderClient}
      resources={allowedResources}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        useNewQueryKeys: true,
        projectId: "GCdYfy-0LPKQV-MiBaXa",
        title: { text: "iTyhad", icon: <AppIcon /> },
      }}
    >
      {children}
      <RefineKbar />
    </Refine>
  );
};
