import React, { useState } from "react";
import { Layout, Breadcrumb, Button } from "antd";
import Link from "next/link";
import { MainNav } from "./MainNav";
import { MenuUnfoldOutlined, MenuFoldOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Logo from '../../public/logo.svg'

require("./styles.less");

const { Header, Content, Footer, Sider } = Layout;

export const SiderLayout = ({ children, breadcrumbs, goBack }: { children: any, breadcrumbs: any, goBack?: any }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <div className="logo">
          <Logo />
        </div>
        <MainNav />
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {goBack ? (
            <Button type='link' style={{ color: 'black' }} onClick={goBack} icon={<ArrowLeftOutlined />}>Back</Button>
          ) : React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )
          }

        </Header>
        <Content>
          <div
            className="site-layout-background"
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>lfca.earth ©2022</Footer>
      </Layout>
    </Layout>
  );
};


