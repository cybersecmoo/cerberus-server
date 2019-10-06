import React, { Component } from "react";
import UserSummary from "./UserSummary.component";
import "./UserList.style.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { setAlert } from "../../../../redux/alert/alert.action";
import { fetchUsers } from "../../../../redux/users/users.action";

class UserList extends Component {
  async componentDidMount() {
    await fetchUsers();
  }

  render() {
    return (
      <div className="users">
        <h3>Commands</h3>
        <ListGroup className="user-list">
          {this.state.allUsers.map(item => (
            <UserSummary user={item}></UserSummary>
          ))}
        </ListGroup>
        <Button className="newUser" variant="success">
          New
        </Button>
      </div>
    );
  }
}

UserList.propTypes = {
  allUsers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  allUsers: state.allUsers
});

export default connect(mapStateToProps)(UserList);
