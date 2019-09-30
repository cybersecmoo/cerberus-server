import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "react-bootstrap/Alert";

class AlertBar extends Component {
  render() {
    const alerts = this.props.alerts;

    if (alerts !== null && alerts.length > 0) {
      return alerts.map(alert => (
        <Alert key={alert.id} variant={alert.alertType}>
          {alert.msg}
        </Alert>
      ));
    } else {
      return <div></div>;
    }
  }
}

AlertBar.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(AlertBar);
