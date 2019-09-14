// A single queued command, showing command type, args, and target
import React, { Component } from "react";

class QueuedCommand extends Component {
  render() {
    <div className="queuedcommand-summary">
      <h3>Name: </h3>
      {this.props.commandType.name}
      <h3>Args: </h3>
      {this.props.commandType.argsCount}
    </div>;
  }
}

export default QueuedCommand;
