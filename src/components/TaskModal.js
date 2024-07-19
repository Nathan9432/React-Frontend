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

export default class TaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTask: this.props.activeTask,
      peopleList: this.props.peopleList,
    };
  }

  handleChange = (e) => {
    let {name, value } = e.target;

    if (e.target.type === "checkbox"){
      value = e.target.checked;
    }

    const activeTask = { ...this.state.activeTask, [name]: value };

    this.setState({ activeTask });
  }

  renderOptions = () => {
    const tempList = [...this.state.peopleList]; // Keeps null from leaking out
    tempList.unshift({
      id: null,
      name: "---",
      role: null,
    });
    return tempList.map((person) => (
      <option key={person.id ?? ""} value={person.id ?? ""}>
        {person.name} {(person.role && ` (${person.role})`)}
      </option>
    ));
  }

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>To-Do Task</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="task-title">Title</Label>
              <Input
                type="text"
                id="task-title"
                name="title"
                value={this.state.activeTask.title}
                onChange={this.handleChange}
                placeholder="Enter Task Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="task-description">Description</Label>
              <Input
                type="text"
                id="task-description"
                name="description"
                value={this.state.activeTask.description}
                onChange={this.handleChange}
                placeholder="Enter Task Description"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeTask.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="task-assignedTo">Assigned To</Label>
              <Input
                type="select"
                id="task=assignedTo"
                name="assignedTo"
                value={this.state.activeTask.assignedTo}
                onChange={this.handleChange}
              >
                {this.renderOptions()}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeTask)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}