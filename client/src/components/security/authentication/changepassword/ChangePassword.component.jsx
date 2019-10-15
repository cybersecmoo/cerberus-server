import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "../../../../redux/alert/alert.action";
import { changePassword } from "../../../../redux/auth/auth.action";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    await this.props.changePassword({ password: this.state.password });
    this.props.history.push("/");
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="change-password">
        <h2>Change Password</h2>
        <Form>
          <Form.Group controlId="newPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={this.state.password}
              placeholder="Enter your new password..."
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          <Button variant="dark" type="submit" onClick={this.handleSubmit}>
            Change
          </Button>
        </Form>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  hasLoggedInYet: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  hasLoggedInYet: state.auth.user.hasLoggedInYet
});

export default connect(
  mapStateToProps,
  { setAlert, changePassword }
)(ChangePassword);
