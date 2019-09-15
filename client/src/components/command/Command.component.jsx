// The form for queueing up a new command
import React, { Component } from "react";

class Command extends Component {
  render() {
    return <h3>{this.props.cmd.name}</h3>;
  }
}

export default Command;
