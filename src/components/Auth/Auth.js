import React, { Component } from "react";

import { connect } from "react-redux";

import LoginForm from "./AuthForm";

import { Switch, Route, withRouter } from "react-router-dom";

import { registerUser, signIn, checkAuth } from "../../actions/authActions";

class Login extends Component {
  state = {
    isSigningIn: false,
    isSigningOut: false
  };
  componentDidMount() {
    this.setState({ isSigningIn: false });
    this.props.history.push("/leaveplanner");
  }
  onSubmitLogin = async formValues => {
    await this.setState({ isSigningIn: true });
    setTimeout(() => {
      this.props.signIn(formValues);
    }, 1000);
  };

  onSubmitRegister = async formValues => {
    await this.setState({ isSigningIn: true });
    setTimeout(() => {
      this.props.registerUser(formValues);
    }, 1000);
  };

  validation = () => {
    const validateFirstName = formValues => {
      if (!formValues) {
        return "First name is required";
      }
      return undefined;
    };

    const validateLastName = formValues => {
      if (!formValues) {
        return "Last name is required";
      }
      return undefined;
    };

    const validateEmail = formValues => {
      if (!formValues) {
        return "Email is required";
      }
      return undefined;
    };

    const validatePassword = formValues => {
      if (!formValues) {
        return "Password is required";
      }
      return undefined;
    };

    return {
      validateFirstName,
      validateLastName,
      validateEmail,
      validatePassword
    };
  };

  render() {
    const {
      validateFirstName,
      validateLastName,
      validateEmail,
      validatePassword
    } = this.validation();
    const loginProps = {
      loading: this.state.isSigningIn,
      error: this.props.auth.error,
      onSubmit: this.onSubmitLogin,
      initialValues: [],
      type: "Sign In",
      fields: [
        {
          name: "email",
          label: "Email",
          validation: validateEmail
        },
        {
          name: "password",
          label: "Password",
          validation: validatePassword
        }
      ]
    };
    const registerProps = {
      loading: this.state.isSigningIn,
      checkAuth: this.props.checkAuth,
      error: this.props.auth.error,
      onSubmit: this.onSubmitRegister,
      initialValues: [],
      type: "Register",
      fields: [
        {
          name: "first_name",
          label: "First Name",
          validation: validateFirstName
        },
        {
          name: "last_name",
          label: "Last Name",
          validation: validateLastName
        },
        {
          name: "email",
          label: "Email",
          validation: validateEmail
        },
        {
          name: "password",
          label: "Password",
          validation: validatePassword
        }
      ]
    };

    return (
      <div style={{ height: "93vh" }}>
        <Switch>
          <Route
            path="/leaveplanner"
            exact
            render={e => {
              return <LoginForm {...e} {...loginProps} />;
            }}
          />
          <Route
            path="/leaveplanner/register"
            exact
            render={e => {
              return <LoginForm {...e} {...registerProps} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { registerUser, signIn, checkAuth }
  )(Login)
);
