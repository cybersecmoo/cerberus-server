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
          <Button variant="dark" type="submit">
            Change
          </Button>
        </Form>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { setAlert, changePassword }
)(ChangePassword);
