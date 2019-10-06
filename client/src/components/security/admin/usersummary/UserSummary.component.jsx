// Contains username, whether they are an admin, and a rubbish-bin icon, to delete them
import React, { Component } from "react";
import "./UserSummary.style.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "../../../../redux/alert/alert.action";
import { deleteUser } from "../../../../redux/users/users.action";

class UserSummary extends Component {
  deleteClicked = async event => {
    event.preventDefault();

    try {
      deleteUser(this.props.user.id);
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

UserSummary.propTypes = {
  setAlert: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default connect({ setAlert, deleteUser })(UserSummary);
