import React, { Component } from "react";
import { DatePicker, Select, Input } from "antd";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { newLeaveLog } from "../../../actions/leavelogsActions";
import locale from "antd/lib/date-picker/locale/en_US";
import Modal from "../../Modal/Modal";
import { Leaves } from "../../../default";
import Firebase from "../../../firebase/Firebase";

class LeaveLogsForm extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  renderInput = ({ input, label, meta }) => {
    let renderField;

    if (input.name === "startDate" || input.name === "endDate") {
      renderField = <DatePicker locale={locale} {...input} />;
    } else if (input.name === "leaveType") {
      renderField = (
        <Select {...input} style={{ width: 180 }}>
          {Leaves.map(leave => {
            return (
              <Select.Option key={leave.value} value={leave.value}>
                {leave.value}
              </Select.Option>
            );
          })}
        </Select>
      );
    } else if (input.name === "remarks") {
      renderField = <Input.TextArea {...input} autosize />;
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
    let startDate = new Date(formValues.startDate);
    let endDate = new Date(formValues.endDate);
    let dateSubmitted = new Date();
    startDate = this.formatDate(startDate);
    endDate = this.formatDate(endDate);
    dateSubmitted = this.formatDate(dateSubmitted);

    this.props.newLeaveLog({
      ...formValues,
      startDate,
      endDate,
      dateSubmitted
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
          <form onSubmit={handleSubmit} className="ui form">
            <Field
              name="startDate"
              component={this.renderInput}
              label="Start date"
              validate={validateDates}
            />
            <Field
              name="endDate"
              component={this.renderInput}
              label="End date"
              validate={validateDates}
            />
            <Field
              name="leaveType"
              component={this.renderInput}
              label="Leave type"
              validate={validateLeaveType}
            />
            <Field
              name="remarks"
              component={this.renderInput}
              label="Remarks"
            />
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
      title: this.props.isEdit ? "Edit Leave Log" : "Create Leave Log",
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

const validateDates = formValues => {
  if (!formValues) {
    return "Dates are required";
  }
  return undefined;
};

const validateLeaveType = formValues => {
  if (!formValues) {
    return "Leave type is required";
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
  { newLeaveLog }
)(LeaveLogsForm);
