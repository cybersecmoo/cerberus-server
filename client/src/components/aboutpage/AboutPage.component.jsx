import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

class AboutPage extends React.Component {
  render() {
    return (
      <Jumbotron>
        <h1>About Cerberus</h1>
        <p>
          Cerberus is a redteaming implant that I have developed (mostly just to practice the concepts). This app here
          is designed as the frontend of C2 activities for Cerberus. However, it has been designed to be extensible, and
          to work with most implants that conduct HTTP C2.
        </p>
      </Jumbotron>
    );
  }
}

export default AboutPage;
