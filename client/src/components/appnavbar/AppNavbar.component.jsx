// The navbar; don't need to make it adjust to mobile size cos ain't no-one using this on mobile
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./AppNavbar.style.scss";
import { logout } from "../../redux/auth/auth.action";
import { Link } from "react-router-dom";

class AppNavbar extends Component {
  onLogout = async event => {
    event.preventDefault();
    await this.props.logout();
  };

  render() {
    let loginLink = (
      <Link className="nav-link" to="/login">
        Log In
      </Link>
    );
    let userManLink = null;
    let changePasswordLink = null;
    const auth = this.props.auth;

    if (auth.isAuthenticated) {
      loginLink = (
        <Link className="nav-link" onClick={this.onLogout} to="#">
          Log Out
        </Link>
      );

      changePasswordLink = (
        <Link className="nav-link" to="/update-password">
          Change Password
        </Link>
      );
    }

    if (auth.user.isAdmin) {
      userManLink = (
        <Link className="nav-link" to="/user-management">
          Manage Users
        </Link>
      );
    }

    return (
      <Navbar bg="dark" variant="dark">
        <Link className="nav-brand" to="/">
          Cerberus C2
        </Link>
        <Nav className="mr-auto">
          {loginLink}
          <Link className="nav-link" to="/">
            Manage Command Types
          </Link>
          {userManLink}
          {changePasswordLink}
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
