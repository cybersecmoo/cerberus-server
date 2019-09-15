// The form for creating a new command type
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class NewCommandType extends Component {
  render() {
    return (
      <Form>
        <h3>Create a new Type of Command</h3>
        <Form.Group controlId="newCommandName">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Command Name" />
        </Form.Group>
        <Form.Group controlId="newCommandArgsCount">
          <Form.Label>Number of Arguments</Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Button variant="dark" type="submit">
          Create
        </Button>
      </Form>
    );
  }
}

export default NewCommandType;
