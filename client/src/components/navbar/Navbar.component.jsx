// The navbar; don't need to make it adjust to mobile size cos ain't no-one using this on mobile
import React, { Component } from "react";

class Navbar extends Component {
  render() {
    // TODO: Change navbar links based on user type and whether the user is logged in
    return (
      <nav className="grey darken-2">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#" className="left">
              C2
            </a>
            <ul className="right hide-on-small-and-down">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Manage Command Types</a>
              </li>
              <li>
                <a href="#">Add User</a>
              </li>
              <li>
                <a href="#">Log In</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
