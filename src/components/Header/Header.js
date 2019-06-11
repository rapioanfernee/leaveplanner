import React, { useState } from "react";
import { Layout, Menu, Icon, Dropdown } from "antd";

import { withRouter } from "react-router-dom";

import GoogleAuth from "../Auth/GoogleAuthFirebase";

const Header = props => {
  const { Header } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const { SubMenu } = Menu;

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const menu = (
    <Menu>
      <Menu.Item>1st menu item</Menu.Item>
      <Menu.Item>2nd menu item</Menu.Item>
      <SubMenu title="sub menu">
        <Menu.Item>3rd menu item</Menu.Item>
        <Menu.Item>4th menu item</Menu.Item>
      </SubMenu>
      <SubMenu title="disabled sub menu" disabled>
        <Menu.Item>5d menu item</Menu.Item>
        <Menu.Item>6th menu item</Menu.Item>
      </SubMenu>
    </Menu>
  );
  const { visibility } = props.style;
  return (
    <Layout>
      <Header className="header" style={{ height: "7vh" }}>
        <div className="logo" />
        <Dropdown overlay={menu}>
          <GoogleAuth
            style={{
              float: "right",
              marginTop: "1rem",
              width: "185px",
              visibility
            }}
          />
        </Dropdown>
      </Header>
    </Layout>
  );
};

export default withRouter(Header);
