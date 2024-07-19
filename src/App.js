import React, { Component } from "react";
import PersonModal from './components/PersonModal.js';
import TaskModal from './components/TaskModal';
import axios from "axios";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewPeople: true,
      viewCompleted: false,
      taskList: [],
      peopleList: [],
      personModal: false,
      taskModal: false,
      activePerson: {
        id: null,
        name: "",
        role: "",
      },
      activeTask: {
        title: "",
        description: "",
        completed: false,
        assignedTo: null,
      }
    };
    axios.defaults.baseURL = 'http://13.59.132.117:8000/';
  }

  componentDidMount() {
    this.refreshPersonList();
    this.refreshTaskList();
  }

  refreshPersonList = () => {
    axios
      .get("/api/person/")
      .then((res) => this.setState({ peopleList: res.data }))
      .catch((err) => console.log(err));
  }

  refreshTaskList = () => {
    axios
      .get("/api/task/")
      .then((res) => this.setState({ taskList: res.data }))
      .catch((err) => console.log(err));
  }

  // People
  togglePersonModal = () => {
    this.setState({ personModal: !this.state.personModal });
  }

  handleSubmitPerson = (person) => {
    this.togglePersonModal();

    if (person.id) {
      axios
        .put(`/api/person/${person.id}/`, person)
        .then((res) => this.refreshPersonList())
        .catch((err) => console.log(err));
      return;
    }
    axios
      .post("/api/person/", person)
      .then((res) => this.refreshPersonList())
      .catch((err) => console.log(err));//*/
  }

  handleDeletePerson = (person) => {
    axios
      .delete(`/api/person/${person.id}`)
      .then((res) => this.refreshPersonList())
      .catch((err) => console.log(err));
    this.refreshTaskList(); // Because the backend cleans up tasks who might have had this person.
  }

  createPerson = () => {
    const person = { name: "", role: "" };

    this.setState({ activePerson: person, personModal: !this.state.personModal });
  }

  editPerson = (person) => {
    this.setState({ activePerson: person, personModal: !this.state.personModal });
  }

  // Tasks
  toggleTaskModal = () => {
    this.setState({ taskModal: !this.state.taskModal });
  }

  handleSubmitTask = (task) => {
    this.toggleTaskModal();

    if (task.id) {
      axios
        .put(`/api/task/${task.id}/`, task)
        .then((res) => this.refreshTaskList())
        .catch((err) => console.log(err));
      return;
    }
    axios
      .post("/api/task/", task)
      .then((res) => this.refreshTaskList())
      .catch((err) => console.log(err));
  }

  handleDeleteTask = (task) => {
    axios
      .delete(`/api/task/${task.id}`)
      .then((res) => this.refreshTaskList())
      .catch((err) => console.log(err));
  }

  createTask = () => {
    const task = { title: "", description: "", completed: false, assignedTo: null };

    this.setState({ activeTask: task, taskModal: !this.state.taskModal, peopleList: this.state.peopleList });
  }

  editTask = (task) => {
    this.setState({ activeTask: task, taskModal: !this.state.taskModal, peopleList: this.state.peopleList });
  }

  displayPeople = (status) => {
    if (status) {
      return this.setState({ viewPeople: true });
    }

    return this.setState({ viewPeople: false });
  }

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  }

  renderOverallTabsList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewPeople ? "nav-link active" : "nav-link"}
          onClick={() => this.displayPeople(true)}
        >
          People
        </span>
        <span
          className={this.state.viewPeople ? "nav-link" : "nav-link active"}
          onClick={() => this.displayPeople(false)}
        >
          Tasks
        </span>
      </div>
    );
  }

  renderTaskTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}
        >
          Show Complete
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}
        >
          Only Show Incomplete
        </span>
      </div>
    );
  };

  findPerson = (people, id) => {
    var output = people.find((person) => person.id === id);
    return output && ` (${output.name})`;
  }

  renderItems = () => {
    const { viewPeople, viewCompleted } = this.state;
    if (viewPeople){
      return this.state.peopleList.map((person) => (
        <li
          key={person.id}
          className="list-group-item d-flex justify-content-between align-tiems-center"
        >
          <span
            className="todo-title mr-2"
          >
            {person.name} ({person.role})
          </span>
          <span>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editPerson(person)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDeletePerson(person)}
            >
              Delete
            </button>
          </span>
        </li>
      ));
    } else {
      const newTasks = this.state.taskList.filter(
        (task) => task.completed === viewCompleted || !task.completed
      );

      return newTasks.map((task) => (
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
            {task.title} {this.findPerson(this.state.peopleList, task.assignedTo)}
          </span>
          <span>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => this.editTask(task)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.handleDeleteTask(task)}
            >
              Delete
            </button>
          </span>
        </li>
      ));
    }
  };

  render() {
    const { viewPeople } = this.state;
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">To-Do Tasks & People</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={viewPeople ? this.createPerson : this.createTask}
                >
                  {viewPeople ? "Add people" : "Add task" }
                </button>
              </div>
              {this.renderOverallTabsList()}
              {!viewPeople && this.renderTaskTabList() }
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.personModal ? (
          <PersonModal
            activePerson={this.state.activePerson}
            toggle={this.togglePersonModal}
            onSave={this.handleSubmitPerson}
          />
        ) : this.state.taskModal ? (
          <TaskModal
            activeTask={this.state.activeTask}
            peopleList={this.state.peopleList}
            toggle={this.toggleTaskModal}
            onSave={this.handleSubmitTask}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
