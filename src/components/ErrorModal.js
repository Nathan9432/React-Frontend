import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

export default class ErrorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
    };
  }

  render() {
    const { toggle } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Unfilled Information</ModalHeader>
        <div style={{ marginTop: 20, width: 340, marginBottom: 15 }}>
          <ModalBody>
            <span>
              {this.state.message}
            </span>
          </ModalBody>
        </div>
      </Modal>
    );
  }
}