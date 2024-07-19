import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class PersonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePerson: this.props.activePerson,
    };
  }

  handleChange = (e) => {
    let {name, value } = e.target;

    const activePerson = { ...this.state.activePerson, [name]: value };

    this.setState({ activePerson });
  }

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Person Details</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="person-name">Name</Label>
              <Input
                type="text"
                id="person-name"
                name="name"
                value={this.state.activePerson.name}
                onChange={this.handleChange}
                placeholder="Enter Person's Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="person-role">Role</Label>
              <Input
                type="text"
                id="person-role"
                name="role"
                value={this.state.activePerson.role}
                onChange={this.handleChange}
                placeholder="Enter Person's Role"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activePerson)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}