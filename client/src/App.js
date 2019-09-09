import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar.component";
import "materialize-css/dist/css/materialize.min.css";
import Materialize from "materialize-css";

class App extends Component {
  componentDidMount() {
    // Auto-initialize all the Materialize stuff
    Materialize.AutoInit();
  }
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
      </div>
    );
  }
}

export default App;
