// A simple, generic list component, which can take an array of other components to display in a stack format
// Not sure if this will actually work the way I want it to, though. If so, will have to create a different list component
// for each thing that will be listed (users, queued commands, command types, targets...)
import React, { Component } from "react";
import Command from "./Command.component";

class CommandList extends Component {
  render() {
    return (
      <div className="command-list">
        <h3>Commands:</h3>
        <ul className="collection">
          {this.props.items.map(item => (
            <Command cmd={item}></Command>
          ))}
        </ul>
      </div>
    );
  }
}

export default CommandList;
