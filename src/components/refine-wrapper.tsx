"use client";

import React, { useEffect, useState } from "react";
import { Refine } from "@refinedev/core";
import { useGetIdentity } from "@refinedev/core";
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
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type UserRole = "admin" | "school" | "doctor" | "student";

interface User {
  name: string;
  email: string;
  roles: UserRole[];
  avatar: string;
}

// Define which resources are available for each role
const roleResources: Record<UserRole, string[]> = {
  admin: [
    "dashboard",
    "report",
    "testimony",
    "student",
    "doctor",
    "school",
    "settings",
  ],
  school: ["dashboard", "student", "report", "testimony", "settings"],
  doctor: ["dashboard", "student", "testimony", "settings"],
  student: ["dashboard", "testimony", "settings"],
};

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
    create: "/reports/create",
    edit: "/reports/edit/:id",
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
    create: "/testimonies/create",
    edit: "/testimonies/edit/:id",
    meta: {
      canDelete: true,
      icon: <MessageOutlined />,
      label: "Témoignages",
    },
  },
  {
    name: "student",
    list: "/students",
    create: "/students/create",
    edit: "/students/edit/:id",
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
    create: "/doctors/create",
    edit: "/doctors/edit/:id",
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
    create: "/schools/create",
    edit: "/schools/edit/:id",
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
  const { data: user, isLoading } = useGetIdentity<User>();
  const [mounted, setMounted] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>("student");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateRole = () => {
      if (user?.roles?.[0]) {
        setCurrentRole(user.roles[0]);
      } else {
        const auth = Cookies.get("auth");
        if (auth) {
          try {
            const userData = JSON.parse(auth) as User;
            setCurrentRole(userData.roles[0]);
          } catch (error) {
            setCurrentRole("student");
          }
        }
      }
    };

    updateRole();
  }, [user, mounted]);

  // Filter resources based on user role
  const allowedResources = allResources.filter((resource) => {
    const roleAccess = roleResources[currentRole] || [];
    return roleAccess.includes(resource.name);
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
