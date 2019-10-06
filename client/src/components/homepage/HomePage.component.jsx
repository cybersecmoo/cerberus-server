import React, { Component } from "react";
import CommandList from "../queuedcommand/CommandList.component";
import TargetList from "../target/TargetList.component";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class HomePage extends Component {
  render() {
    return (
      <Row>
        <Col>
          <CommandList items={[{ name: "SFTP", target: { ip: "192.168.0.1" } }]}></CommandList>
        </Col>
        <Col>
          <TargetList
            items={[{ id: "kslajdhfakjas876324", ip: "192.168.0.1", platform: "Windows 7", isAdmin: false }]}
          ></TargetList>
        </Col>
      </Row>
    );
  }
}

export default HomePage;
