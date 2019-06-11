import React from "react";
import { Layout } from "antd";

import { Route, Switch } from "react-router-dom";

import People from "./People/People";
import LeaveLogs from "./LeaveLogs/LeaveLogs";
import Statistics from "./Statistics/Statistics";
import Calendar from "./Calendar/Calendar";

const Content = () => {
  const { Content } = Layout;
  return (
    <Layout style={{ padding: "16px 24px 24px", zIndex: "1" }}>
      <Content
        style={{
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280,
          maxHeight: "100vh"
        }}
      >
        <Switch>
          <Route path="/leaveplanner/calendar" exact component={Calendar} />
          <Route path="/leaveplanner/leavelogs" exact component={LeaveLogs} />
          <Route path="/leaveplanner/statistics" exact component={Statistics} />
          <Route path="/leaveplanner/people" exact component={People} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default Content;
