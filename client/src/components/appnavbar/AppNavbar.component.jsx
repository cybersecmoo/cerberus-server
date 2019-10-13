// The navbar; don't need to make it adjust to mobile size cos ain't no-one using this on mobile
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./AppNavbar.style.scss";
import { logout } from "../../redux/auth/auth.action";
import { withRouter } from "react-router-dom";

class AppNavbar extends Component {
  onLogout = async event => {
    event.preventDefault();
    await this.props.logout();
  };

  onLoginClick = event => {
    event.preventDefault();
    this.props.history.push("/login");
  };

  onUserManClick = event => {
    event.preventDefault();
    this.props.history.push("/user-management");
  };

  render() {
    let loginLink = <Nav.Link onClick={this.onLoginClick}>Log In</Nav.Link>;
    let userManLink = null;

    if (this.props.auth.isAuthenticated) {
      loginLink = <Nav.Link onClick={this.onLogout}>Log Out</Nav.Link>;
    }

    if (this.props.auth.isAdmin) {
      userManLink = <Nav.Link onClick={this.onUserManClick}>Manage Users</Nav.Link>;
    }

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Cerberus C2</Navbar.Brand>
        <Nav className="mr-auto">
          {loginLink}
          <Nav.Link href="#">Manage Command Types</Nav.Link>
          {userManLink}
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

const Connected = connect(
  mapStateToProps,
  { logout }
)(AppNavbar);

export default withRouter(Connected);
