import React, { Component } from "react";
import CommandType from "./CommandType.component";
import "./UserList.style.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { fetchCommands } from "../../../../redux/users/users.action";
import { setAlert } from "../../../../redux/alert/alert.action";
import NewCommandType from "./NewCommandType.component";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class CommandTypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchUsers();
  }

  handleShow() {
    this.setState({
      showModal: true
    });
  }

  handleHide() {
    this.setState({
      showModal: false
    });
  }

  render() {
    const commandTypes = this.props.allCommands;

    if (commandTypes && commandTypes !== null && commandTypes.length > 0) {
      return (
        <div className="commandTypes">
          <h3>Command Types</h3>
          <ListGroup className="commandTypes-list">
            {commandTypes.map(item => (
              <CommandType key={item._id} commandType={item}></CommandType>
            ))}
          </ListGroup>
          <Button className="newCommandType" variant="success" onClick={this.handleShow}>
            New
          </Button>

          <Modal size="lg" show={this.state.showModal} onHide={this.handleHide} centered>
            <NewCommandType />
          </Modal>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

CommandTypeList.propTypes = {
  allCommands: PropTypes.array.isRequired,
  fetchCommands: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allCommands: state.commands.allCommands
});

export default connect(
  mapStateToProps,
  { fetchCommands, setAlert }
)(CommandTypeList);
