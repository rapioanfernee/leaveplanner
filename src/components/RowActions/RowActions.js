import React from "react";
import { Icon } from "antd";

const RowActions = props => {
  return {
    title: "Action",
    key: "action",
    render: e => {
      return (
        <div>
          <Icon
            onClick={() => {
              return props.showModalInfo(e);
            }}
            type="info"
            style={{ cursor: "pointer" }}
          />
          <Icon
            onClick={() => props.showModalForm(true)}
            type="edit"
            style={{ margin: "0px 2rem 0px 2rem", cursor: "pointer" }}
          />
          <Icon type="close" style={{ cursor: "pointer" }} />
        </div>
      );
    },
    width: 100
  };
};

export default RowActions;
