// Displays a target (IP, OS, etc.)
import React, { Component } from "react";

class Target extends Component {
  render() {
    <div className="target-summary">
      <h3>IP: </h3>
      {this.props.target.ip}
      <h3>Details: </h3>
      {this.props.target.platform}
    </div>;
  }
}
