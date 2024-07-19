import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

export default class PersonTasksModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.person,
      taskList: this.props.taskList,
    };
  }

  /*renderOptions = () => {
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
  }*/
  
  renderTaskList = (tasks) => {
    if (this.state.taskList.length === 0){
      return (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {(!!this.state.person.name) ? `${this.state.person.name} has no tasks.` : "There are no unassigned tasks."}
        </li>
      )
    }
    
    return tasks.map((task) => (
    <li
        key={task.id}
        className="list-group-item d-flex justify-content-between align-items-center"
    >
        <span
        className={`todo-title mr-2 ${
            task.completed ? "completed-task" : ""
        }`}
        title={task.description}
        >
        {task.title}
        </span>
    </li>
    ));
  }

  render() {
    const { toggle } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>{(!!this.state.person.name) ? `Tasks for ${this.state.person.name}` : "Unassigned Tasks"}</ModalHeader>
        <ModalBody>
          <ul className="list-group list-group-flush border-top-0">  
            {this.renderTaskList(this.state.taskList)}
          </ul>
        </ModalBody>
      </Modal>
    );
  }
}