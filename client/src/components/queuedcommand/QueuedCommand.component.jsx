// A single queued command, showing command type, args, and target
import React, { Component } from "react";
import "./QueuedCommand.style.scss";
import ListGroup from "react-bootstrap/ListGroup";

class QueuedCommand extends Component {
  render() {
    return (
      <ListGroup.Item action variant="dark">
        <span className="cell">
          <b>Command: </b>
          {this.props.cmd.name}
        </span>
        <span className="cell">
          <b>Target: </b>
          {this.props.cmd.target.ip}
        </span>
      </ListGroup.Item>
    );
  }
}

export default QueuedCommand;
