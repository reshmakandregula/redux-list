import React, { Component } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import { deleteUser, sortUser } from "../actions/userActions";
import Pagination from "./Pagination";
import { connect } from "react-redux";

class UsersTable extends Component {
  state = {
    currentPage: 1,
    personsPerPage: 3,
  };

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };
  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  render() {
    const {
      deleteUser,
      editUser,
      sortUser,
      search,
      handleChange,
      users,
    } = this.props;

    const onDelete = (id) => {
      deleteUser(id);
    };

    const sortedUser = (name) => {
      sortUser(name);
    };

    const filteredUsers = users.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.age.toString().includes(search.toString()) ||
        user.gender.toLowerCase().includes(search.toLowerCase())
      );
    });

    const { currentPage, personsPerPage } = this.state;
    const indexOfLastPerson = currentPage * personsPerPage;
    const indexOfFirstPerson = indexOfLastPerson - personsPerPage;
    const currentPersons = filteredUsers.slice(
      indexOfFirstPerson,
      indexOfLastPerson
    );
    const totalPages = filteredUsers.length / personsPerPage;

    const nextPage = () => {
      if (this.state.currentPage < Math.ceil(totalPages)) {
        this.setState({
          currentPage: this.state.currentPage + 1,
        });
      }
    };

    const lastPage = () => {
      if (this.state.currentPage < Math.ceil(totalPages)) {
        this.setState({
          currentPage: Math.ceil(totalPages),
        });
      }
    };
    const paginate = (pageNumber) => {
      this.setState({
        currentPage: pageNumber,
      });
    };

    return (
      <div>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">
                UsersList
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Search Users...."
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </div>
        <table className="table table-striped container">
          <thead className="tableHover">
            <tr>
              <th>Sl.No:</th>
              <th onClick={() => sortedUser("firstName")}>Firstname</th>
              <th onClick={() => sortedUser("lastName")}>lastname</th>
              <th onClick={() => sortedUser("age")}>Age</th>
              <th onClick={() => sortedUser("gender")}>Gender</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentPersons.map((currentUser, i) => {
              return (
                <tr key={currentUser._id}>
                  <td>{i + 1}</td>
                  <td>{currentUser.firstName}</td>
                  <td>{currentUser.lastName}</td>
                  <td>{currentUser.age}</td>
                  <td>{currentUser.gender}</td>
                  <td>
                    <button
                      onClick={() => editUser(currentUser)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                  {/* <td><Link to={"/edit/"+currentUser._id}  className="btn btn-info">Edit</Link></td> */}
                  <td>
                    <button
                      onClick={() => onDelete(currentUser._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="d-flex justify-content-center container">
          <Button
            variant="link"
            disabled={currentPage === 1 ? true : false}
            onClick={this.firstPage}
          >
            First
          </Button>
          <Button
            variant="link"
            disabled={currentPage === 1 ? true : false}
            onClick={this.prevPage}
          >
            Prev
          </Button>

          <Pagination
            personsPerPage={this.state.personsPerPage}
            total={filteredUsers.length}
            paginate={paginate}
            currentPage={this.state.currentPage}
          />

          <Button
            variant="link"
            disabled={currentPage === Math.ceil(totalPages) ? true : false}
            onClick={nextPage}
          >
            Next
          </Button>
          <Button
            variant="link"
            disabled={currentPage === Math.ceil(totalPages) ? true : false}
            onClick={lastPage}
          >
            Last
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.items,
});

export default connect(mapStateToProps, { deleteUser, sortUser })(UsersTable);
