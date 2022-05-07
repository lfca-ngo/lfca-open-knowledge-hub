import React from "react";
import { Menu } from "antd";
import { useRouter } from "next/router";
import { useIsClient } from "../../hooks/app";
import {
  DesktopOutlined,
  HomeOutlined,
  BankOutlined,
} from "@ant-design/icons";
import {
  HOME
} from "../../utils/routes";

const { SubMenu } = Menu;

const NAV_ITEMS = [
  {
    key: HOME,
    title: "All Campaigns",
    icon: <HomeOutlined />,
    adminOnly: false,
  },
  {
    key: "all-admin",
    title: "Admin",
    icon: <DesktopOutlined />,
    adminOnly: true,
    subItems: [
      {
        key: '/admin',
        icon: <BankOutlined />,
        title: "Companies",
      },
    ],
  },
];

const MainNav = () => {
  const router = useRouter();
  const { isClient, key } = useIsClient();


  const handleSelect = (item) => {
    router.push(item.key);
  };

  if (!isClient || isFetching) return null;
  return (
    <Menu
      key={key}
      theme="dark"
      selectedKeys={[router.pathname]}
      defaultOpenKeys={["all-admin"]}
      mode="inline"
      onSelect={handleSelect}
    >
      {NAV_ITEMS.map((item) => {
        return item.subItems ? (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {item.subItems.map((subItem) => (
              <Menu.Item key={subItem.key} icon={subItem.icon}>
                {subItem.title}
              </Menu.Item>
            ))}
          </SubMenu>
        ) : (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.title}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default MainNav;
