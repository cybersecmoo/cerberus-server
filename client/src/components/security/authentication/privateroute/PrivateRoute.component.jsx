import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    console.log(this.props.auth);
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.hasLoggedInYet) {
        return <Route exact path={this.props.path} component={this.props.component} />;
      } else {
        return <Redirect to="/update-password" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
