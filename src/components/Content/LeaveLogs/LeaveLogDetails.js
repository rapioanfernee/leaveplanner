import React, { Component } from "react";

import { connect } from "react-redux";

import { Modal, Row, Col } from "antd";

import { fetchLeaveLog } from "../../../actions/leavelogsActions";

class LeaveLogDetails extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.leaveId !== prevProps.leaveId) {
      this.props.fetchLeaveLog(this.props.leaveId);
    }
  }

  renderLeaveDetails = () => {
    if (!this.props.selectedLeaveLog) {
      return <div>Loading...</div>;
    }

    return (
      <div width={"100%"}>
        <Row gutter={8} style={{ marginBottom: "1rem" }}>
          <Col span={6} style={{ fontWeight: "bold" }}>
            ID:
          </Col>
          <Col span={6}>{this.props.selectedLeaveLog.id}</Col>
        </Row>
        <Row gutter={8} style={{ marginBottom: "1rem" }}>
          <Col span={6} style={{ fontWeight: "bold" }}>
            Leave Type:
          </Col>
          <Col span={6}>{this.props.selectedLeaveLog.leaveType}</Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: "1rem" }}>
          <Col span={6} style={{ fontWeight: "bold" }}>
            Start Date:
          </Col>
          <Col span={6}>{this.props.selectedLeaveLog.startDate}</Col>
          <Col span={6} style={{ fontWeight: "bold" }}>
            End Date:
          </Col>
          <Col span={6}>{this.props.selectedLeaveLog.endDate}</Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: "1rem" }}>
          <Col span={6} style={{ fontWeight: "bold" }}>
            Date Submitted:
          </Col>
          <Col span={6}>{this.props.selectedLeaveLog.dateSubmitted}</Col>
        </Row>
        <Row gutter={16}>
          <Col span={6} style={{ fontWeight: "bold" }}>
            Remarks:
          </Col>
          <Col span={18}>{this.props.selectedLeaveLog.remarks}</Col>
        </Row>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Modal
          destroyOnClose={true}
          title="Leave Details"
          visible={this.props.visible}
          onCancel={this.props.handleCancel}
          centered
          footer={[null, null]}
          width={"50vw"}
        >
          {this.renderLeaveDetails()}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedLeaveLog: state.leaveLogs.selectedLeaveLog
  };
};

export default connect(
  mapStateToProps,
  { fetchLeaveLog }
)(LeaveLogDetails);
