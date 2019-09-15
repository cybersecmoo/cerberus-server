import React, { Component } from "react";
import CommandList from "../queuedcommand/CommandList.component";

class HomePage extends Component {
  render() {
    return <CommandList items={[{ name: "SFTP", target: { ip: "192.168.0.1" } }]}></CommandList>;
  }
}

export default HomePage;
