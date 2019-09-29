// The login form
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./Login.style.scss";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../../../redux/alert/alert.action";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "",
        password: ""
      }
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    try {
      console.log("Sending");
      const response = await axios.post("/api/auth/", this.state.user);
    } catch (err) {
      this.props.setAlert(`${err}`, "danger");
    } finally {
      this.setState({
        user: {
          name: "",
          password: ""
        }
      });
    }
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
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

export default connect(
  null,
  { setAlert }
)(Login);
