import React from "react";
import { Modal } from "antd";

const ModalForm = props => {
  return (
    <div>
      <Modal {...props}>{props.renderForm()}</Modal>
    </div>
  );
};

export default ModalForm;
