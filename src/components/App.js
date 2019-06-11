import React, { Component } from "react";

import { Layout, Icon } from "antd";

import { BrowserRouter } from "react-router-dom";

import { connect } from "react-redux";

import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import Content from "./Content/Content";
import Auth from "./Auth/Auth";

import "./App.css";

import { checkAuth } from "../actions/authActions";

class App extends Component {
  component;
  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    if (this.props.auth.isSignedIn === null) {
      return (
        <BrowserRouter>
          <div>
            <Header style={{ visibility: "hidden" }} />
            <Layout>
              <div style={{ width: "100%", height: "100%", margin: "auto" }}>
                <Icon
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "3rem"
                  }}
                  width="1000px"
                  type="loading"
                />
              </div>
            </Layout>
          </div>
        </BrowserRouter>
      );
    } else if (this.props.auth.isSignedIn) {
      return (
        <BrowserRouter>
          <div>
            <Header style={{ visibility: "visible" }} />
            <Layout>
              <SideBar />
              <Content />
            </Layout>
          </div>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <div>
            <Header style={{ visibility: "hidden" }} />
            <Layout>
              <Auth />
            </Layout>
          </div>
        </BrowserRouter>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { checkAuth }
)(App);
