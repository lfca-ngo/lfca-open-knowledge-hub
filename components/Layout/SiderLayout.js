import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";
import Link from "next/link";
import MainNav from "./MainNav";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Image from "next/image";

require("./styles.less");

const { Header, Content, Footer, Sider } = Layout;

const SiderLayout = ({ children, breadcrumbs }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <div className="logo">
          Logo
        </div>
        <MainNav />
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content>
          {/* Later we can make these dynamic based on the route */}
          <Breadcrumb>
            {breadcrumbs?.map((breadcrumb, i) => (
              <Breadcrumb.Item key={`bread-${i}`}>
                {breadcrumb.link ? (
                  <Link href={breadcrumb.link}>{breadcrumb.text}</Link>
                ) : (
                  breadcrumb.text
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Prenzlmedia ©2022</Footer>
      </Layout>
    </Layout>
  );
};

export default SiderLayout;
