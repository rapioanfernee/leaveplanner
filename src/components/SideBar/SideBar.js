import React from "react";

import { Layout, Menu, Icon } from "antd";

import { Link } from "react-router-dom";

const SideBar = () => {
  const { Sider } = Layout;
  return (
    <Sider
      breakpoint="lg"
      width={200}
      collapsedWidth="0"
      style={{ background: "#fff", height: "93vh", zIndex: "10" }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {/* <Menu.Item key="sub1">
          <Link to={{ pathname: "/calendar" }}>
            <span>
              <Icon type="calendar" />
              Calendar
            </span>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="sub2">
          <Link to={{ pathname: "/leaveplanner/leavelogs" }}>
            <span>
              <Icon type="idcard" />
              Leave Logs
            </span>
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="sub3">
          <Link to={{ pathname: "/statistics" }}>
            <span>
              <Icon type="area-chart" />
              Statistics
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="sub4">
          <Link to={{ pathname: "/people" }}>
            <span>
              <Icon type="user" />
              People
            </span>
          </Link>
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default SideBar;
