import React from "react";
import { Table, Icon, Button } from "antd";
import { connect } from "react-redux";
import { fetchLeaveLogs } from "../../../actions/leavelogsActions";
import LeaveLogsForm from "./LeaveLogsForm";
import LeaveLogDetails from "./LeaveLogDetails";
import RowActions from "../../RowActions/RowActions";
import { leaveLogColumn } from "../../Columns/Columns";

class LeaveLogs extends React.Component {
  state = {
    showModalForm: false,
    showModalInfo: false,
    showModalInfoId: null,
    isEdit: false,
    disableCreate: true,
    sortedInfo: null
  };
  constructor(props) {
    super(props);
    this.columns = [];
    this.columns = leaveLogColumn;
    if (this.columns.length < 5) {
      this.columns.push(
        RowActions({
          showModalInfo: this.showModalInfo,
          showModalForm: this.showModalForm
        })
      );
    }
  }

  componentDidMount() {
    this.props.fetchLeaveLogs();
    setTimeout(() => {
      this.setState({ disableCreate: false });
    }, 1000);
  }

  showModalForm = isEdit => {
    this.setState({ showModalForm: true, isEdit });
  };

  showModalInfo = e => {
    this.setState({ showModalInfo: true, showModalInfoId: e.id });
  };

  onClickCancelModal = () => {
    this.setState({
      showModalForm: false,
      showModalInfo: false,
      showModalInfoId: null
    });
  };

  render() {
    if (this.state.disableCreate) {
      return (
        <div style={{ width: "100%", height: "100%", margin: "auto" }}>
          <Icon
            style={{
              position: "absolute",
              top: "50%",
              left: "55%",
              fontSize: "3rem"
            }}
            width="1000px"
            type="loading"
          />
        </div>
      );
    }

    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    return (
      <div>
        <Button
          onClick={() => this.showModalForm(false)}
          type="primary"
          style={{
            zIndex: "10",
            position: "relative",
            top: "-1vh",
            float: "bottom"
          }}
        >
          New Log
        </Button>
        <Table
          size={"small"}
          pagination={{ position: "both" }}
          bordered
          columns={this.columns}
          dataSource={this.props.leaveLogs.leaveLogs}
        />
        <LeaveLogsForm
          visible={this.state.showModalForm}
          handleCancel={this.onClickCancelModal}
          isEdit={this.state.isEdit}
          onSubmit={this.onSubmit}
        />
        <LeaveLogDetails
          leaveId={this.state.showModalInfoId}
          visible={this.state.showModalInfo}
          handleCancel={this.onClickCancelModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    leaveLogs: state.leaveLogs,
    auth: state.auth,
    state: state
  };
};

export default connect(
  mapStateToProps,
  { fetchLeaveLogs }
)(LeaveLogs);
