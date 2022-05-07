import React from "react";
import { Layout, Row, Col } from "antd";
import Image from "next/image";
require("./styles.less");

const { Content, Footer } = Layout;

const OneColLayout = ({ children }) => {
  return (
    <Layout className="background" style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <Content>
          <Row justify="center">
            <Col xs={24} md={6}>
              <div className="one-col-layout-wrapper">
                <div className="logo">
                  Logo
                </div>
                {children}
              </div>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>lfca.earth ©2022</Footer>
      </Layout>
    </Layout>
  );
};

export default OneColLayout;
