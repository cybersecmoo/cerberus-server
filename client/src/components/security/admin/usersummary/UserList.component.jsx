import React, { Component } from "react";
import UserSummary from "./UserSummary.component";
import axios from "axios";
import "./UserList.style.scss";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { setAlert } from "../../../../redux/alert/alert.action";

class UserList extends Component {
  render() {
    return (
      <div className="users">
        <h3>Commands</h3>
        <ListGroup className="user-list">
          {this.state.users.map(item => (
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

export default UserList;
