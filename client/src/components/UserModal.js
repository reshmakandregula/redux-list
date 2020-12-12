import { Modal, Button } from "react-bootstrap";
import React from "react";
import { render } from "@testing-library/react";
import { Component } from "react";
import "../App.css";

class UserModal extends Component {
  render() {
    const { closeModal, onChange, handleSubmit, data, errors } = this.props;
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Form Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contain">
            <h2>Fill The Below Details.....</h2>
            <br />

            <form onSubmit={handleSubmit} className="contain">
              <div className="form-group">
                <label>Firstname: </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter firstname"
                  name="firstName"
                  className="form-group"
                  value={data.firstName}
                  onChange={onChange}
                />
                <div style={{ fontSize: 14, color: "red" }}>
                  {errors.firstName ? "can't be blank" : ""}
                </div>
              </div>

              <div className="form-group">
                <label>Lastname: </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter lastname"
                  name="lastName"
                  className="form-group"
                  value={data.lastName}
                  onChange={onChange}
                />
                <div style={{ fontSize: 14, color: "red" }}>
                  {errors.lastName ? "can't be blank" : ""}
                </div>
              </div>

              <div className="form-group">
                <label>Age: </label>
                <br />
                <input
                  type="number"
                  name="age"
                  className="form-group"
                  value={data.age}
                  onChange={onChange}
                />
                <div style={{ fontSize: 14, color: "red" }}>
                  {errors.age ? "can't be blank" : ""}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Gender:
                  <br />
                  <input
                    type="radio"
                    value="male"
                    name="gender"
                    checked={data.gender === "male"}
                    onChange={onChange}
                  />
                  Male
                  <br />
                  <input
                    type="radio"
                    value="female"
                    name="gender"
                    checked={data.gender === "female"}
                    onChange={onChange}
                  />
                  Female
                </label>
                <div style={{ fontSize: 14, color: "red" }}>
                  {errors.gender ? "can't be blank" : ""}
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>

          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UserModal;
