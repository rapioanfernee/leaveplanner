import React from "react";
import { Table, Icon, Button } from "antd";
import { fetchUsers } from "../../../actions/userActions";
import { connect } from "react-redux";
import { peopleColumn } from "../../Columns/Columns";
import RowActions from "../../RowActions/RowActions";
import PeopleForm from "./PeopleForm";

class People extends React.Component {
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
    this.columns = peopleColumn;
    if (this.columns.length < 7) {
      this.columns.push(
        RowActions({
          showModalInfo: this.showModalInfo,
          showModalForm: this.showModalForm
        })
      );
    }
  }

  componentDidMount() {
    this.props.fetchUsers();
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
            top: "5vh",
            float: "bottom"
          }}
        >
          New User
        </Button>
        <Table
          size={"small"}
          pagination={{ position: "both" }}
          bordered
          columns={this.columns}
          dataSource={this.props.users.users}
        />
        <PeopleForm
          visible={this.state.showModalForm}
          handleCancel={this.onClickCancelModal}
          isEdit={this.state.isEdit}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { fetchUsers }
)(People);
