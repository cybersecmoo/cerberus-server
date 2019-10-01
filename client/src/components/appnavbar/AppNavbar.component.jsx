// The navbar; don't need to make it adjust to mobile size cos ain't no-one using this on mobile
import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./AppNavbar.style.scss";

class AppNavbar extends Component {
  render() {
    // TODO: Change navbar links based on user type and whether the user is logged in
    // Once that's done, run some tests and that should be auth complete. On to the user-management after that.

    // TODO: How do we tell the UI that the user is/is not an admin, without allowing the user to exploit it?
    // Probably fine to just send it in the login response, as long as the client does not then send its value back to be used by the server (the server should get the
    // user's admin status from the DB, NOT from JWT or other request fields)
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Cerberus C2</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/login">Log In</Nav.Link>
          <Nav.Link href="#">Manage Command Types</Nav.Link>
          <Nav.Link href="#">Add User</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default AppNavbar;
