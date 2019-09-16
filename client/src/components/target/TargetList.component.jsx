// A list of the queued commands
import React, { Component } from "react";
import Target from "./Target.component";
import "./TargetList.style.scss";
import ListGroup from "react-bootstrap/ListGroup";

class TargetList extends Component {
  render() {
    return (
      <div>
        <h3>Targets</h3>
        <ListGroup className="target-list">
          {this.props.items.map(item => (
            <Target target={item}></Target>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default TargetList;
