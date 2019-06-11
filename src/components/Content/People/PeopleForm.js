import React, { Component } from "react";
import { DatePicker, Select, Input } from "antd";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { createUser } from "../../../actions/userActions";
import locale from "antd/lib/date-picker/locale/en_US";
import Modal from "../../Modal/Modal";
import { Genders } from "../../../default";

class LeaveLogsForm extends Component {
  componentDidMount() {}

  renderInput = ({ input, label, meta }) => {
    let renderField;

    if (input.name === "birthday") {
      renderField = <DatePicker locale={locale} {...input} />;
    } else if (
      input.name === "firstName" ||
      input.name === "lastName" ||
      input.name === "email" ||
      input.name === "jobPosition"
    ) {
      renderField = <Input {...input} />;
    } else if (input.name === "gender") {
      renderField = (
        <Select {...input} style={{ width: 180 }}>
          {Genders.map(gender => {
            return (
              <Select.Option key={gender.value} value={gender.value}>
                {gender.value}
              </Select.Option>
            );
          })}
        </Select>
      );
    }

    return (
      <div className="field">
        <label>{label}</label>
        {renderField}
        <div style={{ color: "red" }}>
          {meta.touched && meta.error ? meta.error : ""}
        </div>
      </div>
    );
  };

  onSubmit = formValues => {
    let birthday = new Date(formValues.birthday);
    let dateSubmitteded = new Date();
    birthday = this.formatDate(birthday);
    dateSubmitteded = this.formatDate(dateSubmitteded);
    this.props.newUser({
      ...formValues,
      birthday,
      dateSubmitteded
    });
    this.props.handleCancel();
  };

  formatDate = date => {
    let dd = date.getDate();
    let mm = date.getMonth();
    let yyyy = date.getFullYear();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return months[mm] + " " + dd + ", " + yyyy;
  };

  renderForm = () => {
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={this.props.initialValues}
        render={({ handleSubmit, invalid, reset }) => (
          <form
            onSubmit={() => {
              handleSubmit();
              reset();
            }}
            className="ui form"
          >
            <Field
              name="firstName"
              component={this.renderInput}
              label="First Name"
              validate={validateFirstName}
            />
            <Field
              name="lastName"
              component={this.renderInput}
              label="Last Name"
              validate={validateLastName}
            />
            <Field
              name="email"
              component={this.renderInput}
              label="Email"
              validate={validateEmail}
            />
            <Field
              name="jobPosition"
              component={this.renderInput}
              label="Job Position"
              validate={validateJobPosition}
            />
            <Field
              name="birthday"
              component={this.renderInput}
              label="Birthday"
              validate={validateGender}
            />
            <Field name="gender" component={this.renderInput} label="Gender" />
            <button
              style={{ marginTop: "1rem" }}
              className="ui button primary"
              type="submit"
            >
              Submit
            </button>
          </form>
        )}
      />
    );
  };

  render() {
    const props = {
      destroyOnClose: true,
      title: this.props.isEdit ? "Edit User" : "Create User",
      visible: this.props.visible,
      onCancel: this.props.handleCancel,
      centered: true,
      footer: [null, null],
      renderForm: this.renderForm
    };

    return (
      <div>
        <Modal {...props} />
      </div>
    );
  }
}

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

const validateJobPosition = formValues => {
  if (!formValues) {
    return "Job Position is required";
  }
  return undefined;
};

const validateBirthday = formValues => {
  if (!formValues) {
    return "Birthday is required";
  }
  return undefined;
};

const validateGender = formValues => {
  if (!formValues) {
    return "Gender is required";
  }
  return undefined;
};

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default connect(
  mapStateToProps,
  { createUser }
)(LeaveLogsForm);
