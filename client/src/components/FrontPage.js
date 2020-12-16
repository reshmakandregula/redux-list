import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  fetchUsers,
  addUser,
  showModal,
  closeModal,
} from "../actions/userActions";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";

class FrontPage extends Component {
  state = {
    data: {
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },

    visible: false,
    search: "",
    currentId: "",
    errors: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
  };

  componentWillMount() {
    this.props.fetchUsers();
  }

  onChange = (e) => {
    const { name, value } = e.target;

    if ([name] == "firstName") {
      this.setState({
        data: { ...this.state.data, firstName: value },
        errors: {
          ...this.state.errors,
          firstName: this.state.firstName === "" || null ? true : false,
        },
      });
    }
    if ([name] == "lastName") {
      this.setState({
        data: { ...this.state.data, lastName: value },
        errors: {
          ...this.state.errors,
          lastName: this.state.lastName === "" || null ? true : false,
        },
      });
    }
    if ([name] == "age") {
      this.setState({
        data: { ...this.state.data, age: value },
        errors: {
          ...this.state.errors,
          age: this.state.age === "" || null ? true : false,
        },
      });
    }
    if ([name] == "gender") {
      this.setState({
        data: { ...this.state.data, gender: value },
        errors: {
          ...this.state.errors,
          gender: this.state.gender === "" || null ? true : false,
        },
      });
    }
  };

  validate = () => {
    this.setState({
      errors: {
        firstName: this.state.data.firstName === "",
        lastName: this.state.data.lastName === "",
        age: this.state.data.age === "",
        gender: this.state.data.gender === "",
      },
    });
    return (
      this.state.data.firstName !== "" &&
      this.state.data.lastName !== "" &&
      this.state.data.age !== "" &&
      this.state.data.gender !== ""
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: this.state.data.id,
      firstName: this.state.data.firstName,
      lastName: this.state.data.lastName,
      age: this.state.data.age,
      gender: this.state.data.gender,
    };

    if (!this.validate()) return;
    this.props.addUser(userData);
    this.props.closeModal();
    this.setState({
      data: { id: "", firstName: "", lastName: "", age: "", gender: "" },
    });
    window.location = "/";
    const visible = this.props.isLoading;
    this.setState({ visible: this.validate() ? false : true });
  };

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  editUser = (currentUser) => {
    const { data } = this.state;
    this.props.showModal();
    this.setState({
      data: { ...data, id: currentUser._id },
    });
    axios
      .get("/api/users/" + currentUser._id)
      .then((res) => {
        this.setState({
          data: {
            ...this.state.data,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            age: res.data.age,
            gender: res.data.gender,
          },
        });
        console.log(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  closeModal = () => {
    this.props.closeModal();
    this.setState({
      data: { id: "", firstName: "", lastName: "", age: "", gender: "" },
      errors: { firstName: "", lastName: "", age: "", gender: "" },
    });
  };

  onAdd = () => {
    this.props.showModal();
  };

  render() {
    return (
      <div className="container">
        <div className="container" style={{ textAlign: "center" }}>
          <h1>User Entry Details</h1>
          <button className="btn btn-primary" onClick={() => this.onAdd()}>
            Add Details
          </button>
        </div>

        <br />
        <br />
        <div>
          {this.props.visible && (
            <UserModal
              closeModal={this.closeModal}
              onChange={this.onChange}
              handleSubmit={this.handleSubmit}
              data={this.state.data}
              errors={this.state.errors}
            />
          )}

          <UsersTable
            search={this.state.search}
            editUser={this.editUser}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.items,
  newUser: state.users.item,
  visible: state.users.isLoading,
});

export default connect(mapStateToProps, {
  fetchUsers,
  addUser,
  showModal,
  closeModal,
})(FrontPage);
