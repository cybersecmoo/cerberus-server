// The navbar; don't need to make it adjust to mobile size cos ain't no-one using this on mobile
import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class AppNavbar extends Component {
  render() {
    // TODO: Change navbar links based on user type and whether the user is logged in
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">C2</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#">Log In</Nav.Link>
          <Nav.Link href="#">Manage Command Types</Nav.Link>
          <Nav.Link href="#">Add User</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default AppNavbar;
