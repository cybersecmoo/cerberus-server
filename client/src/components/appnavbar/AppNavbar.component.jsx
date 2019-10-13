// The navbar; don't need to make it adjust to mobile size cos ain't no-one using this on mobile
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./AppNavbar.style.scss";
import { logout } from "../../redux/auth/auth.action";
import { Redirect } from "react-router-dom";

class AppNavbar extends Component {
  onLogout = async event => {
    event.preventDefault();
    await this.props.logout();
  };

  render() {
    let loginLink = <Nav.Link href="/login">Log In</Nav.Link>;
    let userManLink = null;

    if (this.props.auth.isAuthenticated) {
      loginLink = <Nav.Link onClick={this.onLogout}>Log Out</Nav.Link>;
    } else {
      return <Redirect to="/update-password" />;
    }

    if (this.props.auth.isAdmin) {
      userManLink = <Nav.Link href="/user-management">Manage Users</Nav.Link>;
    }

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Cerberus C2</Navbar.Brand>
        <Nav className="mr-auto">
          {loginLink}
          <Nav.Link href="#">Manage Command Types</Nav.Link>
          {userManLink}
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

AppNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(AppNavbar);
