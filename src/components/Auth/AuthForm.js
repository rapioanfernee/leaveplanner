import React from "react";

import { Input, Tooltip, Icon } from "antd";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuthFirebase";

const renderInput = ({ input, label, meta }) => {
  let renderField;

  if (input.name === "email") {
    renderField = (
      <Input
        placeholder="Email"
        suffix={
          <Tooltip title="Extra information">
            <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
        {...input}
      />
    );
  } else if (input.name === "password") {
    renderField = <Input.Password {...input} placeholder="Password" />;
  } else if (input.name === "first_name") {
    renderField = (
      <Input
        placeholder="First Name"
        suffix={
          <Tooltip title="Extra information">
            <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
        {...input}
      />
    );
  } else if (input.name === "last_name") {
    renderField = (
      <Input
        placeholder="Last Name"
        suffix={
          <Tooltip title="Extra information">
            <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
        {...input}
      />
    );
  }

  return (
    <div className="field">
      <label style={{ color: "white" }}>{label}</label>
      {renderField}
      <div style={{ color: "red" }}>
        {meta.touched && meta.error ? meta.error : ""}
      </div>
    </div>
  );
};

const renderAdditionalButtons = (checkAuth, type, history) => {
  if (type !== "Register") {
    return (
      <div>
        <Link to="/leaveplanner/register">
          <button
            style={{
              marginTop: "1rem",
              width: "100%",
              backgroundColor: "green"
            }}
            className="ui button primary"
          >
            Register
          </button>
        </Link>
        <GoogleAuth style={{ marginTop: "1rem", width: "100%" }} />
      </div>
    );
  } else {
    return (
      <div>
        <button
          style={{
            marginTop: "1rem",
            width: "100%",
            backgroundColor: "green"
          }}
          className="ui button primary"
          onClick={() => {
            checkAuth();
            history.push("/leaveplanner");
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
};

const renderErrors = error => {
  if (error) {
    return <div style={{ color: "red" }}>{error.message}</div>;
  }
};

const renderSigningInOut = (loading, type) => {
  if (loading) {
    return <Icon type="loading" />;
  } else {
    return <span>{type}</span>;
  }
};

const renderForm = props => {
  const { fields, error } = props;

  return (
    <div>
      {renderErrors(error)}
      <Form
        onSubmit={props.onSubmit}
        initialValues={props.initialValues}
        render={({ handleSubmit, invalid, reset }) => (
          <form onSubmit={handleSubmit} className="ui form">
            {fields.map(field => {
              return (
                <Field
                  name={field.name}
                  component={renderInput}
                  label={field.label}
                  validate={field.validation}
                />
              );
            })}
            <button
              style={{ marginTop: "1rem", width: "100%" }}
              className="ui button primary"
              type="submit"
            >
              {renderSigningInOut(props.loading, props.type)}
            </button>
          </form>
        )}
      />

      {renderAdditionalButtons(props.checkAuth, props.type, props.history)}
    </div>
  );
};

const AuthForm = props => {
  return (
    <div
      style={{
        width: "35rem",
        backgroundColor: "rgb(0,21,41, 0.85)",
        padding: "4rem",
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-70%)",
        borderRadius: "0.9rem",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
      }}
    >
      {renderForm(props)}
    </div>
  );
};

export default AuthForm;
