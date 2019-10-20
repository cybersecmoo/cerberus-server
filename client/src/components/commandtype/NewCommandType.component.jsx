// The form for creating a new command type
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./NewCommandType.style.scss";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "../../redux/alert/alert.action";
import { createCommandType } from "../../redux/commands/commands.action";

class NewCommandType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      argsCount: 0
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.createCommandType({ name: this.state.name, argsCount: this.state.argsCount });
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="addCommandType">
        <Form onSubmit={this.handleSubmit}>
          <h3>Create a new Type of Command</h3>
          <Form.Group controlId="newCommandName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={this.state.name}
              placeholder="Enter the command name..."
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="newCommandArgsCount">
            <Form.Label>Number of Arguments</Form.Label>
            <Form.Control
              type="number"
              name="argsCount"
              value={this.state.argsCount}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Create
          </Button>
        </Form>
      </div>
    );
  }
}

NewCommandType.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createCommandType: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert, createCommandType }
)(NewCommandType);
