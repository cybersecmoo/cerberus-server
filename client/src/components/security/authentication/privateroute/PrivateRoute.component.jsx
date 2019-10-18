import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { localLogout } from "../../../../redux/auth/auth.action";

class PrivateRoute extends Component {
  render() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.hasLoggedInYet) {
        return <Route exact path={this.props.path} component={this.props.component} />;
      } else {
        return <Redirect to="/update-password" />;
      }
    } else {
      this.props.localLogout();
      return <Redirect to="/login" />;
    }
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  localLogout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { localLogout }
)(PrivateRoute);
