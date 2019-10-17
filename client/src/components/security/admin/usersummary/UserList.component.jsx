import React, { Component } from "react";
import UserSummary from "./UserSummary.component";
import "./UserList.style.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { fetchUsers } from "../../../../redux/users/users.action";
import { setAlert } from "../../../../redux/alert/alert.action";
import AddUser from "../adduser/AddUser.component";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserList extends Component {
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
    const users = this.props.allUsers;

    if (users && users !== null && users.length > 0) {
      return (
        <div className="users">
          <h3>Users</h3>
          <ListGroup className="user-list">
            {this.props.allUsers.map(item => (
              <UserSummary key={item._id} user={item}></UserSummary>
            ))}
          </ListGroup>
          <Button className="newUser" variant="success" onClick={this.handleShow}>
            New
          </Button>

          <Modal size="lg" show={this.state.showModal} onHide={this.handleHide} centered>
            <AddUser />
          </Modal>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

UserList.propTypes = {
  allUsers: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  allUsers: state.users.allUsers
});

export default connect(
  mapStateToProps,
  { fetchUsers, setAlert }
)(UserList);
