"use client";

import { ColorModeContext } from "@contexts/color-mode";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity, useLogout } from "@refinedev/core";
import {
  Avatar,
  Layout as AntdLayout,
  Space,
  Switch,
  theme,
  Typography,
  Dropdown,
  Menu,
} from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";

const { Text } = Typography;
const { useToken } = theme;

export type IUser = {
  id: string;
  displayName: string;
  avatarUrl: string;
  email: string;
  roles: string[];
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { data: userData } = useGetIdentity<{ user: IUser }>();
  const user = userData?.user;
  const { mode, setMode } = useContext(ColorModeContext);
  const { mutate: logout } = useLogout();
  const router = useRouter();

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const menuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Mon profil",
      onClick: () => router.push("/settings"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => logout(),
    },
  ];

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        {(user?.displayName || user?.avatarUrl) && (
          <Space style={{ marginLeft: "8px" }} size="middle">
            {user?.displayName && <Text strong>{user.displayName}</Text>}
            <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
              <Avatar
                src={user?.avatarUrl}
                alt={user?.displayName}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </Space>
        )}
      </Space>
    </AntdLayout.Header>
  );
};
