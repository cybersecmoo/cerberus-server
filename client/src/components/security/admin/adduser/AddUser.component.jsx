import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "../../../../redux/alert/alert.action";
import { createUser } from "../../../../redux/users/users.action";

import "./AddUser.style.scss";

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      isAdmin: false
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.createUser({ name: this.state.name, password: this.state.password, isAdmin: this.state.isAdmin });
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="addUser">
        <h2>Add User</h2>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="createUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="name"
              value={this.state.name}
              placeholder="Enter the username..."
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="createUserPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={this.state.password}
              placeholder="Enter the password..."
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="createUserIsAdmin">
            <Form.Check name="isAdmin" value="true" type="checkbox" label="Is Admin" onChange={this.handleChange} />
          </Form.Group>
          <Button variant="dark" type="submit">
            Create User
          </Button>
        </Form>
      </div>
    );
  }
}

AddUser.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert, createUser }
)(AddUser);
