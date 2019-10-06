// Contains username, whether they are an admin, and a rubbish-bin icon, to delete them
import React, { Component } from "react";
import "./UserSummary.style.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

class UserSummary extends Component {
  // TODO: this needs to fire off a Redux action, which will delete the user and, if successful, remove the user from the user list component.
  deleteUser = async event => {
    event.preventDefault();

    try {
      console.log(event);
    } catch (err) {
      setAlert(err, "danger");
    }
  };

  render() {
    return (
      <ListGroup.Item key={this.props.user.id} variant="dark">
        <span className="cell">
          <b>Name: </b>
          {this.props.user.name}
        </span>
        <span className="cell">
          <b>Is Admin: </b>
          {this.props.user.isAdmin}
        </span>
        <Button variant="danger">Delete</Button>
      </ListGroup.Item>
    );
  }
}

export default UserSummary;
