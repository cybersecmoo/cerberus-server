// A single queued command, showing command type, args, and target
import React, { Component } from "react";
import "./QueuedCommand.style.scss";
import ListGroup from "react-bootstrap/ListGroup";

class QueuedCommand extends Component {
  render() {
    return (
      <ListGroup.Item action variant="dark">
        <b>Name: </b>
        {this.props.cmd.name}
      </ListGroup.Item>
    );
  }
}

export default QueuedCommand;
