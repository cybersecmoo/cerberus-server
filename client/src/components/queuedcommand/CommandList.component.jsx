// A list of the queued commands
import React, { Component } from "react";
import QueuedCommand from "./QueuedCommand.component";
import "./CommandList.style.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

class CommandList extends Component {
  render() {
    return (
      <div>
        <h3>Commands</h3>
        <ListGroup className="command-list">
          {this.props.items.map(item => (
            <QueuedCommand cmd={item}></QueuedCommand>
          ))}
        </ListGroup>
        <Button variant="success">New</Button>
      </div>
    );
  }
}

export default CommandList;
