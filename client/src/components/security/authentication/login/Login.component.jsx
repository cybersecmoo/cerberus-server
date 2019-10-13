// The login form
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "../../../../redux/alert/alert.action";
import { login } from "../../../../redux/auth/auth.action";

import "./Login.style.scss";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.login({ name: this.state.name, password: this.state.password });
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="login">
          <h2>Login</h2>

          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="loginFormName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="name"
                value={this.state.name}
                placeholder="Enter your username..."
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="loginFormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={this.state.password}
                placeholder="Enter your password..."
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Log In
            </Button>
          </Form>
        </div>
      );
    }
  }
}

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  hasLoggedInYet: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  hasLoggedInYet: state.auth.hasLoggedInYet,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, login }
)(Login);
