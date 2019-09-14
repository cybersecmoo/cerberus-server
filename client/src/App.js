import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar.component";
import HomePage from "./components/homepage/HomePage.component";
import NewCommandType from "./components/commandtype/NewCommandType.component";
import "materialize-css/dist/css/materialize.min.css";
import Materialize from "materialize-css";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    // Auto-initialize all the Materialize stuff
    Materialize.AutoInit();
  }
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/commandtype/new" component={NewCommandType} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
