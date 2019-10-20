// Contains username, whether they are an admin, and a rubbish-bin icon, to delete them
import React, { Component } from "react";
import "./CommandType.style.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "../../redux/alert/alert.action";
import { deleteCommandType } from "../../redux/commands/commands.action";

class CommandType extends Component {
  deleteClicked = async event => {
    event.preventDefault();

    try {
      this.props.deleteCommandType(this.props.commandType._id);
    } catch (err) {
      this.props.setAlert(err, "danger");
    }
  };

  render() {
    // TODO: Improve the styling so that the names and args and delete buttons all line up
    return (
      <ListGroup.Item eventKey={this.props.key} variant="dark">
        <span className="cell">
          <b>Name: </b>
          {this.props.commandType.name}
        </span>
        <span className="cell">
          <b>Args: </b>
          {this.props.commandType.argsCount}
        </span>
        <Button variant="danger" onClick={this.deleteClicked}>
          Delete
        </Button>
      </ListGroup.Item>
    );
  }
}

CommandType.propTypes = {
  setAlert: PropTypes.func.isRequired,
  deleteCommandType: PropTypes.func.isRequired,
  commandType: PropTypes.object.isRequired
};

export default connect(
  null,
  { setAlert, deleteCommandType }
)(CommandType);
