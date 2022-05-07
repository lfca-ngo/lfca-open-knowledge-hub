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

const MainNav = () => {
  const router = useRouter();
  const isClient = useIsClient();

  const handleSelect = (item) => {
    router.push(item.key);
  };

  if (!isClient) return null;
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

export default MainNav;
