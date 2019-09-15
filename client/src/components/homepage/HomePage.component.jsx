import React, { Component } from "react";
import CommandList from "../queuedcommand/CommandList.component";

class HomePage extends Component {
  render() {
    return <CommandList items={[{ name: "hi" }]}></CommandList>;
  }
}

export default HomePage;
