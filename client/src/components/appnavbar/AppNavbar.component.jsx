// The navbar; don't need to make it adjust to mobile size cos ain't no-one using this on mobile
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./AppNavbar.style.scss";

class AppNavbar extends Component {
  render() {
    let loginLink = <Nav.Link href="/login">Log In</Nav.Link>;

    if (this.props.isAuthenticated) {
      loginLink = <Nav.Link href="/logout">Log Out</Nav.Link>;
    }

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Cerberus C2</Navbar.Brand>
        <Nav className="mr-auto">
          {loginLink}
          <Nav.Link href="#">Manage Command Types</Nav.Link>
          <Nav.Link href="#">Add User</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

AppNavbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps)(AppNavbar);
