import React from "react";
import { Menu } from "antd";
import { useRouter } from "next/router";
import { useIsClient } from "../../hooks/app";
import {
  HomeOutlined,
} from "@ant-design/icons";
import {
  HOME
} from "../../utils/routes";

const NAV_ITEMS = [
  {
    key: HOME,
    label: "All Campaigns",
    icon: <HomeOutlined />,
  },
];

export const MainNav = () => {
  const router = useRouter();

  const handleSelect = (item: any) => {
    router.push(item.key);
  };

  return (
    <Menu
      theme="dark"
      selectedKeys={[router.pathname]}
      mode="inline"
      onSelect={handleSelect}
      items={NAV_ITEMS}
    />
  );
};

