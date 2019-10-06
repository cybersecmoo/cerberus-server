import React, { Component } from "react";
import UserSummary from "./UserSummary.component";
import "./UserList.style.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { fetchUsers } from "../../../../redux/users/users.action";
import { setAlert } from "../../../../redux/alert/alert.action";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserList extends Component {
  async componentDidMount() {
    await this.props.fetchUsers();
  }

  render() {
    const users = this.props.allUsers;

    if (users && users !== null && users.length > 0) {
      return (
        <div className="users">
          <h3>Users</h3>
          <ListGroup className="user-list">
            {this.props.allUsers.map(item => (
              <UserSummary key={item.id} user={item}></UserSummary>
            ))}
          </ListGroup>
          <Button className="newUser" variant="success">
            New
          </Button>
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
)(UserList); // FIXME: I think the issue might be here?
