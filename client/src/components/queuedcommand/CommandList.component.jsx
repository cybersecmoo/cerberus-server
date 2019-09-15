// A list of the queued commands
import React, { Component } from "react";
import QueuedCommand from "./QueuedCommand.component";
import "./CommandList.style.scss";
import ListGroup from "react-bootstrap/ListGroup";

class CommandList extends Component {
  render() {
    return (
      <ListGroup>
        <h3>Commands</h3>
        {this.props.items.map(item => (
          <QueuedCommand cmd={item}></QueuedCommand>
        ))}
        <ListGroup.Item action variant="dark">
          Queue up a new command
        </ListGroup.Item>
      </ListGroup>
    );
  }
}

export default CommandList;
