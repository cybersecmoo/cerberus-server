// Displays a target (IP, OS, etc.)
import React, { Component } from "react";
import "./Target.style.scss";
import ListGroup from "react-bootstrap/ListGroup";

class Target extends Component {
  render() {
    return (
      <ListGroup.Item action variant="dark">
        <div>
          <span className="cell">
            <b>ID: </b>
            {this.props.target.id}
          </span>
          <span className="cell">
            <b>IP: </b>
            {this.props.target.ip}
          </span>
        </div>
        <div>
          <span className="cell">
            <b>Platform: </b>
            {this.props.target.platform}
          </span>
          <span className="cell">
            <b>Is Admin: </b>
            {this.props.target.isAdmin.toString()}
          </span>
        </div>
      </ListGroup.Item>
    );
  }
}

export default Target;
