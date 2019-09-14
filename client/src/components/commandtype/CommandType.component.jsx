// Displays a command type: name, and number of arguments, and a rubbish-bin icon for deletion
import React, { Component } from "react";

class CommandType extends Component {
  render() {
    <div className="commandtype-summary">
      <h3>Name: </h3>
      {this.props.commandType.name}
      <h3>Args: </h3>
      {this.props.commandType.argsCount}
    </div>;
  }
}

export default CommandType;
