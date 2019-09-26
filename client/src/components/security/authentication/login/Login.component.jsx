// The login form
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.style.scss";
import axios from "axios";

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

    try {
      console.log("Sending");
      const response = await axios.post("/api/auth/", this.state);
      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({
        name: "",
        password: ""
      });
    }
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    // TODO: Use an Alert component to display errors/warnings
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

export default Login;
